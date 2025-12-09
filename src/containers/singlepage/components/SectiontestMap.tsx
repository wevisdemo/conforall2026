"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { GeoJsonObject, Feature } from "geojson";
import { MapItemWithProvince, ECTCountByProvince } from "@/src/services/type";

// Dynamically import react-leaflet components with SSR disabled
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const GeoJSON = dynamic(
  () => import("react-leaflet").then((mod) => mod.GeoJSON),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

// useMap hook needs to be imported directly since it's a hook
import { useMap } from "react-leaflet";

// Custom marker icon
const createCustomIcon = (nameId: string | null | undefined) => {
  if (typeof window === "undefined") return undefined;

  // Extract number from name_id (e.g., 'กรุงเทพมหานคร_2' → '2')
  const number = nameId?.split("_").pop() || "";

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div class="marker-pin">
        <span class="marker-number">${number}</span>
      </div>
    `,
    iconSize: [36, 44],
    iconAnchor: [18, 44],
    popupAnchor: [0, -44],
  });
};

// Add custom marker styles
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    .custom-marker {
      background: transparent;
      border: none;
    }
    .marker-pin {
      width: 22px;
      height: 22px;
      position: relative;
      background: #fff;
     border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #000;
    }
    .marker-pin::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 12px;
      height: 12px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 50%;

    }
    .marker-number {

      color: black;
      font-weight: bold;
      font-size: 14px;

    }
    .marker-pin:hover {
     border: 2px solid #000;
      transition: all 0.2s ease;
    }
  `;
  document.head.appendChild(style);
}

// Component to fit map bounds on initial load only
function FitBoundsOnLoad({ data }: { data: GeoJsonObject | null }) {
  const map = useMap();
  const hasInitialized = React.useRef(false);

  React.useEffect(() => {
    // Only fit bounds on initial load
    if (data && !hasInitialized.current) {
      hasInitialized.current = true;
      const geoJsonLayer = L.geoJSON(data);
      const bounds = geoJsonLayer.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [data, map]);

  return null;
}

// Component to handle zoom when province is selected
function ZoomToSelection({
  selectedFeature,
  geoData,
}: {
  selectedFeature: Feature | null;
  geoData: GeoJsonObject | null;
}) {
  const map = useMap();
  const prevSelectedRef = React.useRef<Feature | null | undefined>(undefined);

  React.useEffect(() => {
    // Skip initial mount (when prevSelectedRef is undefined)
    if (prevSelectedRef.current === undefined) {
      prevSelectedRef.current = selectedFeature;
      return;
    }

    // Only act if selection actually changed
    if (
      prevSelectedRef.current?.properties?.pro_code ===
      selectedFeature?.properties?.pro_code
    ) {
      return;
    }

    prevSelectedRef.current = selectedFeature;

    if (selectedFeature) {
      // Zoom to the selected province
      const geoJsonLayer = L.geoJSON(selectedFeature);
      const bounds = geoJsonLayer.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [20, 20], maxZoom: 12 });
      }
    } else if (geoData) {
      // Reset to full view when deselected
      const geoJsonLayer = L.geoJSON(geoData);
      const bounds = geoJsonLayer.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [selectedFeature, geoData, map]);

  return null;
}

export default function GeoJSONMap({
  mapPoints,
  ectCount,
}: {
  mapPoints: MapItemWithProvince[];
  ectCount: ECTCountByProvince;
}) {
  const [geoData, setGeoData] = useState<GeoJsonObject | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);

  // Ensure component only renders map on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get provinces list from geoData
  const provinces = React.useMemo(() => {
    if (!geoData || geoData.type !== "FeatureCollection") return [];
    const featureCollection = geoData as GeoJSON.FeatureCollection;
    return featureCollection.features
      .map((feature) => ({
        feature,
        pro_th: feature.properties?.pro_th as string,
        pro_en: feature.properties?.pro_en as string,
        pro_code: feature.properties?.pro_code as string,
      }))
      .sort((a, b) => a.pro_th?.localeCompare(b.pro_th, "th"));
  }, [geoData]);

  // Filter provinces based on search query
  const filteredProvinces = React.useMemo(() => {
    if (!searchQuery.trim()) return provinces;
    const query = searchQuery.toLowerCase();
    return provinces.filter(
      (p) =>
        p.pro_th?.toLowerCase().includes(query) ||
        p.pro_en?.toLowerCase().includes(query)
    );
  }, [provinces, searchQuery]);

  // Handle province selection from search
  const handleSelectProvince = (province: (typeof provinces)[0]) => {
    setSelectedFeature(province.feature);
    setSearchQuery(province.pro_th);
    setShowDropdown(false);
    setSelectedMarkerIndex(null);
  };

  // Load GeoJSON file on mount
  React.useEffect(() => {
    setLoading(true);
    fetch("/provinces.geojson")
      .then((res) => res.json())
      .then((data) => {
        setGeoData(data as GeoJsonObject);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load provinces data: " + err.message);
        setLoading(false);
      });
  }, []);

  // Filter markers based on selected province
  const filteredMapPoints = selectedFeature
    ? mapPoints.filter(
        (point) =>
          point.province?.pro_code === selectedFeature.properties?.pro_code
      )
    : [];

  // Determine fill color based on ECT coverage
  const getFillColor = (provinceName: string | undefined): string => {
    if (!provinceName) return "#fff";

    const provinceECT = ectCount[provinceName];
    if (!provinceECT || provinceECT.coveredECT === 0) {
      return "#fff"; // White - no coverage
    }

    if (provinceECT.coveredECT >= provinceECT.totalECT) {
      return "#2AB15B"; // Green - full coverage (all ECT districts covered)
    }

    return "#F6E954"; // Yellow - partial coverage
  };

  // Style function for GeoJSON features
  const geoJSONStyle = (feature?: Feature) => {
    const isSelected =
      selectedFeature?.properties?.pro_code === feature?.properties?.pro_code;
    const provinceName = feature?.properties?.pro_th as string | undefined;

    return {
      fillColor: getFillColor(provinceName),
      fillOpacity: isSelected ? 0.8 : 0.5,
      color: isSelected ? "#000" : "#000",
      weight: isSelected ? 3 : 2,
      opacity: 0.8,
    };
  };

  // Event handlers for GeoJSON features
  // Event handlers for GeoJSON features
  const onEachFeature = (feature: Feature, layer: L.Layer) => {
    // Add hover and click effects
    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        if (layer.setStyle) {
          layer.setStyle({
            weight: 4,
            fillOpacity: 0.7,
          });
        }
      },
      mouseout: (e) => {
        const layer = e.target;
        if (layer.setStyle) {
          layer.setStyle(geoJSONStyle(feature));
        }
      },
      click: () => {
        // Toggle selection - deselect if clicking the same province
        const isSameProvince =
          selectedFeature?.properties?.pro_code ===
          feature.properties?.pro_code;

        if (isSameProvince) {
          setSelectedFeature(null);
          setSearchQuery("");
        } else {
          setSelectedFeature(feature);
          setSearchQuery(feature.properties?.pro_th || "");
        }
        // Reset selected marker when province changes
        setSelectedMarkerIndex(null);
      },
    });
  };

  // Point to layer function for markers
  const pointToLayer = (feature: Feature, latlng: L.LatLng) => {
    return L.marker(latlng);
  };

  return (
    <div className="w-full md:h-[500px] h-fit grid md:grid-cols-2 grid-cols-1 gap-5">
      {/* Map Container */}
      <div className="col-span-1 h-[500px] w-full flex flex-col bg-gray-50 rounded-md border-2 border-neutral">
        <div className="flex-1 relative">
          {!isMounted || (!geoData && mapPoints.length === 0) ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  No Data Loaded
                </h2>
                <p className="text-gray-600 mb-4">
                  Upload a GeoJSON file or load from a URL to get started
                </p>
                <div className="text-sm text-gray-500">
                  Supported formats: .json, .geojson
                </div>
              </div>
            </div>
          ) : (
            <MapContainer center={[0, 0]} zoom={4} className="h-full w-full">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {geoData && (
                <GeoJSON
                  key={selectedFeature?.properties?.pro_code || "all"}
                  data={geoData}
                  style={geoJSONStyle}
                  onEachFeature={onEachFeature}
                  pointToLayer={pointToLayer}
                />
              )}

              {/* Render markers for selected province */}
              {filteredMapPoints
                .filter((point) => point.lat && point.lng)
                .map((point, index) => (
                  <Marker
                    key={index}
                    position={[point.lat!, point.lng!]}
                    icon={createCustomIcon(point.name_id)}
                    eventHandlers={{
                      click: () => {
                        setSelectedMarkerIndex(
                          selectedMarkerIndex === index ? null : index
                        );
                      },
                    }}
                  />
                ))}

              <FitBoundsOnLoad data={geoData} />
              <ZoomToSelection
                selectedFeature={selectedFeature}
                geoData={geoData}
              />
            </MapContainer>
          )}
        </div>
      </div>
      {/* Search Container */}
      <div className="col-span-1 md:h-[500px] h-fit w-full ">
        <div className="flex flex-col gap-2.5 w-full">
          <div className="relative w-full" ref={searchRef}>
            <img
              src="/icons/search-input.svg"
              alt="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 z-10"
            />
            <input
              type="text"
              placeholder="ค้นด้วยชื่อจังหวัด"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              className="w-full h-[45px] typo-body-03-normal rounded-lg bg-base-200 pl-10 pr-3 py-2.5 text-neutral"
            />
            {/* Clear button */}
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFeature(null);
                  setSelectedMarkerIndex(null);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            {/* Dropdown */}
            {showDropdown && filteredProvinces.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[300px] overflow-y-auto z-20">
                {filteredProvinces.map((province, index) => (
                  <button
                    key={province.pro_code || index}
                    onClick={() => handleSelectProvince(province)}
                    className={`w-full px-4 py-2.5 text-left hover:bg-base-200 transition-colors ${
                      selectedFeature?.properties?.pro_code ===
                      province.pro_code
                        ? "bg-green-50 text-green-700"
                        : "text-neutral"
                    }`}
                  >
                    <span className="typo-body-03-normal">
                      {province.pro_th}
                    </span>
                    <span className="typo-body-03-normal text-base-300 ml-2">
                      ({province.pro_en})
                    </span>
                  </button>
                ))}
              </div>
            )}
            {/* No results */}
            {showDropdown && searchQuery && filteredProvinces.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-20">
                <p className="typo-body-03-normal text-base-300 text-center">
                  ไม่พบจังหวัดที่ค้นหา
                </p>
              </div>
            )}
          </div>
          <p className="typo-body-03-normal text-base-300">หรือ กดจากแผนที่</p>

          {/* Selected marker data */}
          {selectedMarkerIndex !== null &&
            filteredMapPoints[selectedMarkerIndex] && (
              <div className="p-4 bg-base-100 rounded-lg border-2 border-base-200 h-full">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center justify-center gap-1">
                    <p className="typo-body-01-semibold text-neutral">
                      เขตเลือกตั้งที่
                    </p>
                    <div className="w-6 h-6 border-2 border-neutral rounded-full flex items-center justify-center">
                      <p className="typo-body-01-semibold text-neutral">
                        {filteredMapPoints[selectedMarkerIndex].name_id
                          ?.split("_")
                          .pop()}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedMarkerIndex(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-col gap-[5px]">
                  {filteredMapPoints[selectedMarkerIndex].name_location && (
                    <p className="typo-body-03-semibold text-neutral mb-2">
                      {filteredMapPoints[selectedMarkerIndex].name_location}
                    </p>
                  )}
                  {filteredMapPoints[selectedMarkerIndex].date && (
                    <div>
                      <p className="typo-body-01-semibold text-neutral">
                        วันและเวลาที่เปิด
                      </p>
                      <p className="typo-body-02-normal text-neutral">
                        {filteredMapPoints[selectedMarkerIndex].date}
                      </p>
                    </div>
                  )}
                  {filteredMapPoints[selectedMarkerIndex].map_detail && (
                    <div>
                      <p className="typo-body-01-semibold text-neutral">
                        อธิบายการเดินทาง
                      </p>
                      <p className="typo-body-02-normal text-neutral">
                        {filteredMapPoints[selectedMarkerIndex].map_detail}
                      </p>
                    </div>
                  )}
                  {filteredMapPoints[selectedMarkerIndex].map_url && (
                    <a
                      href={filteredMapPoints[selectedMarkerIndex].map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="typo-link-02 text-green-1 underline"
                    >
                      ดูแผนที่
                    </a>
                  )}
                  <p className="typo-body-01-normal text-base-300">
                    หรือติดต่อ
                  </p>
                  {filteredMapPoints[selectedMarkerIndex].name && (
                    <p className="typo-body-02-semibold text-base-300">
                      {filteredMapPoints[selectedMarkerIndex].name}
                    </p>
                  )}
                  {filteredMapPoints[selectedMarkerIndex].tel && (
                    <ul className="flex flex-col gap-[5px]">
                      <li className="flex items-center  gap-1">
                        <div className="w-1.5 h-1.5 bg-base-300 rounded-full mx-2"></div>
                        <p className="typo-body-02-normal text-base-300">
                          {filteredMapPoints[selectedMarkerIndex].tel}
                        </p>
                      </li>
                      {filteredMapPoints[selectedMarkerIndex].detail && (
                        <li className="flex items-center  gap-1">
                          <div className="w-1.5 h-1.5 bg-base-300 rounded-full mx-2"></div>
                          <p className="typo-body-02-normal text-base-300">
                            {filteredMapPoints[selectedMarkerIndex].detail}
                          </p>
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

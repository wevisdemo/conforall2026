"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { GeoJsonObject, Feature } from "geojson";

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Component to fit map bounds to GeoJSON data
function FitBounds({ data }: { data: GeoJsonObject }) {
  const map = useMap();

  React.useEffect(() => {
    if (data) {
      const geoJsonLayer = L.geoJSON(data);
      const bounds = geoJsonLayer.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [data, map]);

  return null;
}

export default function GeoJSONMap() {
  const [geoData, setGeoData] = useState<GeoJsonObject | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

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

  // Style function for GeoJSON features
  const geoJSONStyle = (feature?: Feature) => {
    return {
      fillColor: "#3b82f6",
      fillOpacity: 0.4,
      color: "#1e40af",
      weight: 2,
      opacity: 0.8,
    };
  };

  // Event handlers for GeoJSON features
  // Event handlers for GeoJSON features
  const onEachFeature = (feature: Feature, layer: L.Layer) => {
    // Create popup content from properties
    // if (feature.properties) {
    //   const properties = Object.entries(feature.properties)
    //     .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
    //     .join("<br>");

    //   layer.bindPopup(`
    //     <div class="p-2 max-w-xs">
    //       <h3 class="font-bold mb-2">Feature Properties</h3>
    //       <div class="text-sm">${properties || "No properties"}</div>
    //     </div>
    //   `);
    // }

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
      click: (e) => {
        setSelectedFeature(feature);

        // Zoom to the clicked feature
        const clickedLayer = e.target;
        if (clickedLayer.getBounds) {
          const bounds = clickedLayer.getBounds();
          e.target._map.fitBounds(bounds, {
            padding: [50, 50],
            maxZoom: 10,
          });
        }
      },
    });
  };

  // Point to layer function for markers
  const pointToLayer = (feature: Feature, latlng: L.LatLng) => {
    return L.marker(latlng);
  };

  return (
    <div className="h-[500px] w-[450px] flex flex-col bg-gray-50 rounded-md border-2 border-neutral">
      {/* Map Container */}
      <div className="flex-1 relative">
        {!geoData ? (
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
          <MapContainer center={[0, 0]} zoom={2} className="h-full w-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <GeoJSON
              data={geoData}
              style={geoJSONStyle}
              onEachFeature={onEachFeature}
              pointToLayer={pointToLayer}
            />

            <FitBounds data={geoData} />
          </MapContainer>
        )}

        {/* Feature Details Panel */}
        {selectedFeature && (
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-xl p-4 max-w-sm max-h-96 overflow-auto z-[1000]">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg text-neutral">
                Feature Details
              </h3>
              <button
                onClick={() => setSelectedFeature(null)}
                className="text-gray-500 hover:text-gray-700 text-xl leading-none"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-sm font-semibold text-gray-600 mb-1">
                  Geometry Type
                </div>
                <div className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {selectedFeature.geometry.type}
                </div>
              </div>

              {selectedFeature.properties &&
                Object.keys(selectedFeature.properties).length > 0 && (
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-1">
                      Properties
                    </div>
                    <div className="text-sm space-y-1">
                      {Object.entries(selectedFeature.properties).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="bg-gray-50 px-2 py-1 rounded"
                          >
                            <span className="font-medium text-neutral">
                              {key}:
                            </span>{" "}
                            <span className="text-gray-700">
                              {String(value)}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

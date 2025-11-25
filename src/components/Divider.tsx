import React from "react";

const Divider = ({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) => {
  if (label) {
    return (
      <div className={`relative flex w-full items-center ${className || ""}`}>
        <div className="flex-grow border-t border-neutral"></div>
        <span className="flex-shrink mx-4 text-neutral typo-body-02-semibold">
          {label}
        </span>
        <div className="flex-grow border-t border-neutral"></div>
      </div>
    );
  }

  return <hr className={`border-t border-neutral ${className || ""}`} />;
};

export default Divider;

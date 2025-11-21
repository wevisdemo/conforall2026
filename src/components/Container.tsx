import React from "react";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`md:max-w-[850px] w-[90vw] mx-auto ${className || ""}`}>
      {children}
    </div>
  );
};

export default Container;

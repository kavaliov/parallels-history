import React from "react";

interface SelectArrowProps {
  className?: string;
}

const SelectArrow: React.FC<SelectArrowProps> = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default SelectArrow;

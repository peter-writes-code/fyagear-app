import React from "react";

import Backdrop from "../ Backdrop";

interface ProgressIndicatorProps {
  visible: boolean;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = (props) => {
  const { visible } = props;

  return (
    <div>
      <Backdrop visible={visible} />
      <div
        className={`fixed top-0 right-0 bottom-0 left-0 transition duration-300 ease-in-out
            flex justify-center items-center
            ${
              visible
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
      >
        <svg className="w-11 h-11 animate-spin" viewBox="0 0 50 50">
          <circle
            className="stroke-current text-red-600 opacity-30"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="10"
          ></circle>
          <circle
            className="stroke-current text-red-600"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="10"
            strokeDasharray="90, 150"
            strokeDashoffset="-35"
          ></circle>
        </svg>
      </div>
    </div>
  );
};

export default ProgressIndicator;

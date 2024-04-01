import React from "react";

interface PropsButton {
  onClick: () => void;
  nameButton: string;
  style?:object;
}

function Button(props: PropsButton) {
  return (
    <button
      className={`w-38 h-10 [box-shadow:1px_1px_#7e57c2] text-[#fff] text-[13px] p-2 m-3 rounded-lg bg-[linear-gradient(to_right,#90caf9,#7986cb,#7e57c2)] hover:scale-110 hover:bg-[linear-gradient(to_bottom,#673ab7,#5c6bc0,#64b5f6)]  
      `}
      style={props.style|| {}}
      onClick={props.onClick}
    >
      {props.nameButton}
    </button>
  );
}

export default Button;

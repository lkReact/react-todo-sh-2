import IconCake from "../../public/IconCake.png";

import { CSSProperties } from "react";

import { DividerType } from "../types/components";

export default function Title({ children, ...rest }: DividerType) {
  const logoCss: CSSProperties = {
    filter: "drop-shadow(2px 4px 6px #72A3AA)",
    width: "100px",
    height: "100px",
  };

  return (
    <div {...rest} className="title-container">
      <div className="title">
        CAKE
        <img src={IconCake} alt="React Logo" style={logoCss} />
        NEST
      </div>
      <h3 className="title-subtitle">
        Bienvenu chez nous ! <div>{children}</div>
      </h3>
    </div>
  );
}

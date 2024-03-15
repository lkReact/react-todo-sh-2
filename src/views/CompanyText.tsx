import IconCake from "../../public/IconCake.png";

import { CSSProperties } from "react";

export default function CompanyText({ ...rest }) {
  const logoCss: CSSProperties = {
    filter: "drop-shadow(2px 4px 6px #72A3AA)",
    width: "40px",
    height: "40px",
  };

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div {...rest} className="company-text-container">
      <div className="company-text-title">
        CAKE
        <img
          onClick={reloadPage}
          src={IconCake}
          alt="React Logo"
          style={logoCss}
        />
        NEST
      </div>
    </div>
  );
}

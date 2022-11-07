import { useState } from "react";

import arrowDown from "../assets/images/angle-double-down-solid.svg";
import arrowUp from "../assets/images/angle-double-up-solid.svg";
import Spinner from "./Spinner";

type Props = {
  info: String[];
  label: String;
  error: String;
  loading: boolean;
};

const Card = ({ info, label, error, loading }: Props) => {
  const [isToggled, setIsToggled] = useState(true);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="card">
      <div className="card-title" onClick={handleToggle}>
        <span>{label}</span>
        <span>
          {isToggled ? (
            <img className="dropdown-icon" src={arrowDown} alt="arrow-down" />
          ) : (
            <img className="dropdown-icon" src={arrowUp} alt="arrow-up" />
          )}
        </span>
      </div>
      {isToggled ? null : (
        <div className="card-body">
          <ul>
            {error ? <div style={{ color: "red" }}>{error}</div> : ""}
            {loading ? (
              <Spinner />
            ) : (
              info.map((item: any) => <li key={item.id}>{item.sketch}</li>)
            )}
          </ul>
          <button className="card-button">+ Add new sketch</button>
        </div>
      )}
    </div>
  );
};

export default Card;

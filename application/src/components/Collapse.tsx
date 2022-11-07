import { useState, useEffect } from "react";
import { getSketches } from "../services";

import arrowDown from "../assets/images/angle-double-down-solid.svg";
import arrowUp from "../assets/images/angle-double-up-solid.svg";
import Spinner from "./Spinner";

type Props = {
  label: String;
};

const Collapse = ({ label }: Props) => {
  const [sketches, setSketches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isToggled, setIsToggled] = useState(true);

  useEffect(() => {
    setLoading(true);
    getSketches()
      .then((sketches) => {
        setSketches(sketches);
        setLoading(false);
        console.log(sketches);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError("There was error while fetching the information");
      });
  }, []);

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
              sketches.map((item: any) => <li key={item.id}>{item.sketch}</li>)
            )}
          </ul>
          <button className="card-button">+ Add new sketch</button>
        </div>
      )}
    </div>
  );
};

export default Collapse;

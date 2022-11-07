import { useState, useEffect } from "react";
import { getSketches } from "../services";
import Card from "./Card";

type Props = {
  label: String;
};

const Sketches = ({ label }: Props) => {
  const [sketches, setSketches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <Card info={sketches} label={"SKETCHES"} loading={loading} error={error} />
  );
};

export default Sketches;

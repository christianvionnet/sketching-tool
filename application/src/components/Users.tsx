import { useState, useEffect } from "react";
import { getUsers } from "../services";
import Card from "./Card";

const Sketches = () => {
  const [sketches, setSketches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getUsers()
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
    <Card info={sketches} label={"USERS"} loading={loading} error={error} />
  );
};

export default Sketches;

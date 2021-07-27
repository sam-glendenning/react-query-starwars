import React from "react";
import { Planet } from "../../app.types";

interface PlanetViewerProps {
  planet: Planet;
};

const PlanetViewer = (props: PlanetViewerProps): React.ReactElement => {
  return (
    <div className="card">
      <h3>{props.planet.name}</h3>
      <p>Population: {props.planet.population}</p>
      <p>Terrain: {props.planet.terrain}</p>
    </div>
  );
};

export default PlanetViewer;

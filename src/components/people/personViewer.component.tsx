import React from "react";
import { Person } from "../../app.types";

interface PersonViewerProps {
  person: Person;
};

const PersonViewer = (props: PersonViewerProps): React.ReactElement => {
  return (
    <div className="card">
      <h3>{props.person.name}</h3>
      <p>Gender: {props.person.gender}</p>
      <p>Birth Year: {props.person.birth_year}</p>
    </div>
  );
};

export default PersonViewer;

import React from "react";
import { Link } from "react-router-dom";
import { Dialogues } from "Utils/Dialogues";

const NotFound = () => {
  return (
    <div>
      <h3>{Dialogues.notFoundPage}</h3>
      <Link to="/">{Dialogues.homePage}</Link>
    </div>
  );
};

export default NotFound;

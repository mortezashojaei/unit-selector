import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h3>sorry the thing you're looking for doesn't exist</h3>
      <Link to="/">صفحه اصلی</Link>
    </div>
  );
};

export default NotFound;

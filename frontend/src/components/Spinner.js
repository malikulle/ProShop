import React from "react";
import { Spinner } from "react-bootstrap";
const MySpinner = () => {
  return (
    <div className="text-center">
      <Spinner  animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default MySpinner;

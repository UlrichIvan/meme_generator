import React from "react";

function NotFound() {
  return (
    <div className="d-flex justify-content-center align-items-center vw-100 vh-100 text-white text-capitalize">
      Page not found{" "} go to <a href="/" className="ms-2 fw-bold text-white text-decoration-none">home page</a>
    </div>
  );
}

export default NotFound;

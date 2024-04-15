import React from "react";

function Image({ url = "#" }) {
  return (
    <>
      <div className="image border m-2">
        <div
          className="image-content"
          style={{ width: "300px", height: "400px" }}
        >
          <img src={url} className="img-fluid h-100 w-100" alt="..." />
        </div>
        <a href={`/edit/?url=${url}`} className="link d-inline-block w-100">
          <div className="btn btn-primary text-capitalize d-block w-100 rounded-0">
            edit
          </div>
        </a>
      </div>
    </>
  );
}

export default Image;

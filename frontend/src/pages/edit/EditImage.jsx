import React, { useContext } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Current from "../../components/Current";
import { memesContext } from "../../contexts/memesProvider";

function EditImage() {
  const [query] = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();
  const { memes } = useContext(memesContext);

  if (!query.get("url")) {
    return navigate("/", { replace: true });
  }

  return (
    <div className="container-fluid px-0 text-white vw-100 vh-100 overflow-hidden">
      <div className="meme-header m-3 d-flex justify-content-center align-items-center">
        <h1 className="text-center text-capitalize mt-2">create mèmes</h1>
        <a
          href="/"
          className="btn btn-outline-primary text-capitalize d-inline-block ms-3"
        >
          go to home page
        </a>
        {memes?.length ? (
          <a
            href="/gallery"
            className="btn btn-lg btn-success text-capitalize  d-inline-flex ms-2"
            style={{ padding: ".55rem", marginTop: " .3rem" }}
          >
            go to your gallery
          </a>
        ) : null}
      </div>
      <div className="meme-body d-flex flex-wrap align-items-center justify-content-center overflow-y-auto overflow-x-auto px-2">
        <div className="edit-content m-auto d-flex w-50 justify-content-center">
          <Current url={query.get("url")} ext={params?.ext ?? ""} />
        </div>
      </div>
    </div>
  );
}

export default EditImage;

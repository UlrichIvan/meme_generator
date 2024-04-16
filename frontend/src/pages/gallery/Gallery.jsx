import React, { useCallback, useContext } from "react";
import { v4 } from "uuid";
import { Session } from "../../utils";
import Image from "../../components/Image";
import { memesContext } from "../../contexts/memesProvider";

function Gallery() {
  const { memes, setMemes } = useContext(memesContext);

  const handlerDelete = useCallback(
    (_, id) => {
      let data = memes;

      let index = data.findIndex((m) => m.id === id);

      console.log({ id, data });

      if (index !== -1) {
        data.splice(index, 1);
        Session.set("memes", data);
        setMemes([...data]);
      }
    },
    [memes, setMemes]
  );

  return (
    <div className="container-fluid px-0 text-white vw-100 vh-100 overflow-hidden">
      <div className="meme-header m-3 d-flex justify-content-center align-items-center">
        <h1 className="text-center text-capitalize mt-2">mèmes gallery </h1>
        <a
          href="/"
          className="btn btn-primary text-capitalize  d-inline-flex ms-2"
          style={{ padding: ".55rem", marginTop: " .3rem" }}
        >
          go to your Home page
        </a>
      </div>
      <div className="meme-body d-flex flex-wrap align-items-center justify-content-center overflow-y-auto overflow-x-hidden">
        {memes?.length ? (
          <>
            {memes.map((f) => (
              <Image
                className="m-3"
                url={f.url}
                ext={f.ext}
                isgallery={true}
                key={v4()}
                onClick={(e) => handlerDelete(e, f.id)}
              />
            ))}
          </>
        ) : (
          <div className="p-3 border text-capitalize rounded no-files">
            you don't have memes in your gallery
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;

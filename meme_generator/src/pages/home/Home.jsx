import React, { useCallback, useEffect, useRef, useState } from "react";
import "./home.css";
import SelectFile from "../../components/SelectFile";
import axios from "axios";
import { backend_url } from "../../utils";
import Image from "../../components/Image";
import { v4 } from "uuid";

function Home() {
  const images = useRef(null);

  const [files, setFiles] = useState([]);

  const [isloading, setIsloading] = useState(true);

  const handlerChange = useCallback(
    async (e) => {
      const fd = new FormData();

      const files = images.current.files;

      if (files?.length) {
        for (const file of files) {
          fd.append("images", file);
        }

        setIsloading(true);

        try {
          let result = await axios
            .post(
              `${backend_url}/meme/upload`,
              fd,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              },
            )
            .then((res) => res.data);

          setFiles((f) => [...f, ...result]);

        } catch (error) {
          console.log(error.message);
        }
        images.current.value = null;
        setIsloading(false);
      }
    },
    [images]
  );

  const handlerClick = useCallback(
    (e) => {
      images.current.click();
    },
    [images]
  );

  useEffect(() => {
    axios
      .get(`${backend_url}/meme/upload`)
      .then((res) => {
        setFiles(res.data);
        setIsloading(false)
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container-fluid px-0 text-white vw-100 vh-100 overflow-hidden">
      <div className="meme-header m-3 d-flex justify-content-center">
        <h1 className="text-center text-capitalize mt-2">
          mèmes generator <SelectFile onClick={handlerClick} />
        </h1>
      </div>
      <div className="meme-body d-flex flex-wrap align-items-center justify-content-center overflow-y-auto overflow-x-hidden">
        {files?.length ? (
          <>
            {files.map((f) => (
              <Image className="m-3" url={f.url} key={v4()} />
            ))}
          </>
        ) : (
          <div className=" p-3 border text-capitalize rounded no-files">
            {" "}
            {isloading ? "loading..." : "no file selected"}
          </div>
        )}
      </div>
      <input
        ref={images}
        multiple
        onChange={handlerChange}
        type="file"
        accept=".png, .jpg, .jpeg"
        id="images"
        hidden
        name="images"
      />
    </div>
  );
}

export default Home;

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SelectFile from "../../components/SelectFile";
import axios from "axios";
import { backend_url } from "../../utils";
import Image from "../../components/Image";
import { v4 } from "uuid";
import { memesContext } from "../../contexts/memesProvider";

function Home() {
  const images = useRef(null);

  const [files, setFiles] = useState([]);

  const [isloading, setIsloading] = useState(true);

  const [isdeleting, setIsdeleting] = useState(false);

  const { memes } = useContext(memesContext);

  const uploadFiles = useCallback(
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
            .post(`${backend_url}/meme/upload`, fd, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => res.data);

          setFiles((f) => [...f, ...result]);
        } catch (error) {
          console.log(error.message);
          setIsloading(false);
        }
        images.current.value = null;
        setIsloading(false);
      }
    },
    [images]
  );

  const chooseFiles = useCallback(
    (e) => {
      images.current.click();
    },
    [images]
  );

  const deleteFile = useCallback(
    async (e, file) => {
      try {
        setIsdeleting(true);
        let result = await axios
          .patch(`${backend_url}/memes/delete`, { file })
          .then((res) => res.data);

        if (result?.ok) {
          let data = files;
          let index = data.findIndex(
            (f) => f.filename === result.file.filename
          );

          if (index !== -1) {
            data.splice(index, 1);
            setFiles([...data]);
          }
        }
        setIsdeleting(false);
      } catch (error) {
        setIsdeleting(false);
        console.log(error);
      }
    },
    [files]
  );

  useEffect(() => {
    axios
      .get(`${backend_url}/meme/upload`)
      .then((res) => {
        setIsloading(false);
        setFiles(res.data);
      })
      .catch((error) => {
        setIsloading(false);
        console.log(error);
      });
  }, []);

  return (
    <div className="container-fluid px-0 text-white vw-100 vh-100 overflow-hidden">
      <div className="meme-header m-3 d-flex justify-content-center align-items-center">
        <h1 className="text-center text-capitalize mt-2">
          mèmes generator{" "}
          <SelectFile onClick={chooseFiles} isloading={isloading} isdeleting={isdeleting} />
        </h1>
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
      <div className="meme-body d-flex flex-wrap align-items-center justify-content-center overflow-y-auto overflow-x-hidden">
        {files?.length ? (
          <>
            {files.map((f) => (
              <Image
                className="m-3"
                url={f.url}
                ext={f.ext}
                key={v4()}
                isdeleting={isdeleting}
                remove={(e) => deleteFile(e, f)}
              />
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
        onChange={uploadFiles}
        type="file"
        accept=".png,.jpg,.jpeg,.svg"
        id="images"
        hidden
        name="images"
      />
    </div>
  );
}

export default Home;

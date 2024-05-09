import React, { useCallback, useContext, useRef, useState } from "react";
import Draggable from "react-draggable";
import "./css/current.css";
import InputSize from "./InputSize";
import { Session, download, weight } from "../utils";
import * as htmlToImage from "html-to-image";
import { v4 } from "uuid";
import { memesContext } from "../contexts/memesProvider";
function Current({ url = "#", ext = "" }) {
  const [text, setText] = useState("");

  const { setMemes } = useContext(memesContext);

  const imageRef = useRef(null);

  const [textStyle, setTextStyle] = useState({
    color: "#000000",
    textTransform: "lowercase",
    fontSize: "10",
    unity: "px",
    fontWeight: "",
  });

  const [imageStyle, setImageStyle] = useState({
    width: "300",
    height: "400",
    unity: "px",
  });

  const save = useCallback(
    async (dataUrl) => {
      let memes = Session.get("memes") ?? [];
      memes.push({ url: dataUrl, ext, id: v4() });
      Session.set("memes", memes);
      setMemes(memes);
      download(dataUrl, ext);
    },
    [ext, setMemes]
  );

  const handlerClick = useCallback(
    async (e) => {
      if (text?.trim()) {
        try {
          if (ext === "jpg" || ext === "jpeg") {
            htmlToImage
              .toJpeg(imageRef.current, { style: { margin: 0 } })
              .then(save)
              .catch(function (error) {
                console.error("oops, something went wrong!", error);
              });
          }

          if (ext === "png") {
            htmlToImage
              .toPng(imageRef.current, { style: { margin: 0 } })
              .then(save)
              .catch(function (error) {
                console.error("oops, something went wrong!", error);
              });
          }

          if (ext === "svg") {
            htmlToImage
              .toSvg(imageRef.current, { style: { margin: 0 } })
              .then(save)
              .catch(function (error) {
                console.error("oops, something went wrong!", error);
              });
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    [text, imageRef, ext, save]
  );

  return (
    <div className="current bg-body text-dark rounded justify-content-center d-flex p-2">
      <div className="current-header d-flex justify-content-center align-items-center flex-column">
        <div className="image position-relative border m-2" ref={imageRef}>
          {text && (
            <Draggable bounds=".image">
              <p
                className="text-draggable position-absolute mb-0"
                style={{
                  ...textStyle,
                  fontSize: textStyle.fontSize.concat(textStyle.unity),
                }}
              >
                {text}
              </p>
            </Draggable>
          )}
          <div
            className="image-content"
            style={{
              width: imageStyle.width.concat(imageStyle.unity),
              height: imageStyle.height.concat(imageStyle.unity),
            }}
          >
            <img
              src={url}
              className="img-fluid h-100 w-100"
              style={{ userSelect: "none" }}
              alt="file upoladed"
            />
          </div>
        </div>
      </div>
      <div className="current-setting ms-2">
        <div className="add-text flex-column d-flex">
          {/* text value */}
          <div className="form-group flex-grow-1">
            <h6 className="text-capitalize text-value fw-bolder text-capitalize text-secondary mb-0">
              Text Value
            </h6>
            <input
              autoFocus
              type="text"
              className="form-control rounded-0"
              placeholder="enter your text"
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          {/* text color */}
          <div className="form-group flex-grow-1">
            <h6 className="color-title fw-bolder text-capitalize text-secondary mb-0">
              Text Color
            </h6>
            <input
              role="button"
              value={textStyle.color}
              type="color"
              className="form-control rounded-0"
              placeholder="Text Color"
              id="text-color"
              onChange={(e) =>
                setTextStyle((style) => ({ ...style, color: e.target.value }))
              }
            />
          </div>

          {/* font weight */}
          <div className="form-group flex-grow-1">
            <h6 className="text-transform fw-bolder text-capitalize text-secondary mb-0">
              font weight
            </h6>
            <select
              className="form-select text-capitalize"
              id="fontWeigth"
              aria-label="Floating label select text transformt"
              value={textStyle.fontWeight}
              onChange={(e) =>
                setTextStyle((style) => ({
                  ...style,
                  fontWeight: e.target.value,
                }))
              }
            >
              {weight.map((val) => (
                <option key={v4()} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>

          {/* text transform */}
          <div className="form-group flex-grow-1">
            <h6 className="text-transform fw-bolder text-capitalize text-secondary mb-0">
              text transform
            </h6>
            <select
              className="form-select text-capitalize"
              id="floatingSelect"
              aria-label="Floating label select text transformt"
              value={textStyle.textTransform}
              onChange={(e) =>
                setTextStyle((style) => ({
                  ...style,
                  textTransform: e.target.value,
                }))
              }
            >
              <option value="lowercase">lowercase</option>
              <option value="capitalize">capitalize</option>
              <option value="uppercase">uppercase</option>
            </select>
          </div>

          {/* text size */}
          <div className="text-size d-flex flex-column">
            <h6 className="text-transform fw-bolder text-capitalize text-secondary mb-0">
              text sizing
            </h6>
            <InputSize
              input={{
                type: "number",
                className: "form-control rounded-0 text-size-input",
                placeholder: "size",
                value: textStyle.fontSize,
                onChange(e) {
                  setTextStyle((style) => ({
                    ...style,
                    fontSize: e.target.value,
                  }));
                },
              }}
              select={{
                className:
                  "form-select text-end text-capitalize rounded-0 border-0",
                "aria-label": "Floating label select size",
                value: textStyle.unity,
                onChange(e) {
                  setTextStyle((style) => ({
                    ...style,
                    unity: e.target.value,
                  }));
                },
                options: ["px", "rem", "em"],
              }}
            />
          </div>

          {/* image size */}
          <div className="text-size d-flex flex-column">
            <h6 className="text-transform fw-bolder text-capitalize text-secondary mb-0">
              image sizing
            </h6>
            <small className="text-muted">width</small>
            <InputSize
              input={{
                type: "number",
                className: "form-control rounded-0 text-size-input",
                placeholder: "width",
                value: imageStyle.width,
                onChange(e) {
                  setImageStyle((style) => ({
                    ...style,
                    width: e.target.value,
                  }));
                },
              }}
              select={{
                className: "form-select  text-capitalize rounded-0 border-0",
                "aria-label": "Floating label select size",
                value: imageStyle.unity,
                onChange(e) {
                  setImageStyle((style) => ({
                    ...style,
                    unity: e.target.value,
                  }));
                },
                options: ["px"],
              }}
            />

            <small className="text-muted">height</small>
            <InputSize
              input={{
                type: "number",
                className: "form-control rounded-0 text-size-input",
                placeholder: "height",
                value: imageStyle.height,
                onChange(e) {
                  setImageStyle((style) => ({
                    ...style,
                    height: e.target.value,
                  }));
                },
              }}
              select={{
                className: "form-select text-capitalize rounded-0 border-0",
                "aria-label": "Floating label select size",
                value: imageStyle.unity,
                onChange(e) {
                  setImageStyle((style) => ({
                    ...style,
                    unity: e.target.value,
                  }));
                },
                options: ["px"],
              }}
            />
          </div>

          <div
            className="add flex-shrink-0 btn text-capitalize btn-primary rounded-0 mt-3"
            onClick={handlerClick}
          >
            save
          </div>
        </div>
      </div>
    </div>
  );
}

export default Current;

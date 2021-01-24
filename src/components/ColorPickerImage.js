import React, { useState, useEffect, useRef, useCallback } from "react";

var lastPosition = { x: 0, y: 0 };
function ColorPickerImage({ onGetColor = () => {}, onSetColor = () => {} }) {
  const [baseImage, setBaseImage] = useState(null);
  const canvasRef = useRef();
  const [state, setState] = useState({
    crop: { x: 0, y: 0 },
    zoom: 1,
    minZoom: 1,
    maxZoom: 3,
    pickColor: true,
    color: { r: 0, g: 0, b: 0, hex: "" },
  });

  const [dragState, setDrag] = useState({
    dragged: false,
    lastPosition: { x: 0, y: 0 },
    startPosition: { x: 0, y: 0 },
  });

  const drawCanvas = useCallback(
    (x, y, zoom) => {
      let canvas = canvasRef.current;
      let context = canvas.getContext("2d");
      let Img = new Image();
      Img.src = baseImage;
      Img.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(Img, x, y, canvas.width * zoom, canvas.height * zoom);
        lastPosition = { x: x, y: y };
      };
    },
    [canvasRef, baseImage]
  );

  const resetCanvas = useCallback(() => {
    lastPosition = { x: 0, y: 0 };
    setDrag((ds) => ({ ...ds, lastPosition: { x: 0, y: 0 } }));
    setState((st) => ({ ...st, zoom: 1 }));
    drawCanvas(0, 0, 1);
  }, [drawCanvas]);

  useEffect(() => {
    resetCanvas();
  }, [baseImage, resetCanvas]);

  useEffect(() => {
    if (baseImage)
      drawCanvas(
        dragState.lastPosition.x,
        dragState.lastPosition.y,
        state.zoom
      );
  }, [state.zoom, baseImage, dragState, drawCanvas]);

  const startDrag = (e) => {
    let canvas = canvasRef.current;
    let rect = canvas.getBoundingClientRect();

    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    let x = clientX - rect.left;
    let y = clientY - rect.top;

    setDrag({
      ...dragState,
      dragged: true,
      startPosition: { x: x, y: y },
    });
    return false;
  };

  const dragImage = (e) => {
    if (dragState.dragged) {
      let canvas = canvasRef.current;
      let rect = canvas.getBoundingClientRect();

      let clientX, clientY;
      if (e.touches) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      let x = clientX - rect.left;
      let y = clientY - rect.top;
      x = dragState.lastPosition.x + x - dragState.startPosition.x;
      y = dragState.lastPosition.y + y - dragState.startPosition.y;
      drawCanvas(x, y, state.zoom);
    }
    return false;
  };

  const endDrag = (e) => {
    setDrag({
      ...dragState,
      lastPosition: lastPosition,
      dragged: false,
    });
    return false;
  };

  const getColor = (e) => {
    let canvas = canvasRef.current;
    let context = canvas.getContext("2d");
    let rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    let x = clientX - rect.left;
    let y = clientY - rect.top;
    x = x * (canvas.width / rect.width);
    y = y * (canvas.height / rect.height);
    let color = context.getImageData(x, y, 1, 1).data;
    onGetColor({
      r: color[0],
      g: color[1],
      b: color[2],
      a: color[3],
      hex: rgbToHex(color[0], color[1], color[2]),
    });
    setState({
      ...state,
      color: {
        r: color[0],
        g: color[1],
        b: color[2],
        a: color[3],
        hex: rgbToHex(color[0], color[1], color[2]),
      },
    });
    return false;
  };

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  return (
    <div>
      {!baseImage && (
        <label htmlFor="image-base" className="ant-btn">
          Select Image
        </label>
      )}

      <div
        className="processed-image-container"
        style={{ display: baseImage ? "block" : "none" }}
      >
        <input
          id="image-base"
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          onChange={(e) => {
            let file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
              setBaseImage(reader.result);
            };
            if (file) {
              reader.readAsDataURL(file);
              setBaseImage(reader.result);
            } else {
              setBaseImage(null);
            }
          }}
        />
        <div className="processed-image-base">
          <canvas
            ref={canvasRef}
            id="result-canvas"
            width="600"
            height="400"
            style={{
              border: "1px solid #333",
              width: "100%",
              height: "100%",
            }}
          />
          <div
            className="canvas-controller"
            style={{
              cursor: state.pickColor
                ? "crosshair"
                : dragState.dragged
                ? "move"
                : "auto",
            }}
            onClick={() => {
              // if (state.pickColor) {
              //   setState({ ...state, pickColor: false });
              // }
              onSetColor(state.color);
            }}
            // onWheel={(e) => {
            //   let zoom = state.zoom - e.deltaY / 100;
            //   if (zoom >= state.maxZoom) zoom = state.maxZoom;
            //   if (zoom <= state.minZoom) zoom = state.minZoom;
            //   setState({ ...state, zoom: zoom });
            // }}
            onMouseDown={startDrag}
            onMouseUp={endDrag}
            onMouseMove={(e) => {
              getColor(e);
              // dragImage(e);
            }}
            onTouchStart={startDrag}
            onTouchMove={state.pickColor ? getColor : dragImage}
            onTouchEnd={endDrag}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ColorPickerImage;

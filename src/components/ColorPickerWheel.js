import React, { useEffect } from "react";

function ColorPickerWheel({ onGetColor = () => {}, onSetColor = () => {} }) {
  function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  function generateColorWheel(size, centerColor) {
    if (size === void 0) {
      size = 400;
    }
    if (centerColor === void 0) {
      centerColor = "white";
    }
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.height = size;
    var canvasClone = document.createElement("canvas");
    canvasClone.width = canvasClone.height = size;
    var canvasCloneCtx = canvasClone.getContext("2d");
    var angle = 0;
    var hexCode = [255, 0, 0];
    var pivotPointer = 0;
    var colorOffsetByDegree = 4.322;
    while (angle++ < 360) {
      var pivotPointerbefore = (pivotPointer + 3 - 1) % 3;
      // var pivotPointerAfter = (pivotPointer + 3 + 1) % 3;
      if (hexCode[pivotPointer] < 255) {
        hexCode[pivotPointer] =
          hexCode[pivotPointer] + colorOffsetByDegree > 255
            ? 255
            : hexCode[pivotPointer] + colorOffsetByDegree;
      } else if (hexCode[pivotPointerbefore] > 0) {
        hexCode[pivotPointerbefore] =
          hexCode[pivotPointerbefore] > colorOffsetByDegree
            ? hexCode[pivotPointerbefore] - colorOffsetByDegree
            : 0;
      } else if (hexCode[pivotPointer] >= 255) {
        hexCode[pivotPointer] = 255;
        pivotPointer = (pivotPointer + 1) % 3;
      }
      // canvasCloneCtx.clearRect(0, 0, size, size);
      var grad = canvasCloneCtx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      );
      grad.addColorStop(0, centerColor);
      grad.addColorStop(
        1,
        "rgb(" +
          hexCode
            .map(function (h) {
              return Math.floor(h);
            })
            .join(",") +
          ")"
      );
      canvasCloneCtx.fillStyle = grad;
      canvasCloneCtx.globalCompositeOperation = "source-over";
      canvasCloneCtx.beginPath();
      canvasCloneCtx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      canvasCloneCtx.closePath();
      canvasCloneCtx.fill();
      canvasCloneCtx.globalCompositeOperation = "destination-out";
      canvasCloneCtx.beginPath();
      canvasCloneCtx.arc(
        size / 2,
        size / 2,
        0,
        degreesToRadians(angle + 1),
        degreesToRadians(angle + 1)
      );
      canvasCloneCtx.arc(
        size / 2,
        size / 2,
        size / 2 + 1,
        degreesToRadians(angle + 1),
        degreesToRadians(angle + 1)
      );
      canvasCloneCtx.arc(
        size / 2,
        size / 2,
        size / 2 + 1,
        degreesToRadians(angle + 1),
        degreesToRadians(angle - 1)
      );
      canvasCloneCtx.arc(
        size / 2,
        size / 2,
        0,
        degreesToRadians(angle + 1),
        degreesToRadians(angle - 1)
      );
      canvasCloneCtx.closePath();
      canvasCloneCtx.fill();
      ctx.drawImage(canvasClone, 0, 0);
    }
    return canvas;
  }

  //Get color wheel canvas
  var colorWheel = generateColorWheel(300);
  var contextWheel = colorWheel.getContext("2d");

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  function colorWheelMouse(evt) {
    // var ctx = colorWheel.getContext("2d");
    var { data } = contextWheel.getImageData(evt.offsetX, evt.offsetY, 1, 1);
    onGetColor({
      r: data[0],
      g: data[1],
      b: data[2],
      hex: rgbToHex(data[0], data[1], data[2]),
    });
  }

  function setColorWheel(evt) {
    var { data } = contextWheel.getImageData(evt.offsetX, evt.offsetY, 1, 1);
    onSetColor({
      r: data[0],
      g: data[1],
      b: data[2],
      hex: rgbToHex(data[0], data[1], data[2]),
    });
  }

  colorWheel.onclick = setColorWheel;
  colorWheel.onmousemove = colorWheelMouse;
  colorWheel.ontouchmove = colorWheelMouse;

  useEffect(() => {
    const wheelcontainer = document.querySelector("#colorwheel-container");
    wheelcontainer.appendChild(colorWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id="colorwheel-container"></div>;
}

export default ColorPickerWheel;

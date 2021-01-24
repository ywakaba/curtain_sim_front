import React, { useState, useRef, useEffect } from "react";
//import ReactDOM from 'react-dom';
import { Layout, Row, Col, Slider } from "antd";
// import {
//   UpOutlined,
//   LeftOutlined,
//   DownOutlined,
//   RightOutlined,
// } from "@ant-design/icons";
import { ColorSelector } from '../components/colorSelector';
import "antd/dist/antd.css";
import "./simulator.css";
import { ClothConditionsSetter } from "../components/clothConditionsSetter";

const laces = [
  "/images/lace_curtains/lace_1.png",
  "/images/lace_curtains/lace_2.png",
  "/images/lace_curtains/lace_3.png",
];
const curtains = [
  "/images/curtains/curtain_1.png",
  "/images/curtains/curtain_2.png",
  "/images/curtains/curtain_3.png",
  "/images/curtains/curtain_4.png",
  "/images/curtains/curtain_5.png",
];

const style = {
//  backgroundColor: "#ffffff",
  width: "800px",
//  padding: "8px",
//  margin: "8px",
//  borderRadius: "8px"
};
// const ImageList = ({ images, setSelected, selectedImage }) => (
//   <div className="images-container">
//     {images.map((image, i) => (
//       <div key={i} className="image-container">
//         <img
//           alt=""
//           className={`image-item ${selectedImage === i && "selected"}`}
//           src={image}
//           onClick={() => {
//             if (i === selectedImage) setSelected(null);
//             else {
//               setSelected(i);
//             }
//           }}
//         />
//       </div>
//     ))}
//   </div>
// );

var lastPosition = { x: 0, y: 0 };
function Simulator() {
  const [selectedCurtain, setCurtain] = useState(null);
  const [selectedLace, setLace] = useState(null);
  const [baseImage, setBaseImage] = useState(null);
  const canvasRef = useRef();
  const [state, setState] = useState({
    crop: { x: 0, y: 0 },
    zoom: 1,
    minZoom: 1,
    maxZoom: 3,
    pickColor: false,
    color: { r: 0, g: 0, b: 0, hex: "" },
  });

  const [dragState, setDrag] = useState({
    dragged: false,
    lastPosition: { x: 0, y: 0 },
    startPosition: { x: 0, y: 0 },
  });

  // const move = (direction) => {
  //   switch (direction) {
  //     case "left":
  //       window.requestAnimationFrame(this.zoom);
  //       return;
  //     case "right":
  //       window.requestAnimationFrame(this.zoom);
  //       return;
  //     case "up":
  //       window.requestAnimationFrame(this.zoom);
  //       return;
  //     case "down":
  //       window.requestAnimationFrame(this.zoom);
  //       return;
  //   }
  // };

  const [clothType, setClothType] = useState('lace');

  const [stage, setStage] = useState('setConditions');

  // useEffect(() => {
  //   resetCanvas();
  // }, [baseImage]);

  // useEffect(() => {
  //   if (baseImage)
  //     drawCanvas(
  //       dragState.lastPosition.x,
  //       dragState.lastPosition.y,
  //       state.zoom
  //     );
  // }, [state.zoom, baseImage]);

  // const resetCanvas = () => {
  //   lastPosition = { x: 0, y: 0 };
  //   setDrag({ ...dragState, lastPosition: { x: 0, y: 0 } });
  //   setState({ ...state, zoom: 1 });
  //   drawCanvas(0, 0, 1);
  // };

  // const drawCanvas = (x, y, zoom) => {
  //   let canvas = canvasRef.current;
  //   let context = canvas.getContext("2d");
  //   // let rect = canvas.getBoundingClientRect();
  //   let Img = new Image();
  //   Img.src = baseImage;
  //   Img.onload = () => {
  //     context.clearRect(0, 0, canvas.width, canvas.height);

  //     context.drawImage(
  //       Img,
  //       x,
  //       y,
  //       // width,
  //       // height,
  //       // 0,
  //       // 0,
  //       canvas.width * zoom,
  //       canvas.height * zoom
  //     );
  //     lastPosition = { x: x, y: y };
  //   };
  // };

  // const startDrag = (e) => {
  //   let canvas = canvasRef.current;
  //   let rect = canvas.getBoundingClientRect();

  //   let clientX, clientY;
  //   if (e.touches) {
  //     clientX = e.touches[0].clientX;
  //     clientY = e.touches[0].clientY;
  //   } else {
  //     clientX = e.clientX;
  //     clientY = e.clientY;
  //   }
  //   let x = clientX - rect.left;
  //   let y = clientY - rect.top;

  //   setDrag({
  //     ...dragState,
  //     dragged: true,
  //     startPosition: { x: x, y: y },
  //   });
  //   return false;
  // };

  // const dragImage = (e) => {
  //   if (dragState.dragged) {
  //     let canvas = canvasRef.current;
  //     let rect = canvas.getBoundingClientRect();

  //     let clientX, clientY;
  //     if (e.touches) {
  //       clientX = e.touches[0].clientX;
  //       clientY = e.touches[0].clientY;
  //     } else {
  //       clientX = e.clientX;
  //       clientY = e.clientY;
  //     }

  //     let x = clientX - rect.left;
  //     let y = clientY - rect.top;
  //     x = dragState.lastPosition.x + x - dragState.startPosition.x;
  //     y = dragState.lastPosition.y + y - dragState.startPosition.y;
  //     drawCanvas(x, y, state.zoom);
  //   }
  //   return false;
  // };

  // const endDrag = (e) => {
  //   setDrag({
  //     ...dragState,
  //     lastPosition: lastPosition,
  //     dragged: false,
  //   });
  //   return false;
  // };

  // const getColor = (e) => {
  //   let canvas = canvasRef.current;
  //   let context = canvas.getContext("2d");
  //   let rect = canvas.getBoundingClientRect();
  //   let clientX, clientY;
  //   if (e.touches) {
  //     clientX = e.touches[0].clientX;
  //     clientY = e.touches[0].clientY;
  //   } else {
  //     clientX = e.clientX;
  //     clientY = e.clientY;
  //   }
  //   let x = clientX - rect.left;
  //   let y = clientY - rect.top;
  //   x = x * (canvas.width / rect.width);
  //   y = y * (canvas.height / rect.height);
  //   let color = context.getImageData(x, y, 1, 1).data;
  //   setState({
  //     ...state,
  //     color: {
  //       r: color[0],
  //       g: color[1],
  //       b: color[2],
  //       a: color[3],
  //       hex: rgbToHex(color[0], color[1], color[2]),
  //     },
  //   });
  //   return false;
  // };

  // function componentToHex(c) {
  //   var hex = c.toString(16);
  //   return hex.length === 1 ? "0" + hex : hex;
  // }
  // function rgbToHex(r, g, b) {
  //   return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  // }

  const onClickLace = () => {
    setClothType('lace');
  };

  const onClickDrape = () => {
    setClothType('drape');
  };

  const onClickBack = () => {
    alert('戻る');
  };

  const onClickDeside = () => {
    alert('決定');
  };

  return (
    <div style={style}>
      <Layout className="container">
        {/* <Layout.Content>
          <Col span={24} style={{ padding: "0 12px" }}>
            <Row>
              <Col span={24} style={{ display: baseImage ? "block" : "none" }}>
                <div className="processed-image-container">
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
                        if (state.pickColor) {
                          setState({ ...state, pickColor: false });
                        }
                      }}
                      onWheel={(e) => {
                        let zoom = state.zoom - e.deltaY / 100;
                        if (zoom >= state.maxZoom) zoom = state.maxZoom;
                        if (zoom <= state.minZoom) zoom = state.minZoom;
                        setState({ ...state, zoom: zoom });
                      }}
                      onMouseDown={startDrag}
                      onMouseUp={endDrag}
                      onMouseMove={state.pickColor ? getColor : dragImage}
                      onTouchStart={startDrag}
                      onTouchMove={state.pickColor ? getColor : dragImage}
                      onTouchEnd={endDrag}
                    ></div>
                    {selectedLace !== null && (
                      <img
                        alt=""
                        className="processed-image-lace"
                        src={laces[selectedLace]}
                      />
                    )}
                    {selectedCurtain !== null && (
                      <img
                        alt=""
                        className="processed-image-curtain"
                        src={curtains[selectedCurtain]}
                      />
                    )}
                  </div>
                </div>
              </Col>
            </Row>
            <br />
            {baseImage && (
              <Row justify="center" align="middle" gutter={[8, 8]}>
                <Col xs={4} md={2} lg={1}>
                  <label>Zoom</label>
                </Col>
                <Col xs={20} md={18} lg={18}>
                  <Slider
                    value={state.zoom}
                    min={1}
                    max={3}
                    step={0.01}
                    onChange={(zoom) => {
                      setState({ ...state, zoom: zoom });
                    }}
                  />
                </Col>
              </Row>
            )}

            {baseImage && (
              <Row justify="center" align="middle" gutter={[16, 16]}>
                <Col
                  xs={12}
                  md={4}
                  lg={4}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button className="ant-btn full" onClick={resetCanvas}>
                    Reset Position
                  </button>
                </Col>
                <Col
                  xs={12}
                  md={4}
                  lg={4}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className={`ant-btn full ${
                      state.pickColor && "btn-active"
                    }`}
                    onClick={() => {
                      setState({ ...state, pickColor: !state.pickColor });
                    }}
                  >
                    Pick Color
                  </button>
                </Col>
                <Col
                  xs={24}
                  md={4}
                  lg={4}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      margin: 4,
                      height: 25,
                      width: 200,
                      border: "1px solid #333",
                      backgroundColor: `rgba(${state.color.r},${state.color.g},${state.color.b},${state.color.a})`,
                    }}
                  />
                </Col>
                <Col xs={24} md={8} lg={8}>
                  <div className="space-evenly">
                    <div>
                      <label>RGB:</label>
                      <span>
                        ({state.color.r},{state.color.g},{state.color.b})
                      </span>
                    </div>
                    <div>
                      <label>Hex:</label> <span>{state.color.hex}</span>
                    </div>
                  </div>
                </Col>
              </Row>
            )}
            <Row justify="center">
              <Col>
                <label htmlFor="image-base" className="ant-btn">
                  Select Image
                </label>
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
              </Col>
            </Row>
          </Col>
        </Layout.Content> */}
        <div className='center'><div className='arrow_box center' style={{margin: '20px 0'}}>条件設定を選択してください</div></div>
        <div className="d-flex flex-row center">
          <button id='btnLace' className="btn btn-success" onClick={onClickLace}>①レースカーテン生地</button>
          <button id='btnDrape' className="btn btn-success" onClick={onClickDrape}>②ドレープカーテン生地</button>
        </div>
        <ClothConditionsSetter clothType={clothType} style={{margin: '20px 0'}}/>
        <div className="d-flex flex-row" style={{margin: '20px auto'}}>
          <button id="btnBack" className="btn btn-secondary btn-lg"  onClick={onClickBack}>＜　戻る</button>
          <button id="btnDeside" className="btn btn-danger btn-lg" onClick={onClickDeside}>決定　＞</button>
        </div>
      </Layout>
    </div>
  );
}
export default Simulator;

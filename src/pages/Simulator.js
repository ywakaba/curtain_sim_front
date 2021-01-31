import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
//import ReactDOM from 'react-dom';
import { Layout, Row, Col, Slider } from "antd";
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

function Simulator() {

  const [clothType, setClothType] = useState('lace');

  const [stage, setStage] = useState('setConditions');

  const [functionsData, setFunctionsData] = useState({ hits: [] });
  
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

  useEffect(async () => {
    // axios.get("/functions").then(response => {
    //   alert('axios.get');
    //   alert(response.data);
    //   setFunctionsData({ functions: response.data });
    // });
    const result = await axios.get("/functions");
    console.log(result);
    // alert('await axios.get');
    setFunctionsData(result.data);
  }, []); 
  
  return (
    <div style={style}>
      <Layout className="container">
        <div className='center'><div className='arrow_box center' style={{margin: '20px 0'}}>条件設定を選択してください</div></div>
        <div className="d-flex flex-row center">
          <button id='btnLace' className="btn btn-success" onClick={onClickLace}>①レースカーテン生地</button>
          <button id='btnDrape' className="btn btn-success" onClick={onClickDrape}>②ドレープカーテン生地</button>
        </div>
        {functionsData.length &&
        (<ClothConditionsSetter clothType={clothType} functionsData={functionsData} style={{margin: '20px 0'}}/>)}
        <div className="d-flex flex-row" style={{margin: '20px auto'}}>
          <button id="btnBack" className="btn btn-secondary btn-lg"  onClick={onClickBack}>＜　戻る</button>
          <button id="btnDeside" className="btn btn-danger btn-lg" onClick={onClickDeside}>決定　＞</button>
        </div>
      </Layout>
    </div>
  );
}
export default Simulator;

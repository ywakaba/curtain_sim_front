import React, { useState } from "react";
//import ReactDOM from 'react-dom';
import { Layout, Row, Col, Slider } from "antd";
// import SelectPrice from './SelectPrice';
import { CustomCheckBoxes } from './customCheckBoxes';
import { CustomSelectBox } from './customSelectBox';
import { ColorSelector } from './colorSelector';
import { ImageList } from './imageList';

export const ClothConditionsSetter = (props) => {
  const { clothType } = props;

    // const funcOptions = {'disaster': '防災', 'thermal_barrier': '遮熱', 'antifouling': '防汚', 'uv_cutting': 'UVカット',
    //                      'washable': 'ウオッシャブル', 'mirror': 'ミラー', 'pollen': '花粉キャッチ', 'outside_viewable': '外が見える'};
    const funcOptions = [{id: 'disaster', name: '防災'}, {id: 'thermal_barrier', name: '遮熱'}, {id: 'antifouling', name: '防汚'},
                         {id: 'uv_cutting', name: 'UVカット'}, {id: 'washable', name: 'ウオッシャブル'}, {id: 'mirror', name: 'ミラー'},
                         {id: 'pollen', name: '花粉キャッチ'}, {id: 'outside_viewable', name: '外が見える'}];
    // const funcOptions = ['disaster', 'thermal_barrier'];
    // const funcNames = ['防災', '遮熱'];
    const initialVal = { disaster: false, thermal_barrier: false, antifouling: false, uv_cutting: false,
                         washable: false, mirror: false, pollen: false, outside_viewable: false };
    const [val, setVal] = React.useState(initialVal);

    const [selectedCurtain, setCurtain] = useState(null);
    const [selectedLace, setLace] = useState(null);

    const handleChange = e => {
      const newVal = Object.assign({}, val, {
        [e.target.value]: !val[e.target.value]
      });
      setVal(newVal);
    };
    // const keys = funcOptions.keys;
    // console.log(keys);
    // const names = funcOptions.values;
    // console.log(names);
    const prices = [
      { value: "all_prices", label: "すべての価格" },
      { value: "ge_600000", label: "60,000～" },
      { value: "lt_600000", label: "～59,999" },
      { value: "le_400000", label: "～40,000" },
      { value: "le_200000", label: "～20,000" },
      { value: "le_100000", label: "～10,000" }
    ];

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
    
    return (
      <>
        {clothType === 'drape' &&
        (<div id="color-selector" className="d-flex flex-row">
          <div style={{width: '30%'}}>カラー</div>
          <ColorSelector/>
        </div>)}
        <div className="d-flex flex-row" style={{margin: '20px 0'}}>
          <div style={{width: '30%'}}>機能</div>
          <div id='func_conds' className="d-flex flex-column">
            <CustomCheckBoxes options={funcOptions}/>
          </div>
          <p>選択値：{Object.keys(val).filter(item => val[item]).join(', ')}</p>
        </div>
        {clothType === 'drape' &&
        (<div className="d-flex flex-row" style={{margin: '20px 0'}}>
          <div style={{width: '30%'}}>テイスト</div>
          <div>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <ImageList
                  images={laces}
                  setSelected={setLace}
                  selectedImage={selectedLace}
                />
              </Col>
            </Row>
            {/* <Row gutter={[16, 16]}>
              <Col span={24}>
                <ImageList
                  images={curtains}
                  setSelected={setCurtain}
                  selectedImage={selectedCurtain}
                />
              </Col>
            </Row> */}
          </div>
        </div>)}
        <div className="d-flex flex-row">
          <div style={{width: '30%'}}>価格帯</div>
          <CustomSelectBox options={prices} defaultValue="all_prices" />
          {/* <SelectPrice style={{width: '70%'}}/> */}
        </div>
      </>
    );
  }

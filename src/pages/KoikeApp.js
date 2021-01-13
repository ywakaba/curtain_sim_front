import React, { Component , useState, useRef, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/header';
import Menu from '../components/Menu';
import "../styles.css";

const style = {
  backgroundColor: "#ffffff",
  width: "600px",
//  padding: "8px",
//  margin: "0 0 0 0",
//  borderRadius: "8px"
};

const btn_margin = {
  margin: "10px 0"
}

export const KoikeApp = () => {
  const [stage, setStage] = useState(0);

  const onClickCg = () => {
    setStage(1);
  };

  const onClickPhoto = () => {
    setStage(2);
  };

  return (
    <div style={style}>
      <Header />
      <div className="row d-block text-center">
        { stage === 0 ? <Guidance /> : null }
        <div className='center arrow_box'>{ stage === 0 ? 'まずはベースの画像を選択してください' : '装飾アイテムを選択してください' }</div>
      </div>
      <div className="d-flex flex-column">
        <button className="btn btn-primary btn-lg" onClick={onClickCg}>ＣＧ</button>
        { stage === 1 ? <CgButtons /> : null}
        <button className="btn btn-danger btn-lg" onClick={onClickPhoto}>写真</button>
        { stage === 2 ? <PhotoButtons /> : null }
      </div>
    </div>
  );
}

const Guidance = () => (
  <div className="text-center">
    <div className="col-12">
      <h5 className="my-3 text-success">Window decoration</h5>
    </div>
    <div className="col-12">
      <h5 className="my-3 text-success">シミュレーション</h5>
    </div>
    <div className="col-12">
      <h6 className="my-3 text-success">着せ替えシミュレーションを使って</h6>
    </div>
    <div className="col-12">
      <h6 className="my-3 text-success">お気に入りのコーディネートを見つけましょう。</h6>
    </div>
  </div>
)

const CgButtons = () => (
  <div>
    <button className="btn btn-primary">カーテン</button>
    <button className="btn btn-secondary">ローマンシェード</button>
    <button className="btn btn-success">ロールスクリーン</button>
    <button className="btn btn-dark">壁紙</button>
  </div>
)

const PhotoButtons = () => {
  const onClickCurtain = () => {
    document.getElementById('photo_buttons').style.display='block';
  };

  return (
    <div>
      <button className="btn btn-primary" data-toggle="collapse" data-target="#photo_buttons" aria-expanded="false" aria-controls="photo_buttons"
       onClick={onClickCurtain}>カーテン</button>
      <div id='photo_buttons' className="collapse">
        <Link to="/simulate">写真またはビデオを選択</Link><br/>
        <Link to="/simulate">写真またはビデオを撮る</Link><br/>
        <Link to="/simulate">書類をスキャン</Link>
      </div>
      <button className="btn btn-secondary">ローマンシェード</button>
      <button className="btn btn-success">ロールスクリーン</button>
      <button className="btn btn-dark">壁紙</button>
    </div>
  );
}

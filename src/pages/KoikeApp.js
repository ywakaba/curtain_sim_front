import React, { Component , useState, useRef, useEffect }  from 'react';
//import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
// import { withRouter } from "react-router-dom";
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types'
import { Header } from '../components/header';
import Menu from '../components/Menu';
import "../styles.css";

// import Simulator from './Simulator';
// const [stage, setStage] = React.useState(0);
// const history = useHistory();
// const handleLink = path => this.history.push(path);
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

    // class KoikeApp2 extends Component {
// function KoikeApp() {
  const onClickCg = () => {
    setStage(1);
  };

  const onClickPhoto = () => {
    setStage(2);
  };

//   static propTypes = {
//     match: PropTypes.object.isRequired,
//     location: PropTypes.object.isRequired,
//     history: PropTypes.object.isRequired
//   }
  //コンストラクタ内でstateにtodosを宣言
  // constructor() {
  //   super();
  //   this.state = {
  //     stage: 0
  //   }
  //   // メニュー要素への参照を初期化（後ほどレンダラーの中でrefを割り当てます。）
  //   this.menu = null;
  //   // イベントハンドラのバインド
  //   this.onContextMenu = this.onContextMenu.bind(this);
  //   this.onMenuItemClick = this.onMenuItemClick.bind(this);
  //   this.onCurtainButtonClick = this.onCurtainButtonClick.bind(this);
  //   this.onPhotoClick = this.onPhotoClick.bind(this);

  //   this.toCg = this.toCg.bind(this);
  //   this.toPhoto = this.toPhoto.bind(this);
  //   this.toCurtainPhoto = this.toCurtainPhoto.bind(this);
  //   // this.handleClick = e => {
  //   //   this.props.history.push("/Simulate");
  //   // };
  // }
    // ＣＧボタンがクリックされたら
    // toCg() {
    //   this.setState({stage: 1});
    // }
    // // 写真ボタンがクリックされたら
    // toPhoto() {
    //     this.setState({stage: 2});
    // }

    // // カーテンボタンがクリックされたら
    // toCurtainPhoto() {
    //     this.setState({stage: 2});
    //   }

    // // 右クリックイベントハンドラ
    // onContextMenu(event) {
    //   // preventDefault()を忘れると、普通の右クリックメニューが表示されますよ。
    //   event.preventDefault();

    //   // メニュー要素の"show()"メソッドを呼び出します。
    //   // 引数にはマウスポインタの位置情報を渡してあげます。
    //   this.menu.show(event.clientX, event.clientY);
    // }

    // 右クリックメニューでメニューが選択された際にコールバックしてもらうメソッドです。
    // 選択されたメニューの内容(innnerHTML)をstateに設定しています。
    // (これにより、画面左上のメッセージが切り替わるはず。)
    // onMenuItemClick(message) {
    //   switch (message) {
    //     case '写真またはビデオを選択':
    //       this.handleClick('/Simulate');
    //       break;
    //     case '写真またはビデオを撮る':
    //       this.handleClick('/Simulate');
    //       break;
    //     case '書類をスキャン':
    //       this.handleClick('/Simulate');
    //       break;
    //     default: break;
    //   }
    //   this.setState({message: message});
    // }

    // onCurtainButtonClick(event){
    // //   console.log(event);
    // //   this.menu.show(event.clientX, event.clientY);
    //   // 要素を取得
    //   let ele = document.getElementById('photo_buttons');
    //   // 現在の display プロパティの値を保持
    //   // none に設定して非表示
    //   ele.style.display = 'block';
    // }
    // onPhotoClick(event){
    //     console.log(event);
    //     this.menu.show(event.clientX, event.clientY);
    //     // 要素を取得
    //     let ele = document.getElementById('photo_buttons');
    //     // 現在の display プロパティの値を保持
    //     // none に設定して非表示
    //     ele.style.display = 'block';
    //   }
      //テーブルの骨組みを描画し、行の描画はRenderRowsに任せる（その際、todosを渡す）
    //render() {
      return (
          // <div  style={style} onContextMenu={this.onContextMenu} >
          <div style={style}>
            <Header />
            {/* { this.state.message } */}
            { /* コンポーネントもrefで参照できるので、子要素のメソッドを呼び出すことが可能になります。 */ }
            {/* <Menu onMenuItemClick={this.onMenuItemClick} ref={(node) => this.menu = node} /> */}
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
    //}
}
//export default withRouter(KoikeApp);


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

//ReactDOM.render(<KoikeApp2 />, document.getElementById('todoApp'));

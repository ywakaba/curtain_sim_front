import React, { useState } from "react";
import ColorPickerWheel from './ColorPickerWheel';
import ColorPickerImage from './ColorPickerImage';

// export const ColorSelector = () => {
//   return (
//     <>
//     {/* {/* <label>色を選択</label>
//       <input type="color" name="favorite_color" list/>*/ */}    </>
//    );
// };
export const ColorSelector = (props) => {

  const { colorFrom } = props;

  const [colorWheelState, setWheelState] = useState({});
  const [colorWheelHoverState, setWheelHoverState] = useState({});
  const [colorImageState, setImageState] = useState({});
  const [colorImageHoverState, setImageHoverState] = useState({});

  return (
    <>
      {colorFrom === 'palette' &&
      (<div className="d-flex flex-column div_margined">
      <ColorPickerWheel
        onGetColor={(color) => {
          setWheelHoverState(color);
        }}
        onSetColor={(color) => {
          setWheelState(color);
        }}
      />
      <div id='rgb_disp' className="d-flex flex-row">
      <div style={{width: '60%'}}>
        Color: R:{colorWheelHoverState.r} B:{colorWheelHoverState.b} G:{colorWheelHoverState.g}
      </div>
      <div
        style={{
          height: 40,
          width: 120,
          border: "1px solid black",
          backgroundColor: colorWheelHoverState.hex,
        }}
      />
      </div>
      <div id='rgb_disp2' className="d-flex flex-row">
      <div style={{width: '60%'}}>
        Color: R:{colorWheelState.r} B:{colorWheelState.b} G:{colorWheelState.g}
      </div>
      <div
        style={{
          height: 40,
          width: 120,
          border: "1px solid black",
          backgroundColor: colorWheelState.hex,
        }}
      />
      </div>
      </div>) }
      {colorFrom === 'photo' &&
      (<div>
      <span>Color Picker Image</span>
      <ColorPickerImage
        onGetColor={(color) => {
          setImageHoverState(color);
        }}
        onSetColor={(color) => {
          setImageState(color);
        }}
      />
      <div>
        {colorImageHoverState && (
          <p>
            Color: R:{colorImageHoverState.r} B:{colorImageHoverState.b} G:
            {colorImageHoverState.g}
          </p>
        )}
        <div
          style={{
            height: 80,
            border: "1px solid black",
            backgroundColor: colorImageHoverState.hex,
          }}
        />
      </div>
      <div>
        {colorImageState && (
          <p>
            Color: R:{colorImageState.r} B:{colorImageState.b} G:
            {colorImageState.g}
          </p>
        )}
        <div
          style={{
            height: 80,
            border: "1px solid black",
            backgroundColor: colorImageState.hex,
          }}
        />
      </div>
    </div>
      )}
    </>
  );
};


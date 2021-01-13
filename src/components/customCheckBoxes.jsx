import React from "react";

export const CustomCheckBoxes = (props) => {
  const { options } = props;
  return (
    <>
    {/* //   <p className="title">完了のTODO</p>
    //   <ul> */}
        {options.map((option, index) => {
          return (
            <>
              <div class="custom-control custom-checkbox"  style={{transform: 'scale(1.0)'}}>
                <input type="checkbox" class="custom-control-input" id={option.id}/>
                <label class="custom-control-label" for={option.id}>{option.name}</label>
              </div>
            </>
  
            // <div key={todo} className="list-row">
            //   <li>{todo}</li>
            //   <button onClick={() => onClickBack(index)}>戻す</button>
            // </div>
          );
        })}
  {/* //     </ul>
  //   </div> */}
  </>
   );
};

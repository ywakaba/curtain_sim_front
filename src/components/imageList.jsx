import React from "react";

export const ImageList = ({ images, setSelected, selectedImage }) => (
  <div className="images-container">
    {images.map((image, i) => (
      <div key={i} className="image-container">
        <img
          alt=""
          className={`image-item ${selectedImage === i && "selected"}`}
          src={image}
          onClick={() => {
            if (i === selectedImage) setSelected(null);
            else {
              setSelected(i);
            }
          }}
        />
      </div>
    ))}
  </div>
);


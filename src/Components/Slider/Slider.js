import React, { useState } from "react";
import "./Slider.scss";
import { images } from "../../assets";

const Slider = ({slidesData}) => {
  
/*   console.log("slidesData en slider",slidesData); */
  const [selectedProduct, setSelectedProduct] = useState(slidesData[0]);
/*   console.log("selected Product", selectedProduct); */

  const productUse = (selectedId, direction) => {
    const currentIndex = slidesData.findIndex((product) => product._id === selectedId);
  
    if (currentIndex !== -1) {
      let newIndex;
      
      if (direction === "prev") {
        newIndex = (currentIndex + slidesData.length - 1) % slidesData.length;
      } else {
        newIndex = (currentIndex + 1) % slidesData.length;
      }
  
      const newProduct = slidesData[newIndex];
      setSelectedProduct(newProduct);
    }
  };
  

  return (
    <div className="blog-slider">
      {selectedProduct != null ? (
        <div
          key={selectedProduct._id}
          className="blog-slider__item swiper-slide"
        >
          <div className="blog-slider__img">
            <img src={selectedProduct.Photo? `data:image/png;base64,${selectedProduct.Photo}`:images.Uam} alt="" />
          </div>
          <div className="blog-slider__content">
            <span className="blog-slider__code">$ {selectedProduct.Price}</span>
            <div className="blog-slider__title">{selectedProduct.Title}</div>
            <div className="blog-slider__text">{selectedProduct.Text}</div>
{/*             <div className="buttons">
              <a href="#" className="blog-slider__button">
                BUY NOW
              </a>
            </div> */}
            <div className="sliderDots">
              <svg
                onClick={() => productUse(selectedProduct._id, "prev")}
                fill="white"
                viewBox="0 0 16 16"
                height="30px"
                width="40px"
              >
                <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.5 7.5a.5.5 0 010 1H5.707l2.147 2.146a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 11.708.708L5.707 7.5H11.5z" />
              </svg>
              <svg
                onClick={() => productUse(selectedProduct._id , "next")}
                fill="white"
                viewBox="0 0 16 16"
                height="30px"
                width="40px"
              >
                <path d="M8 0a8 8 0 110 16A8 8 0 018 0zM4.5 7.5a.5.5 0 000 1h5.793l-2.147 2.146a.5.5 0 00.708.708l3-3a.5.5 0 000-.708l-3-3a.5.5 0 10-.708.708L10.293 7.5H4.5z" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <p>no hay productos para mostar </p>
      )}
    </div>
  );
};

export default Slider;

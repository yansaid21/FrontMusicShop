import React from 'react';
import "./Section3.scss";
import {images} from "../../assets/index"

const Section3 = () => {
    const partnersData = [
        { _id: 1, name: "AKG", img: images.akg },
        { _id: 2, name: "APPLE", img: images.apple },
        { _id: 3, name: "BEHRINGER", img: images.behringer },
        { _id: 4, name: "CIFUENTES", img: images.cifuentes },
        { _id: 5, name: "DADDARIO", img: images.daddario },
        { _id: 6, name: "FENDER", img: images.fender },
        { _id: 7, name: "FOCAL", img: images.focal },
        { _id: 8, name: "IBANEZ", img: images.ibanez },
        { _id: 9, name: "PRODJ", img: images.proDj },
        { _id: 10, name: "UNIVERSALAUDIO", img: images.ua },
        { _id: 11, name: "UAM", img: images.Uam },
        { _id: 12, name: "YAMAHA", img: images.yamaha },
      ];
      
  return (
    <div className='section3Container'>
      <div className="slider">
        <div className="slide-track">
          {partnersData.map(partner => (
            <div key={partner._id} className="slide">
              <img src={partner.img} alt={partner.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section3;

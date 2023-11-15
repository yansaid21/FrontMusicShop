import React from "react";
import "./NonVerified.scss";
const NonVerified = () => {
  return (
    <div className="backContainer">
    <div className="nonVerifiedContainer">
      <div className="textContainer">
        <div className="textNonVerified">
            <h1>
              UPS  
            </h1>
            <p>
                It seems that you are currently not verified or your password is incorrect
            </p>
            <p>Please <strong>check it</strong>, or contact us to <strong>verify it</strong> soon as possible</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default NonVerified;

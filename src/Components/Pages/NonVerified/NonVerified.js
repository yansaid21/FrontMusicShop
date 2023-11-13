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
                It seems that you are currently not verified
            </p>
            <p>Please <strong>check</strong> your Email to <strong>verify</strong> your account</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default NonVerified;

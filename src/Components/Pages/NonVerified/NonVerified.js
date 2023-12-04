import React from "react";
import "./NonVerified.scss";
const NonVerified = () => {
  return (
    <div className="backContainer">
    <div className="nonVerifiedContainer">
      <div className="textContainer">
        <div className="textNonVerified">
            <h1>
              ¡WELL DONE!  
            </h1>
            <p>
                Now you can <a href="/login">LOGIN</a> to your new account
            </p>
            <p>Please be a <strong>great user</strong>, and enjoy our <strong>benefits</strong> </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default NonVerified;

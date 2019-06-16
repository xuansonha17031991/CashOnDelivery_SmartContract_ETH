import React, { Component } from "react";
import cat from "../img/cat.png";
class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="img">
          <div className="images">
            <img src={cat} alt="cat" />
          </div>
          <span>Coppy Right 2019+</span>
        </div>
      </div>
    );
  }
}

export default Footer;

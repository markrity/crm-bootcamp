import React from "react";

function TopNav(props) {

    return (
        <div className="topnav">
        <div className="topnav_text">
            Beautiz
        </div>
        <div className="links">
          <button href="#">About</button>
          <button href="#">Learn</button>
          <button href="#">Demo</button>
        </div>
      </div>
    );
}


export default TopNav;
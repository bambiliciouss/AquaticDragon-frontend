// import "./../../../assets/css/now-ui-dashboard.css";
// import "./../../../assets/css/bootstrap.min.css"
// import "./../../../assets/css/now-ui-dashboard.css?v=1.5.0"
// import "./../../../assets/demo/demo.css"

import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar" data-color="blue">
      <div className="logo" style={{ textAlign: "center" }}>
        <img
          alt="..."
          src={require("assets/img/logo2.0.png")}
          style={{ width: "100px", height: "auto" }}
        />
        <a href="/" className="simple-text logo-normal">
          Aquatic Dragon
        </a>
      </div>
      <div className="sidebar-wrapper" id="sidebar-wrapper">
        <ul className="nav">
          <li className="active ">
            <a href="/dashboard">
              <i className="now-ui-icons design_app"></i>
              <p>Dashboard</p>
            </a>
          </li>

          <li>
            <a href="/userlist">
              <i className="now-ui-icons users_single-02"></i>
              <p>Customers</p>
            </a>
          </li>
          <li>
            <a href="/employeelist">
              <i className="now-ui-icons business_badge"></i>
              <p>Employee</p>
            </a>
          </li>
          <li>
            <a href="/riderlist">
              <i className="now-ui-icons business_badge"></i>
              <p>Riders</p>
            </a>
          </li>
          <li>
            <a href="/storebranchlist">
              <i className="now-ui-icons shopping_shop"></i>
              <p>Store Branches</p>
            </a>
          </li>
          <li>
            <a href="/gallonlist">
              <i className="now-ui-icons business_bank"></i>
              <p>Gallons</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

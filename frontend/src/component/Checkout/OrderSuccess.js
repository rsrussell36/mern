import React, { Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./OrderSuccess.css";
import { Link } from "react-router-dom";
import thank_logo from "../../images/rocket.png";

const OrderSuccess = () => {
  return (
    <Fragment>
      <div className="download_area">
        <div className="container">
          <div className="download_content thanks_content">
            <img className="img-fluid" src={thank_logo} alt="thanks logo" />
            <h2>Thank you!</h2>
            <h2>Your Order has been Placed successfully!</h2>
            <p>We’ve sent the invoice in your inbox. Let’s get started the awesome things.</p>
            <Link to="/orders">View Orders</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderSuccess;

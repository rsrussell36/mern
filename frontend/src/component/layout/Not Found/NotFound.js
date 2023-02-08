import React, { Fragment } from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Fragment>
      <div className="error_area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="error_content">
                <h1>Oops!</h1>
                <h2>We can’t seem to find the page you’re looking for</h2>
                <Link to="/" className="agency_learn_btn h_text_btn">Back to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>

  );
};

export default NotFound;

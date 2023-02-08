import React, { Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activestep }) => {
  const steps = [
    {
      label: 'Shipping Details',
    },
    {
      label: 'Confirm Order',
    },
    {
      label: 'Payment',
    },
  ];



  return (
    <Fragment>
      <div className="corporate_work_area pt-0">
        <div className="container">
          <div className="row work_steps_info" activestep={activestep}>
            {steps.map((item, index) => (
              <div className={activestep >= index ? "active col-lg-4 col-md-6 work_steps_item" : 'col-lg-4 col-md-6 work_steps_item'}
                key={index}
              >
                <div className="number">{index}</div>
                <a href="#">
                  <h4 className="wow fadeInUp">{item.label}</h4>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CheckoutSteps;

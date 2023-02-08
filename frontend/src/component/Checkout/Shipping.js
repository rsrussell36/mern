import React, { Fragment, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Shipping.css";
import MetaData from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import { useAlert } from "react-alert";
import CheckoutSteps from "./CheckoutSteps"
import { Country, State, City } from "country-state-city";

const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 11 || phoneNo.length > 11) {
      alert.error("Phone Number should be 11 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ name, email, address, city, state, country, pinCode, phoneNo })
    );
    history.push("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title="Shipping Details" />
      <CheckoutSteps activestep={0} />
      <div className="shopping_cart_banner_area">
        <div className="container">
          <div className="section_title text-center">
            <h2>Shipping Details</h2>
          </div>
        </div>
      </div>
      <div className="shopping_cart_area">
        <div className="container">
          <form action="#" className="checkout shippingForm" encType="multipart/form-data"
            onSubmit={shippingSubmit}>
            <div className="row">
              <div className="col-lg-6">
                <div className="checkout_info">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="c_title">Name*</label>
                        <input type="text" className="form-control input_text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="c_title">Email Address*</label>
                        <input type="email" className="form-control input_text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="c_title">Phone Number*</label>
                        <input type="number" className="form-control input_text" value={phoneNo} id="phone" onChange={(e) => setPhoneNo(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="c_title">Address*</label>
                        <input type="text" className="form-control input_text" value={address} id="address" onChange={(e) => setAddress(e.target.value)} />
                      </div>
                    </div><div className="col-lg-6">
                      <div className="form-group">
                        <label className="c_title">Zip Code*</label>
                        <input type="number" className="form-control input_text" value={pinCode} id="address" onChange={(e) => setPinCode(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="c_title">Country*</label>

                        <select
                          className="selectpicker niceSelect input_text"
                          required
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        >
                          <option value="">Country</option>
                          {Country &&
                            Country.getAllCountries().map((item) => (
                              <option key={item.isoCode} value={item.isoCode}>
                                {item.flag} {item.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  {country && (
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label className="c_title">State*</label>

                          <select
                            className="selectpicker niceSelect input_text"
                            required
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                          >
                            <option value="">State</option>
                            {State &&
                              State.getStatesOfCountry(country).map((item) => (
                                <option key={item.isoCode} value={item.isoCode}>
                                  {item.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                  {state && (
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label className="c_title">City*</label>
                          <select
                            className="selectpicker niceSelect input_text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          >
                            <option value="">City</option>
                            {City &&
                              City.getCitiesOfState(country, state).map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">

                        <button className="shippingBtn button-pay button hover_style1" disabled={state ? false : true}>Continue</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="checkout_info">
                  <div className="cart_box">
                    <p><strong>Shipping Note</strong></p>
                    <p>Eternity bands are also known as the wedding bands. The circular loop of diamonds signifies eternal and unending love. This sentiment is what makes the eternity band a perfect gift for couples on special occasions, such as anniversaries, childbirth or anything that makes a difference to their life. </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}
export default Shipping;
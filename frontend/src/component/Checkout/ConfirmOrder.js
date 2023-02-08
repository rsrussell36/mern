import React, { Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ConfirmOrder.css";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps"
import { Link } from "react-router-dom";
import { Country, State } from "country-state-city";

const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  //const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.15;
  const totalPrice = subtotal + tax + shippingCharges;
  let state_name = State.getStateByCodeAndCountry(shippingInfo.state, shippingInfo.country)
  let country_name = Country.getCountryByCode(shippingInfo.country)
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${state_name.name}, ${country_name.name}`;
  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    history.push("/process/payment");
  };
  return (
    <Fragment>
      <MetaData title="Shipping Details" />
      <CheckoutSteps activestep={1} />
      <div className="shopping_cart_banner_area">
        <div className="container">
          <div className="section_title text-center">
            <h2>Confirm Order</h2>
          </div>
        </div>
      </div>
      <div className="shopping_cart_area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="checkout_info">
                <div className="cart_box">
                  <p><strong>Shipping Details</strong></p>
                  <p><strong>Name:</strong> {shippingInfo.name}</p>
                  <p><strong>Address:</strong> {address}</p>
                  <p><strong>City:</strong> {shippingInfo.city}</p>
                  <p><strong>State:</strong> {state_name.name}</p>
                  <p><strong>Country:</strong> {country_name.name}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="checkout_info">
                <div className="cart_box">
                  <p><strong>Order Summery</strong></p>
                  <table className="shop_table">
                    <thead>
                      <tr>
                        <th>
                          <div className="small_text">Product</div>
                        </th>
                        <th>
                          <div className="small_text">Title</div>
                        </th>
                        <th>
                          <div className="small_text">Total</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>

                      {cartItems &&
                        cartItems.map((item) => (
                          <tr key={item.product} className="order_item">
                            <td>
                              <img src={item.image} alt="Product" />
                            </td>
                            <td>
                              <Link to={`/product/${item.product}`}>
                                <h5>{item.name}<sup>{item.quantity} X ${item.price} ={" "}</sup></h5>
                              </Link>
                            </td>
                            <td className="price">{item.price * item.quantity}</td>
                          </tr>
                        ))}
                    </tbody>
                    <tfoot>
                      <tr className="subtotal">
                        <td>
                          <div className="small_text">Subtotal</div>
                        </td>
                        <td className="price">${subtotal}</td>
                      </tr>
                      <tr className="subtotal">
                        <td>
                          <h5>Shipping Charge:</h5>
                        </td>
                        <td className="price">
                          $0
                        </td>
                      </tr>
                      <tr className="subtotal">
                        <td>
                          <h5>Tax:</h5>
                        </td>
                        <td className="price">
                          0.15%
                        </td>
                      </tr>
                      <tr className="order_total">
                        <td>
                          Total
                        </td>
                        <td className="price">
                          ${totalPrice}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                  <button onClick={proceedToPayment} className="button hover_style1">Proced To Payment</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
export default ConfirmOrder;
import React, { Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Cart.css";
import MetaData from "../layout/MetaData";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";


const Cart = ({ history }) => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <MetaData title="Shopping Cart" />
          <div className="shopping_cart_banner_area">
            <div className="container">
              <div className="section_title text-center">
                <h2>Shopping Cart</h2>
              </div>
            </div>
          </div>
          <div className="shopping_cart_area sec_pad bg_color">

            <div className="container">
              <table className="table cart_table">
                <thead>
                  <tr>
                    <th className="product col-lg-6">Product</th>
                    <th className="col-lg-2">Price</th>
                    <th className="col-lg-2">Quantity</th>
                    <th className="col-lg-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems &&
                    cartItems.map((item, i) => (
                      <CartItemCard item={item} key={i} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} deleteCartItems={deleteCartItems} />
                    ))}
                </tbody>
              </table>
              <div className="hr"></div>
              <div className="row">
                <div className="col-lg-8 col-md-5">
                  <div className="coupon">
                    <input type="text" className="input_text" id="coupon_code" value="" placeholder="Discount coupon" readOnly />
                    <button type="submit" className="button" name="apply_coupon" value="Apply coupon">Apply</button>
                  </div>
                </div>
                <div className="col-lg-4 col-md-7">
                  <div className="cart_box_info">
                    <div className="shipping_btn_info">
                      <Link to={`/products`} className="shipping_btn hover_style1">Continue Shopping</Link>
                      <Link to={`/products`} className="shipping_btn hover_style1">Continue Home</Link>
                    </div>
                    <div className="product_checkout_fields">
                      <div className="cart-subtotal">Subtotal<div className="amount">{`$${cartItems.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )}`}</div>
                      </div>

                      <div className="cart-subtotal border-none">Total<div className="amount">{`$${cartItems.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )}`}</div>
                      </div>
                      <button type="submit" className="shipping_btn hover_style1" onClick={checkoutHandler}>Proceed to
                        checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
};
export default Cart;
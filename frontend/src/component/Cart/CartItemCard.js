import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import { AiOutlineClose } from 'react-icons/ai';
import { IoIosAdd } from 'react-icons/io';
import { HiMinus } from 'react-icons/hi';

const CartItemCard = ({ item, deleteCartItems, increaseQuantity, decreaseQuantity }) => {
  return (
    <tr>
      <td className="product col-lg-6" data-title="PRODUCT">

        <div className="media align-items-center">
          <img src={item.image} alt="ssa" />
          <div className="media-body">
            <h5 className="mb-0"><Link to={`/product/${item.product}`}>{item.name}</Link></h5>
          </div>
        </div>
      </td>
      <td className="col-lg-2" data-title="PRICE">
        <div className="total">{`$${item.price}`}</div>
      </td>
      <td className="col-lg-2" data-title="QUANTITY">
        <div className="product-qty">
          <button className="ar_top" type="button" onClick={() =>
            decreaseQuantity(item.product, item.quantity)
          }><HiMinus /></button>
          <input type="number" value={item.quantity} readOnly className="manual-adjust" />

          <button className="ar_down" type="button" onClick={() =>
            increaseQuantity(item.product, item.quantity,
              item.stock)
          }> <IoIosAdd /></button>
        </div>

      </td>
      <td className="col-lg-2" data-title="TOTAL">
        <div className="totla_price">
          <p className="total">{`$${item.price * item.quantity
            }`}</p>
          <p className="close" onClick={() => deleteCartItems(item.product)}><AiOutlineClose /></p>
        </div>
      </td>
    </tr>
  );
};

export default CartItemCard;

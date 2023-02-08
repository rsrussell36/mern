import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Rating } from "@material-ui/lab";
import { useAlert } from "react-alert";
import { AiOutlineEye, AiOutlineHeart } from 'react-icons/ai';
import { BsBag } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addItemsToCart } from '../../actions/cartAction';

const ProductCard = ({ product }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const addToCartHandler = () => {
    dispatch(addItemsToCart(product._id, quantity));
    alert.success("Item Added To Cart");
  }
  return (
    <div className="col-lg-4 col-sm-4">

      <div className="single_product_item">
        <div className="product_img">
          <img className="img-fluid" src={product.images[0].url} alt={product.name} />
          <div className="hover_content">
            <a href="#"><AiOutlineHeart /></a>
            <a href="#" onClick={addToCartHandler} title="Add to cart"><BsBag /></a>
            <Link to={`/product/${product._id}`}><AiOutlineEye /></Link>
          </div>
        </div>
        <div className="single_pr_details">
          <Link to={`/product/${product._id}`}>
            <h3 className="f_p f_500 f_size_16">{product.name}</h3>
          </Link>
          <div className="price">
            <del><span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">$</span>{`${product.price}`}</span></del>
            <ins><span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">$</span>{`${product.price}`}</span></ins>
          </div>
          <div className="ratting">
            <Rating {...options} />{" "}
            <span className="productCardSpan">
              {" "}
              ({product.numOfReviews} Reviews)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

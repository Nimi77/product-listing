import "./ProductList.css";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import PropTypes from "prop-types";
import { useState } from "react";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const ProductList = ({ products }) => {
  const { reduceQuantity, increaseQuantity, quantities, addToCart } =
    useContext(CartContext);
  const [expandedDesc, setExpandedDesc] = useState({});

  const handleToggleDescription = (productId) => {
    setExpandedDesc((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const truncateDescription = (description, isExpanded) => {
    const words = description.split(" ");
    if (isExpanded || words.length <= 14) {
      return description;
    } else {
      return `${words.slice(0, 14).join(" ")}...`;
    }
  };

  return (
    <div id="products" className="product-lists">
      <div className="product-container">
        {products.map((product) => (
          <div key={product.id} className="product">
            <div className="img-container">
              <img src={product.images[0]} alt="product-image" />
            </div>
            <div className="product-details">
              <div className="p-heading">
                <span>{capitalizeFirstLetter(product.category)}</span>
                <h4>{product.title}</h4>
                <p>
                  {truncateDescription(
                    product.description,
                    expandedDesc[product.id]
                  )}
                  {product.description.split(" ").length > 14 && (
                    <a
                      href="#"
                      className="read-more-link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleToggleDescription(product.id);
                      }}
                    >
                      {expandedDesc[product.id] ? " Show less" : " Read more"}
                    </a>
                  )}
                </p>
              </div>
              <div className="add-remove">
                <button onClick={() => reduceQuantity(product.id)}> - </button>
                <span>{quantities[product.id]}</span>
                <button onClick={() => increaseQuantity(product.id)}> + </button>
              </div>
              <button onClick={() => addToCart(product)} className="addCart">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList;

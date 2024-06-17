import PropTypes from "prop-types";
import './Product.css';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const truncateDescription = (description) => {
  const words = description.split(" ");
  if (words.length > 14) {
    return `${words
      .slice(0, 14)
      .join(" ")}... <a href="#" class="read-more-link">Read more</a>`;
  }
  return description;
};

const ProductList = ({ products,reduceQuantity, increaseQuantity, addToCart, quantities }) => {
  return (
    <div id="products" className="product-lists">
      <div className="product-container">
        {products.map((product) => (
          <div key={product.id} className="product">
            <div className="img-container">
              <img src={product.images} alt="product-image" />
            </div>
            <div className="product-details">
              <div className="p-heading">
                <span>{capitalizeFirstLetter(product.category)}</span>
                <h4>{product.title}</h4>
                <p
                  dangerouslySetInnerHTML={{
                    __html: truncateDescription(product.description),
                  }}
                ></p>
              </div>
              <div className="add-remove">
                <button onClick={() => reduceQuantity(product.id)}> - </button>
                <span>{quantities[product.id]}</span>
                <button onClick={() => increaseQuantity(product.id)}> + </button>
              </div>
              <button onClick={() => addToCart(product)} className="addCart">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
  reduceQuantity: PropTypes.func.isRequired,
  increaseQuantity: PropTypes.func.isRequired,
  quantities: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default ProductList;

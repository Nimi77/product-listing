import PropTypes from "prop-types";

const Cart = ({ cart, reduceQuantity, removeFromCart }) => {
  return (
    <div id="cart">
      {cart && cart.length > 0 ? (
        // Map through the cart items
        cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div>
                <h2>{item.title}</h2>
                <span>${item.price}</span>
                <p>{item.quantity}</p>
            </div>
            <button onClick={() => reduceQuantity(item.id)}>-</button>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))
      ) : (
        <div>No items in the cart</div>
      )}
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  reduceQuantity: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default Cart;

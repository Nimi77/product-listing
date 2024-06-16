import PropTypes from "prop-types";
import "./Cart.css";

const Cart = ({ cart, reduceQuantity, increaseQuantity, removeFromCart }) => {
  return (
    <div id="cart">
      <div className="cart-container">
        <table>
          <thead>
            <tr className="top">
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart && cart.length > 0 ? (
              cart.map((item) => (
                <tr key={item.id} className="cart-item">
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td className="add-reduce">
                    <button onClick={() => reduceQuantity(item.id)}> - </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}> + </button>
                  </td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-item">No items in the cart</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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
  increaseQuantity: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default Cart;

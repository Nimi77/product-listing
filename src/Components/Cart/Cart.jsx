import "./Cart.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

const Cart = () => {
  const { cart, reduceQuantity, increaseQuantity, removeFromCart } = useContext(CartContext);

  return (
    <div id="cart" className="cart">
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <div className="table-responsive">
          <table>
            <thead>
              <tr className="top">
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart && cart.length > 0 ? (
                cart.map((item) => (
                  <tr key={item.id} className="cart-item">
                    <td>{item.title}</td>
                    <td>${item.price}</td>
                    <td className="add-reduce">
                      <button onClick={() => reduceQuantity(item.id)}>-</button>
                      <span>
                        {item.quantity < 10
                          ? "0" + item.quantity
                          : item.quantity}
                      </span>
                      <button onClick={() => increaseQuantity(item.id)}>
                        +
                      </button>
                    </td>
                    <td>${item.price * item.quantity}</td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-item">
                    No items in the cart
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bottom">
          <Link to="/">
            <button>
              <div className="arrow-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather-arrow-left"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </div>
              <span>Return</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};



export default Cart;

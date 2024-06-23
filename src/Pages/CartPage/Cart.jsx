import CartItem from "../../Components/CartItem/CartItem";
import './Cart.css'

function CartPage() {
  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-body">
          <h2>Shopping Cart</h2>
          <CartItem />
        </div>
      </div>
    </div>
  );
}
export default CartPage;

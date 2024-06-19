import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CartIcon from "./Components/SvgIcon/CartIcon";
import Cart from "./Components/Cart/Cart";
import ProductSection from "./Components/Section/ProductSection";
import { CartProvider } from "./Context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="container">
          <div className="overlay"></div>
          <div className="main">
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <header className="navigation">
                      <Link to="/cart">
                        <CartIcon />
                      </Link>
                    </header>
                    <ProductSection />
                  </div>
                }
              />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}
export default App;

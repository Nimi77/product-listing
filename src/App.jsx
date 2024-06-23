import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./Context/CartContext";
import ProductPage from "./Pages/ProductPage/Product";
import CartPage from "./Pages/CartPage/Cart";
import Loader from "./Components/Loader/Loader";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  });

  return (
    <CartProvider>
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      )}
    </CartProvider>
  );
}
export default App;

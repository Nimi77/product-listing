import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import CartIcon from "./Components/SvgIcon/CartIcon";
import Cart from "./Components/Cart/Cart";
import ArrowLeft from "./Components/SvgIcon/ArrowLeft";
import ArrowRight from "./Components/SvgIcon/ArrowRight";
import ProductList from "./Components/Product/ProductList";
import Modal from "./Components/Modal/Modal";
import SuccessIcon from "./Components/SvgIcon/SuccessIcon";
import ErrorIcon from "./Components/SvgIcon/ErrorIcon";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalIcon, setModalIcon] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        const data = response.data;
        setProducts(data.products);

        // Initialize quantities state as an object with product IDs as keys and 0 as the initial quantity
        const initialQuantities = data.products.reduce((acc, product) => {
          acc[product.id] = 0;
          return acc;
        }, {});
        setQuantities(initialQuantities);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchProducts();
  }, []);

  // Retrieve cart from local storage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart])

   // Add to cart function
  const addToCart = (product) => {
    if (quantities[product.id] === 0) {
      setShowModal(true);
      setModalMessage(
        "Please add a quantity greater than 0 before adding to cart."
      );
      setModalIcon(<ErrorIcon />);
      return;
    }
    //updating the [cart] state
    setCart((prevCart) => {
      // Checks if the product is already in the cart
      const existingProduct = prevCart.find((item) => item.id === product.id); 

      // Increase item quantities
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantities[product.id] }
            : item
        );
      } else {
        // If the product is not in the cart, add it with quantity 1
        return [...prevCart, { ...product, quantity: quantities[product.id] }]; 
      }
    });
     // Reset quantity after adding to cart
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product.id]: 0,
    }));

    setShowModal(true);
    setModalMessage("Product has been added to cart successfully.");
    setModalIcon(<SuccessIcon />);
  };
 
  // Remove from cart function
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const reduceQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(prevQuantities[productId] - 1, 0),
    }));

    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      return updatedCart.filter((item)=> item.quantity > 0)
    });
  };

  const increaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));

    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  //pagination button
  const handleNext = () => {
    setCurrentProductIndex((prevIndex) =>
      Math.min(prevIndex + 1, products.length - 3)
    );
  };
  const handlePrev = () => {
    setCurrentProductIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const displayedProducts = products.slice(
    currentProductIndex,
    currentProductIndex + 3
  );

  return (
    <Router>
      <div className="container">
        <div className="overlay"></div>
        <header className="header">
          <Link to="/cart">
            <CartIcon />
          </Link>
        </header>
        <div className="main">
          <Routes>
            <Route
              path="/"
              element={
                <div className="">
                  <div className="main-heading">
                    <h3>Available Products</h3>
                    <div className="arrow-buttons">
                      <button
                        onClick={handlePrev}
                        disabled={currentProductIndex === 0}
                      >
                        <ArrowLeft />
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={currentProductIndex >= products.length - 3}
                      >
                        <ArrowRight />
                      </button>
                    </div>
                  </div>
                  {products.length > 0 && (
                    <ProductList
                      products={displayedProducts}
                      reduceQuantity={reduceQuantity}
                      increaseQuantity={increaseQuantity}
                      quantities={quantities}
                      addToCart={addToCart}
                    />
                  )}
                </div>
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  removeFromCart={removeFromCart}
                  reduceQuantity={reduceQuantity}
                  increaseQuantity={increaseQuantity}
                />
              }
            />
          </Routes>
          <Modal
            message={modalMessage}
            show={showModal}
            icon={modalIcon}
            onClose={() => setShowModal(false)}
          />
        </div>
      </div>
    </Router>
  );
}
export default App;

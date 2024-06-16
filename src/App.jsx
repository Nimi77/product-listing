/* eslint-disable no-unused-vars */
import { useState,useEffect } from "react";
import "./App.css";
import axios from 'axios'
import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        const data = response.data;
        setProducts(data.products)

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

  const addToCart = (product) => {
    alert("product a been added to cart");
    // Ensure product has all required properties
    if (!product.id || !product.title || !product.price) {
      console.error("Product is missing required properties", product);
      return;
    }
    //updating the [cart] state
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id); // Checks if the product is already in the cart

      // Increase item quantities
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantities[product.id] }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: quantities[product.id] }]; // If the product is not in the cart, add it with quantity 1
      }
    });
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product.id]: 0,
    })); // Reset quantity after adding to cart
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const reduceQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(prevQuantities[productId] - 1, 0),
    }));
  };

  const increaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

  //pagnation button
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
    <div className="container">
      <div className="layout">
        {products.length > 0 && (
          <ProductList
            products={displayedProducts}
            reduceQuantity={reduceQuantity}
            increaseQuantity={increaseQuantity}
            quantities={quantities}
            addToCart={addToCart}
          />
        )}
        <div className="controls">
          <button onClick={handlePrev} disabled={currentProductIndex === 0}>
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={currentProductIndex >= products.length - 3}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

{
  /* <h1>Product List</h1>
    
      <h2>Cart</h2>
      <Cart cart={cart} removeFromCart={removeFromCart} reduceQuantity={reduceQuantity}></Cart> */
}

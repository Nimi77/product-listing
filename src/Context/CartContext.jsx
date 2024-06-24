import { useState, useEffect, createContext } from "react";
import fetchProducts from "../API/fetchProduct";
import SuccessIcon from "../Components/SvgIcon/SuccessIcon";
import ErrorIcon from "../Components/SvgIcon/ErrorIcon";
import PropTypes from "prop-types";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalIcon, setModalIcon] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        //console.log(data.products)
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
    fetchData();
  }, []);

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
      return updatedCart.filter((item) => item.quantity > 0);
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
      Math.min(prevIndex + 3, products.length)
    );
  };
  const handlePrev = () => {
    setCurrentProductIndex((prevIndex) => Math.max(0, prevIndex - 3));
  };

  const displayedProducts = products.slice(
    currentProductIndex,
    currentProductIndex + 9
  );
  const handleShowMoreOrLess = (e) => {
    e.preventDefault();

    if (showAll) {
      setCurrentProductIndex(0);
      setShowAll(false);
    } else {
      const nextIndex = currentProductIndex + 9;
      if (nextIndex >= products.length) {
        setShowAll(true);
      } else {
        setCurrentProductIndex(nextIndex);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        products,
        cart,
        currentProductIndex,
        setCurrentProductIndex,
        displayedProducts,
        handleShowMoreOrLess,
        showAll,
        quantities,
        reduceQuantity,
        increaseQuantity,
        addToCart,
        removeFromCart,
        showModal,
        setShowModal,
        modalMessage,
        modalIcon,
        handleNext,
        handlePrev,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CartProvider, CartContext };

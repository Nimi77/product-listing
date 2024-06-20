import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import ArrowLeft from "../../Components/SvgIcon/ArrowLeft";
import ArrowRight from "../../Components/SvgIcon/ArrowRight";
import ProductList from "../../Components/ProductList/ProductList";
import Modal from "../../Components/Modal/Modal";
import { Link } from "react-router-dom";
import CartIcon from "../../Components/SvgIcon/CartIcon";
import "./Product.css"

function ProductPage() {
  const {
    products,
    currentProductIndex,
    handleNext,
    handlePrev,
    showModal,
    modalMessage,
    modalIcon,
    setShowModal,
  } = useContext(CartContext);

  const displayedProducts = products.slice(
    currentProductIndex,
    currentProductIndex + 10
  );

  return (
    <div className="product-page">
      <div className="container">
        <div className="overlay"></div>
        {/* navigation */}
        <header className="navigation">
          <span>/Products</span>
          <div className="right-nav">
            <button>Best Sellers</button>
            <Link to="/cart" >
              <button className="cart-btn">Cart <CartIcon /> </button>
            </Link>
          </div>
        </header>
        <div className="main">
          <div className="main-heading">
            <h3>Shop Our Best Sellers</h3>
            <p>Discover the ultimate beauty makeup product that will revolutionize your beauty routine! Our versatile makeup is crafted to enhance your natural features.</p>
          </div>
          <div className="arrow-buttons">
              <button onClick={handlePrev} disabled={currentProductIndex === 0}>
                <ArrowLeft />
              </button>
              <button
                onClick={handleNext}
                disabled={currentProductIndex >= products.length - 3}
              >
                <ArrowRight />
              </button>
            </div>
          {products.length > 0 && <ProductList products={displayedProducts} />}
        </div>
        <Modal
          message={modalMessage}
          show={showModal}
          icon={modalIcon}
          onClose={() => setShowModal(false)}
        />
      </div>
    </div>
  );
}

export default ProductPage;

import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import ArrowLeft from "../../Components/SvgIcon/ArrowLeft";
import ArrowRight from "../../Components/SvgIcon/ArrowRight";
import ProductList from "../../Components/ProductList/ProductList";
import Modal from "../../Components/Modal/Modal";
import { Link } from "react-router-dom";
import CartIcon from "../../Components/SvgIcon/CartIcon";
import "./Product.css";

function ProductPage() {
  const {
    products,
    currentProductIndex,
    displayedProducts,
    handleShowMoreOrLess,
    showAll,
    handleNext,
    handlePrev,
    showModal,
    modalMessage,
    modalIcon,
    setShowModal,
  } = useContext(CartContext);

  return (
    <div className="product-page">
      <div className="container">
        {/* navigation */}
        <header className="navigation">
          <span>/Products</span>
          <Link to="/cart">
            <button className="cart-btn">
              Cart <CartIcon />
            </button>
          </Link>
        </header>
        <div className="main">
          <div className="main-heading">
            <h3>Shop Our Best Sellers</h3>
            <p>
              Discover our best products ranging from makeup, skincare, fresh
              food, gourmet treats, fruits, and more. Shop top-quality products
              conveniently and affordably, all in one place.
            </p>
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
          <div className="show-btn">
            <button onClick={handleShowMoreOrLess}>
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
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

import { useContext } from "react";
import {CartContext} from "../../Context/CartContext";
import ArrowLeft from "../SvgIcon/ArrowLeft";
import ArrowRight from "../SvgIcon/ArrowRight";
import ProductList from "../Product/ProductList";
import Modal from "../Modal/Modal";

function ProductSection() {
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
    currentProductIndex + 3
  );

  return (
    <div className="product-section">
      <div className="heading">
        <h3>Available Products</h3>
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
      </div>
      {products.length > 0 && <ProductList products={displayedProducts} />}
      <Modal
        message={modalMessage}
        show={showModal}
        icon={modalIcon}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

export default ProductSection;

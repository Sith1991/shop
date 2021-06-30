import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import ProductCard from "./product-card";
import {
  clearSelectedProduct,
  fetchSelectedProduct,
} from "../../store/actions/propduct-card-actions";
import { resetNotifications } from "../../store/actions/notifications-actions";
import { userIsAuth } from "../../store/actions/isAuth-actions";

const ProductCardContainer = ({
  match,
  selectedProduct,
  loading,
  error,
  fetchSelectedProduct,
  clearSelectedProduct,
  logIn,
  resetNotifications,
  userIsAuth,
}) => {
  const itemId = match.params.id;

  useEffect(() => {
    userIsAuth();
    resetNotifications();
    fetchSelectedProduct(itemId);
    // срабатывает при уничтожении компоненты. Очищаю бывранный товар, т.к. если этого не делать, то при нажатии
    // на backspace с редактируемого товара и последующем переходе на добавление товара в инпуты прогружаются
    // данные ранее редактируемого товара
    return () => clearSelectedProduct();
  }, [itemId]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <ProductCard
      selectedProduct={selectedProduct}
      clearSelectedProduct={clearSelectedProduct}
      logIn={logIn}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.selectedProduct.loading,
    error: state.selectedProduct.error,
    selectedProduct: state.selectedProduct.selectedProduct,
    logIn: state.isAuth.logIn,
  };
};

const mapDispatchToProps = {
  fetchSelectedProduct,
  clearSelectedProduct,
  resetNotifications,
  userIsAuth,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCardContainer);

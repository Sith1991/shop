import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Spinner } from '../../components/spinner';
import { ErrorIndicator } from '../error-indicator';
import { ProductCard } from './product-card';
import { clearSelectedProduct, fetchSelectedProduct, resetNotifications } from '../../store/actions';

const ProductCardContainer = ({
  match,
  selectedProduct,
  loading,
  error,
  fetchSelectedProduct,
  clearSelectedProduct,
  logIn,
  resetNotifications,
}) => {
  const itemId = match.params.id;

  useEffect(() => {
    resetNotifications();
    fetchSelectedProduct(itemId);
    // срабатывает при уничтожении компоненты. Очищаю бывранный товар, т.к. если этого не делать, то при нажатии
    // на backspace с редактируемого товара и последующем переходе на добавление товара в инпуты прогружаются
    // данные ранее редактируемого товара
    return () => clearSelectedProduct();
  }, [itemId, resetNotifications, fetchSelectedProduct, clearSelectedProduct]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return <ProductCard selectedProduct={selectedProduct} clearSelectedProduct={clearSelectedProduct} logIn={logIn} />;
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCardContainer);

import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Spinner } from '../../components/spinner';
import { ErrorIndicator } from '../error-indicator';
import AddItemOld from './add-item-old';

import {
  fetchProperties,
  fetchProducts,
  productsError,
  productsSpinnerClose,
  productsSpinnerOpen,
  clearSelectedProduct,
  fetchSelectedProduct,
  createdProduct,
  editedProduct,
  resetNotifications,
} from '../../store/actions';
import { withAuthRedirect } from '../../hoc';

const AddItemContainer = ({
  fetchProperties,
  fetchProducts,
  productsError,
  properties,
  loadingProps,
  errorProps,
  products,
  loadingProducts,
  errorProducts,
  loadingEditingProduct,
  errorEditingProduct,
  editingProduct,
  fetchSelectedProduct,
  clearSelectedProduct,
  createdProduct,
  editedProduct,
  productsSpinnerOpen,
  productsSpinnerClose,
  match,
  resetNotifications,
}) => {
  const itemId = match.params.id;

  useEffect(() => {
    resetNotifications();
    fetchProducts();
    fetchProperties();
    if (itemId) {
      fetchSelectedProduct(itemId);
    }
    // срабатывает при уничтожении компоненты. Очищаю бывранный товар, т.к. если этого не делать, то при нажатии
    // на backspace с редактируемого товара и последующем переходе на добавление товара в инпуты прогружаются
    // данные ранее редактируемого товара
    return () => clearSelectedProduct();
  }, [itemId, resetNotifications, fetchProducts, fetchProperties, fetchSelectedProduct, clearSelectedProduct]);

  const loadIndicator = useMemo(() => {
    return loadingProps || loadingProducts || (loadingEditingProduct && itemId);
  }, [loadingProps, loadingProducts, loadingEditingProduct, itemId]);

  const errorIndicator = useMemo(() => {
    return errorProps || errorProducts || (errorEditingProduct && itemId);
  }, [errorProps, errorProducts, errorEditingProduct, itemId]);

  if (errorIndicator) {
    return <ErrorIndicator />;
  }

  return (
    <>
      {loadIndicator && <Spinner />}
      <AddItemOld
        properties={properties}
        products={products}
        productsError={productsError}
        itemId={itemId}
        editingProduct={editingProduct}
        clearSelectedProduct={clearSelectedProduct}
        createdProduct={createdProduct}
        editedProduct={editedProduct}
        productsSpinnerOpen={productsSpinnerOpen}
        productsSpinnerClose={productsSpinnerClose}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    properties: state.properties.properties,
    loadingProps: state.properties.loading,
    errorProps: state.properties.error,
    products: state.products.products,
    loadingProducts: state.products.loading,
    errorProducts: state.products.error,
    loadingEditingProduct: state.selectedProduct.loading,
    errorEditingProduct: state.selectedProduct.error,
    editingProduct: state.selectedProduct.selectedProduct,
  };
};

const mapDispatchToProps = {
  fetchProperties,
  fetchProducts,
  productsError,
  fetchSelectedProduct,
  clearSelectedProduct,
  createdProduct,
  editedProduct,
  productsSpinnerOpen,
  productsSpinnerClose,
  resetNotifications,
};

export default compose(withAuthRedirect, connect(mapStateToProps, mapDispatchToProps))(AddItemContainer);

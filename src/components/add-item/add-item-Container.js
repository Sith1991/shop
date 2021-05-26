import React, {useEffect} from 'react';
import compose from "../../utils";
import withShopService from "../../hoc";
import {connect} from "react-redux";
import {fetchProperties} from "../../store/actions/properties-actions";
import {fetchProducts, productsError} from "../../store/actions/propducts-actions";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import AddItem from "./add-item";
import {clearSelectedProduct, fetchSelectedProduct} from "../../store/actions/propduct-card-actions";

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
                              EditingProduct,
                              fetchSelectedProduct,
                              clearSelectedProduct,
                              match
                          }) => {

    const itemId = match.params.id;

    useEffect(() => {
        fetchProducts();
        fetchProperties();
        if (itemId) {
            fetchSelectedProduct(itemId);
        }
    }, [itemId])

    if (loadingProps || loadingProducts || (loadingEditingProduct && itemId)) {
        return <Spinner/>
    }

    if (errorProps || errorProducts || (errorEditingProduct && itemId)) {
        return <ErrorIndicator/>
    }

    return (
        <AddItem properties={properties} products={products} productsError={productsError}/>
    )
}

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
        EditingProduct: state.selectedProduct.selectedProduct,
    }
};

const mapDispatchToProps = {
    fetchProperties,
    fetchProducts,
    productsError,
    fetchSelectedProduct,
    clearSelectedProduct
};

export default compose(
    withShopService(),
    connect(mapStateToProps, mapDispatchToProps)
)(AddItemContainer);
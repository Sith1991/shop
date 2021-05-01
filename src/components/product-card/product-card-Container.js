import React, {useEffect} from 'react';
import {connect} from "react-redux";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import ProductCard from "./product-card";
import {clearSelectedProduct, fetchSelectedProduct} from "../../store/actions/propduct-card-actions";
import compose from "../../utils";
import withShopService from "../../hoc";

const ProductCardContainer = ({match, selectedProduct, loading, error, fetchSelectedProduct, clearSelectedProduct}) => {
    const itemId = match.params.id;

    useEffect(() => {
        fetchSelectedProduct(itemId);
    }, [itemId])

    if (loading) {
        return <Spinner/>
    }

    if (error) {
        return <ErrorIndicator/>
    }

    return (
        <ProductCard selectedProduct={selectedProduct} clearSelectedProduct={clearSelectedProduct}/>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.selectedProduct.loading,
        error: state.selectedProduct.error,
        selectedProduct: state.selectedProduct.selectedProduct,
    }
};

const mapDispatchToProps = {
    fetchSelectedProduct,
    clearSelectedProduct
};

export default compose(
    withShopService(),
    connect(mapStateToProps, mapDispatchToProps)
)(ProductCardContainer);
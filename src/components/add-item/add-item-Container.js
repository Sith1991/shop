import React, {useEffect} from 'react';
import compose from "../../utils";
import withShopService from "../../hoc";
import {connect} from "react-redux";
import {fetchProperties} from "../../store/actions/properties-actions";
import {fetchProducts, productsError} from "../../store/actions/propducts-actions";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import AddItem from "./add-item";

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
                              match
                          }) => {

    const itemId = match.params.id;

    useEffect(() => {
        fetchProducts();
        fetchProperties();
    }, [])

    if (loadingProps || loadingProducts) {
        return <Spinner/>
    }

    if (errorProps || errorProducts) {
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
    }
};

const mapDispatchToProps = {
    fetchProperties,
    fetchProducts,
    productsError
};

export default compose(
    withShopService(),
    connect(mapStateToProps, mapDispatchToProps)
)(AddItemContainer);
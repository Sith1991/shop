import React, {useEffect} from 'react';
import {fetchProperties} from "../../store/actions/properties-actions";
import compose from "../../utils";
import withShopService from "../../hoc";
import {connect} from "react-redux";
import AddProperty from "../add-property";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

const AddPropertyContainer = ({fetchProperties, properties, loading, error}) => {

    useEffect(() => {
        fetchProperties();
    }, [])

    if (loading) {
        return <Spinner/>
    }

    if (error) {
        return <ErrorIndicator/>
    }

    return (
        <AddProperty properties={properties}/>
    )
}

const mapStateToProps = (state) => {
    return {
        properties: state.properties.properties,
        loading: state.properties.loading,
        error: state.properties.error,
    }
};

const mapDispatchToProps = {
    fetchProperties,
};

export default compose(
    withShopService(),
    connect(mapStateToProps, mapDispatchToProps)
)(AddPropertyContainer);
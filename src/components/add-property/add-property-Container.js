import React, {useEffect} from 'react';
import {
    fetchProperties,
    propertiesError,
    propertiesSpinnerClose,
    propertiesSpinnerOpen
} from "../../store/actions/properties-actions";
import compose from "../../utils";
import withShopService from "../../hoc";
import {connect} from "react-redux";
import AddProperty from "../add-property";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import {createdProperty} from "../../store/actions/notifications-actions";

const AddPropertyContainer = ({
                                  fetchProperties,
                                  propertiesError,
                                  properties,
                                  loading,
                                  error,
                                  createdProperty,
                                  propertiesSpinnerOpen,
                                  propertiesSpinnerClose
                              }) => {

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
        <AddProperty properties={properties}
                     propertiesError={propertiesError}
                     createdProperty={createdProperty}
                     propertiesSpinnerOpen={propertiesSpinnerOpen}
                     propertiesSpinnerClose={propertiesSpinnerClose}
        />
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
    propertiesError,
    createdProperty,
    propertiesSpinnerOpen,
    propertiesSpinnerClose
};

export default compose(
    withShopService(),
    connect(mapStateToProps, mapDispatchToProps)
)(AddPropertyContainer);
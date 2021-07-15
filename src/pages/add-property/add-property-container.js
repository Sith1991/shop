import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { AddProperty } from './index';
import { Spinner } from '../../components/spinner';
import { ErrorIndicator } from '../error-indicator';
import {
  fetchProperties,
  propertiesError,
  propertiesSpinnerClose,
  propertiesSpinnerOpen,
  createdProperty,
  resetNotifications,
} from '../../store/actions';
import { withAuthRedirect } from '../../hoc';

const AddPropertyContainer = ({
  fetchProperties,
  propertiesError,
  properties,
  loading,
  error,
  createdProperty,
  propertiesSpinnerOpen,
  propertiesSpinnerClose,
  logIn,
  resetNotifications,
}) => {
  useEffect(() => {
    resetNotifications();
    fetchProperties();
  }, [resetNotifications, fetchProperties]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <AddProperty
      properties={properties}
      propertiesError={propertiesError}
      createdProperty={createdProperty}
      propertiesSpinnerOpen={propertiesSpinnerOpen}
      propertiesSpinnerClose={propertiesSpinnerClose}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    properties: state.properties.properties,
    loading: state.properties.loading,
    error: state.properties.error,
    logIn: state.isAuth.logIn,
  };
};

const mapDispatchToProps = {
  fetchProperties,
  propertiesError,
  createdProperty,
  propertiesSpinnerOpen,
  propertiesSpinnerClose,
  resetNotifications,
};

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, mapDispatchToProps)
)(AddPropertyContainer);

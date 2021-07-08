import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { PropertyListTable } from '../property-list-table';
import { Spinner } from '../spinner';
import { ErrorIndicator } from '../../pages/error-indicator';
import {
  fetchProperties,
  propertiesError,
  deletedProperty,
  resetNotifications,
} from '../../store/actions';
import { deleteItem } from '../../services';
import { withAuthRedirect } from '../../hoc';

import './property-list.scss';

const PropertyList = ({
  fetchProperties,
  propertiesError,
  deletedProperty,
  properties,
  loading,
  error,
  resetNotifications,
}) => {
  useEffect(() => {
    resetNotifications();
    fetchProperties();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <div className={'property-list-wrap'}>
      <div className={'property-list'}>
        <div className={'button-wrap'}>
          <Link to={'/add-property'} className={'add-property-link'}>
            <Button className={'add-prop-button'} variant={'warning'}>
              Добавить проперти
            </Button>
          </Link>
        </div>
        <PropertyListTable
          properties={properties}
          onDeleted={deleteItem}
          propertiesError={propertiesError}
          deletedProperty={deletedProperty}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    properties: state.properties.properties,
    loading: state.properties.loading,
    error: state.properties.error,
  };
};

const mapDispatchToProps = {
  fetchProperties,
  propertiesError,
  deletedProperty,
  resetNotifications,
};

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, mapDispatchToProps)
)(PropertyList);

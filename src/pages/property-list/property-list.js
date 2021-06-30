import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import {PropertyListTable} from '../../components/property-list-table';
import Spinner from '../../components/spinner';
import ErrorIndicator from '../error-indicator';
import {
  fetchProperties,
  propertiesError,
  deletedProperty,
  resetNotifications,
} from '../../store/actions';
import { deleteItem, userLogOut } from '../../services';

import './property-list.scss';

const PropertyList = ({
  fetchProperties,
  propertiesError,
  deletedProperty,
  properties,
  loading,
  error,
  email,
  logIn,
  resetNotifications,
}) => {
  useEffect(() => {
    resetNotifications();
    fetchProperties();
  }, []);

  if (!logIn) {
    return <Redirect to={'/login'} />;
  }

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <div className={'property-list-wrap'}>
      <div className={'header'}>
        <div className={'button-group'}>
          <div className={'wrap'}>
            <div className={'background'} />
            <Link to={'/'} className={'header-links'}>
              Листинг товаров
            </Link>
          </div>
          <div className={'wrap colored'}>
            <div className={'background'} />
            <Link to={'/property-list'} className={'header-links'}>
              Листинг проперти
            </Link>
          </div>
        </div>
        <div className={'button-group'}>
          <div className={'user-name'}>Пользователь (E-mail): {email}</div>
          <div className={'button-log-out-wrap'}>
            <Button
              className={'button-log-out'}
              variant={'warning'}
              onClick={userLogOut}
            >
              Выйти
            </Button>
          </div>
        </div>
      </div>
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
    email: state.isAuth.email,
    logIn: state.isAuth.logIn,
  };
};

const mapDispatchToProps = {
  fetchProperties,
  propertiesError,
  deletedProperty,
  resetNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyList);
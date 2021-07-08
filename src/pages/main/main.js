import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { ProductList } from '../../components/product-list';
import { PropertyList } from '../../components/property-list';
import { userLogOut } from '../../services';

import './main.scss';

const Main = ({ email, history }) => {
  const { pathname } = history.location;

  return (
    <div className={'main-wrap'}>
      <div className={'header'}>
        <div className={'button-group'}>
          <div className={`wrap ${pathname === '/' ? 'colored' : null}`}>
            <div className={'background'} />
            <Link to={'/'} className={'header-links'}>
              Листинг товаров
            </Link>
          </div>
          <div
            className={`wrap ${
              pathname === '/property-list' ? 'colored' : null
            }`}
          >
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
      <div className={'content'}>
        <Switch>
          <Route path="/" component={ProductList} exact />
          <Route path="/property-list" component={PropertyList} exact />
        </Switch>
      </div>
    </div>
  );
};

export { Main };

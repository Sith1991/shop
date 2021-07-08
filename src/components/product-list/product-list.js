import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { ProductListTable } from '../product-list-table';
import { SearchPanel } from '../search-panel';
import {
  fetchProducts,
  productsError,
  deletedProduct,
  resetNotifications,
} from '../../store/actions';
import { ErrorIndicator } from '../../pages/error-indicator';
import { deleteItem } from '../../services';
import { withAuthRedirect } from '../../hoc';

import './product-list.scss';

class ProductList extends Component {
  state = {
    term: '',
    columnName: 'itemName',
  };

  componentDidMount() {
    this.props.resetNotifications();
    this.props.fetchProducts();
  }

  columnChange = (columnName) => {
    this.setState({
      columnName,
    });
  };

  termSetup = (term) => {
    this.setState({
      term,
    });
  };

  searchItems = (arr, term) => {
    if (term.length === 0) {
      return arr;
    }

    return arr.filter(
      (el) =>
        el[this.state.columnName]
          .toString()
          .toLowerCase()
          .indexOf(term.toLowerCase()) > -1
    );
  };

  render() {
    const {
      products,
      loading,
      error,
      productsError,
      deletedProduct,
    } = this.props;

    const { term } = this.state;

    const visibleItems = this.searchItems(products, term);

    return (
      <div className={'product-list-wrap'}>
        <div className={'product-list'}>
          <div className={'button-wrap'}>
            <Link to={'/add-item'} className={'add-item-link'}>
              <Button className={'add-button'} variant={'warning'}>
                Добавить товар
              </Button>
            </Link>
          </div>
          {error ? (
            <ErrorIndicator />
          ) : (
            <div>
              <SearchPanel
                termSetup={this.termSetup}
                columnChange={this.columnChange}
              />
              <ProductListTable
                products={visibleItems}
                onDeleted={deleteItem}
                loading={loading}
                productsError={productsError}
                deletedProduct={deletedProduct}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    loading: state.products.loading,
    error: state.products.error,
  };
};

const mapDispatchToProps = {
  fetchProducts,
  productsError,
  deletedProduct,
  resetNotifications,
};

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, mapDispatchToProps)
)(ProductList);

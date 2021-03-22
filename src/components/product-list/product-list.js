import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from "react-bootstrap";
import ProductListTable from "../product-list-table";
import SearchPanel from "../search-panel";
import {connect} from "react-redux";
import {fetchProducts} from "../../store/actions/propduct-actions";
import compose from "../../utils";
import withShopService from "../../hoc";
import ErrorIndicator from "../error-indicator";
import firebase from 'firebase/app';
import 'firebase/database'

import './product-list.scss';

class ProductList extends Component {

    componentDidMount() {
        const db = firebase.database();
        console.log(db);
        this.props.fetchProducts();
    }

    deleteItem = (id) => {
        this.setState(({products}) => {
            const idx = products.findIndex((el) => el.id === id);
            const newData = [
                ...products.slice(0, idx),
                ...products.slice(idx + 1)
            ]
            return {
                products: newData
            }
        })
    }

    columnChange = (columnName) => {
        this.setState({
            columnName
        })

    }

    searchItems = (arr, term) => {
        if (term.length === 0) {
            return arr;
        }

        const findedItems = arr.filter((el) =>
            el[this.props.columnName].toString().toLowerCase().indexOf(term.toLowerCase()) > -1)
        return findedItems;
    }

    termSetup = (term) => {
        this.setState({
            term
        })
    }

    render() {
        const {products, term, loading, error} = this.props;

        const visibleItems = this.searchItems(products, term);

        return (
            <div className={'product-list-wrap'}>
                <div className={'header'}>
                    <div className={'wrap colored'}>
                        <div className={'background'}></div>
                        <Link to={'/'} className={'header-links'}>
                            Листинг товаров
                        </Link>
                    </div>
                    <div className={'wrap'}>
                        <div className={'background'}></div>
                        <Link to={'/property-list'} className={'header-links'}>
                            Листинг проперти
                        </Link>
                    </div>
                </div>
                <div className={'product-list'}>
                    <div className={'button-wrap'}>
                        <Link to={'/add-item'} className={'add-item-link'}>
                            <Button className={'add-button'} variant={"warning"}>
                                Добавить товар
                            </Button>
                        </Link>
                    </div>
                    {error ? <ErrorIndicator/> :
                        <div>
                            <SearchPanel termSetup={this.termSetup} columnChange={this.columnChange}/>
                            <ProductListTable products={visibleItems}
                                              onDeleted={this.deleteItem}
                                              loading={loading}/>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        term: state.products.term,
        columnName: state.products.columnName,
        loading: state.products.loading,
        error: state.products.error,
    }
};

const mapDispatchToProps = (dispatch, {shopService}) => {
    return {
        fetchProducts: fetchProducts(shopService, dispatch)
    }
};

export default compose(
    withShopService(),
    connect(mapStateToProps, mapDispatchToProps)
)(ProductList);
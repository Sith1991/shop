import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from "react-bootstrap";
import ProductListTable from "../product-list-table";
import SearchPanel from "../search-panel";
import {connect} from "react-redux";
import {fetchProducts, productsError} from "../../store/actions/propducts-actions";
import compose from "../../utils";
import withShopService from "../../hoc";
import ErrorIndicator from "../error-indicator";
import firebase from "firebase";
import Notifications from "../notifications";

import './product-list.scss';

class ProductList extends Component {

    state = {
        term: '',
        columnName: 'itemName',
        showNotification: false,
    }

    componentDidMount() {
        this.props.fetchProducts();
    }

    deleteItem = async (key) => {
        this.setState({
            showNotification: false
        });
        const db = firebase.database();
        const ref = db.ref('products');
        const dbDataRef = ref.child(key);
        await dbDataRef.set(null, (error) => {        // отправляем null для того чтобы удалить свойство полностью по ключу key
            if (error) {
                productsError(error);
            } else {
                this.setState({
                    showNotification: true
                })
            }
        });
    }

    columnChange = (columnName) => {
        this.setState({
            columnName
        })
    }

    termSetup = (term) => {
        this.setState({
            term
        })
    }

    searchItems = (arr, term) => {
        if (term.length === 0) {
            return arr;
        }

        return arr.filter((el) =>
            el[this.state.columnName].toString().toLowerCase().indexOf(term.toLowerCase()) > -1)
    }

    render() {
        const {products, loading, error} = this.props;

        const {term, showNotification} = this.state;

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
                            {showNotification && <Notifications path={'/'} deleted={'товар'}/>}
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
        loading: state.products.loading,
        error: state.products.error,
    }
};

const mapDispatchToProps = {
    fetchProducts,
    productsError
};

export default compose(
    withShopService(),
    connect(mapStateToProps, mapDispatchToProps)
)(ProductList);
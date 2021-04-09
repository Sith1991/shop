import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from "react-bootstrap";
import ProductListTable from "../product-list-table";
import SearchPanel from "../search-panel";
import {connect} from "react-redux";
import {fetchProducts} from "../../store/actions/propducts-actions";
import compose from "../../utils";
import withShopService from "../../hoc";
import ErrorIndicator from "../error-indicator";

import './product-list.scss';

class ProductList extends Component {

    state = {
        term: '',
        columnName: 'itemName',
    }

    componentDidMount() {
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

        const {term} = this.state;

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
        loading: state.products.loading,
        error: state.products.error,
    }
};

const mapDispatchToProps = {
        fetchProducts
};


export default compose(
    withShopService(),
    connect(mapStateToProps, mapDispatchToProps)
)(ProductList);
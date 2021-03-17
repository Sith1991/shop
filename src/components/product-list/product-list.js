import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from "react-bootstrap";
import ProductListTable from "../product-list-table";
import SearchPanel from "../search-panel";
import {connect} from "react-redux";
import {productsError, productsLoaded, productsRequested} from "../../store/actions/propduct-actions";
import compose from "../../utils";
import withShopService from "../../hoc";

import './product-list.scss';
import ErrorIndicator from "../error-indicator";

class ProductList extends Component {

    /*state = {
        products:   [
            {
                id: 0,
                itemName: 'Mercedes S550 4matic',
                price: 118000,
                dateOfChange: '31.10.18'
            },
            {
                id: 1,
                itemName: 'CASHES VALLEY LANE',
                price: 500000,
                dateOfChange: '01.11.18'
            },
            {
                id: 2,
                itemName: 'DURUN DURUN HOUSE',
                price: 1216000,
                dateOfChange: '01.11.18'
            },
            {
                id: 3,
                itemName: 'Mercedes S550 4matic',
                price: 118000,
                dateOfChange: '31.10.18'
            },
            {
                id: 4,
                itemName: 'CASHES VALLEY LANE',
                price: 500000,
                dateOfChange: '01.11.18'
            },
            {
                id: 5,
                itemName: 'DURUN DURUN HOUSE',
                price: 1216000,
                dateOfChange: '01.11.18'
            },
            {
                id: 6,
                itemName: 'Mercedes S550 4matic',
                price: 118000,
                dateOfChange: '31.10.18'
            },
            {
                id: 7,
                itemName: 'CASHES VALLEY LANE',
                price: 500000,
                dateOfChange: '01.11.18'
            },
            {
                id: 8,
                itemName: 'DURUN DURUN HOUSE',
                price: 1216000,
                dateOfChange: '01.11.18'
            },
            {
                id: 9,
                itemName: 'Mercedes S550 4matic',
                price: 118000,
                dateOfChange: '31.10.18'
            },
            {
                id: 10,
                itemName: 'CASHES VALLEY LANE',
                price: 500000,
                dateOfChange: '01.11.18'
            },
            {
                id: 11,
                itemName: 'DURUN DURUN HOUSE',
                price: 1216000,
                dateOfChange: '01.11.18'
            },
            {
                id: 12,
                itemName: 'Mercedes S550 4matic',
                price: 118000,
                dateOfChange: '31.10.18'
            },
            {
                id: 13,
                itemName: 'CASHES VALLEY LANE',
                price: 500000,
                dateOfChange: '01.11.18'
            },
            {
                id: 14,
                itemName: 'DURUN DURUN HOUSE',
                price: 1216000,
                dateOfChange: '01.11.18'
            },
            {
                id: 15,
                itemName: 'Mercedes S550 4matic',
                price: 118000,
                dateOfChange: '31.10.18'
            },
            {
                id: 16,
                itemName: 'CASHES VALLEY LANE',
                price: 500000,
                dateOfChange: '01.11.18'
            },
            {
                id: 17,
                itemName: 'DURUN DURUN HOUSE',
                price: 1216000,
                dateOfChange: '01.11.18'
            },
            {
                id: 18,
                itemName: 'Mercedes S550 4matic',
                price: 118000,
                dateOfChange: '31.10.18'
            },
            {
                id: 19,
                itemName: 'CASHES VALLEY LANE',
                price: 500000,
                dateOfChange: '01.11.18'
            },
        ],
        term: '',
        columnName: 'itemName'
    }*/

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
        /*const {products, term} = this.state;*/

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

const mapDispatchToProps = (dispatch, ownProps) => {
    const {shopService} = ownProps;
    return {
        fetchProducts: () => {
            dispatch(productsRequested());   // для отображения спинера при переходе на данную страницу с других страниц
            shopService.getItems()
                .then((data) => dispatch(productsLoaded(data)))
                .catch((error) => dispatch(productsError(error)))
        }
    }
};

export default compose(
    withShopService(),
    connect(mapStateToProps, mapDispatchToProps)
)(ProductList);
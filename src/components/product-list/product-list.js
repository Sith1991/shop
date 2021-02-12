import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from "react-bootstrap";
import ProductListTable from "../product-list-table";
import SearchPanel from "../search-panel";

import './product-list.scss';



class ProductList extends Component {

    state = {
        products:   [
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

        const findedItems = arr.filter( (el) =>
            el[this.state.columnName].toString().toLowerCase().indexOf(term.toLowerCase()) > -1 )
        return findedItems;
    }

    termSetup = (term) => {
        this.setState({
            term
        })
    }

    render() {
        const {products, term} = this.state;

        const visibleItems = this.searchItems(products, term);

        return (
            <div className={'product-list'}>
                <div className={'button-wrap'}>
                    <Link to={'/add-item'}>
                        <Button className={'add-button'} variant={"warning"}>
                            Добавить товар
                        </Button>
                    </Link>
                </div>
                <SearchPanel termSetup={this.termSetup} columnChange={this.columnChange}/>
                <ProductListTable products={visibleItems} onDeleted={this.deleteItem}/>
            </div>
        )}
}

export default ProductList;
import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from "react-bootstrap";

import './product-list.css';
import EnhancedTable from "../material-ui-component";

const ProductList = () => {

    const products = [
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
            itemName: 'CASHES VALLEY LANE',
            price: 500000,
            dateOfChange: '31.10.18'
        }
    ];

    return (
        <div className={'product-list'}>
            <div className={'button-wrap'}>
                <Link to={'/add-item'}>
                    <Button variant={"warning"}>
                        Добавить товар
                    </Button>
                </Link>

            </div>
            <div className={'product-list-table'}>
                <table className={'table'}>
                    <tbody>
                    <tr>
                        <td className={'bold-text catalog'}><i className="fa fa-angle-down"
                                                               aria-hidden="true"/>Перечень товаров
                        </td>
                        <td className={'gray-text price'}>Стоимость</td>
                        <td className={'gray-text date-of-change'}>Дата изменения</td>
                        <td className={'gray-text administration'}>Управление</td>
                    </tr>

                    {products.map((product) => {
                        const {id, itemName, price, dateOfChange} = product;
                        const formatedPrice = price.toLocaleString('ru-RU');
                        return (
                            <tr key={id}>
                                <td className={'product-name'}><Link to={`/item-card/${id}`}>{itemName}</Link></td>
                                <td>{formatedPrice} $</td>
                                <td>{dateOfChange}</td>
                                <td>
                                    <div className="links">
                                        <Link to={'#'}>Ред.</Link>
                                        <Link to={'#'}>Удалить</Link>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>

            <EnhancedTable/>
        </div>
    )
};

export default ProductList;
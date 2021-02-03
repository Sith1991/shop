import React from 'react';
import {Link} from 'react-router-dom';

import './product-list.css';

const ProductList = ({products}) => {

    const numberFormat = (price) => {
        if (!isFinite(price)) {
            return price;
        }

        let parts = price.toString().split('.');

        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

        return parts.join('.');
    }

    return (
        <div className={'product-list'}>
            <div className={'button-wrap'}>
                <Link to={'/add-item'}>
                    <button type={"button"} className={"btn btn-warning"}>
                        Добавить товар
                    </button>
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
                        const formatedPrice = numberFormat(price);
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
        </div>
    )
};

export default ProductList;
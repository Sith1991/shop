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
                <button type={"button"} className={"btn btn-warning"}>
                    Добавить товар
                </button>
            </div>

            <div className={'product-list-table'}>
                <table className={'table'}>
                    <tbody>
                    <tr>
                        <th className={'bold-text'}><i className="fa fa-angle-down" aria-hidden="true"/> Перечень товаров</th>
                        <th className={'gray-text price'}>Стоимость</th>
                        <th className={'gray-text date'}>Дата изменения</th>
                        <th className={'gray-text administration'}>Управление</th>
                    </tr>

                    {products.map((product) => {
                        const {id, itemName, price, dateOfChange} = product;
                        const formatedPrice = numberFormat(price);
                        return (
                            <tr key={id}>
                                <td className={'product-name'}><Link to={'/item-card/:id'}>{itemName}</Link></td>
                                <td>{formatedPrice} $</td>
                                <td>{dateOfChange}</td>
                                <td><Link to={'#'}>Ред.</Link>
                                    <Link to={'#'}>Удалить</Link></td>
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
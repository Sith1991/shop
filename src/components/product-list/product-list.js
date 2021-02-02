import React from 'react';
import {Link} from 'react-router-dom';

import './product-list.css';

const ProductList = ({products}) => {

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
                        <th className={'gray-text'}>Стоимость</th>
                        <th className={'gray-text'}>Дата изменения</th>
                        <th className={'gray-text'}>Управление</th>
                    </tr>

                    {products.map((product) => {
                        const {id, itemName, price, dateOfChange} = product;
                        return (
                            <tr key={id}>
                                <td><Link to={'#'}>{itemName}</Link></td>
                                <td>{price} $</td>
                                <td>{dateOfChange}</td>
                                <td><Link to={'#'}>Руд.</Link> <Link to={'#'}>Удалить</Link></td>
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
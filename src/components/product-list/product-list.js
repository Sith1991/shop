import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from "react-bootstrap";

import './product-list.scss';
import ProductListTable from "../product-list-table";

const ProductList = () => {

    return (
        <div className={'product-list'}>
            <div className={'button-wrap'}>
                <Link to={'/add-item'}>
                    <Button className={'add-button'} variant={"warning"}>
                        Добавить товар
                    </Button>
                </Link>
            </div>
            <ProductListTable />
            {/*<div className={'product-list-table'}>*/}
            {/*    <table className={'table'}>*/}
            {/*        <tbody>*/}
            {/*        <tr>*/}
            {/*            <td className={'bold-text catalog'}><i className="fa fa-angle-down"*/}
            {/*                                                   aria-hidden="true"/>Перечень товаров*/}
            {/*            </td>*/}
            {/*            <td className={'gray-text price'}>Стоимость</td>*/}
            {/*            <td className={'gray-text date-of-change'}>Дата изменения</td>*/}
            {/*            <td className={'gray-text administration'}>Управление</td>*/}
            {/*        </tr>*/}

            {/*        {products.map((product) => {*/}
            {/*            const {id, itemName, price, dateOfChange} = product;*/}
            {/*            const formatedPrice = price.toLocaleString('ru-RU');*/}
            {/*            return (*/}
            {/*                <tr key={id}>*/}
            {/*                    <td className={'product-name'}><Link to={`/item-card/${id}`}>{itemName}</Link></td>*/}
            {/*                    <td>{formatedPrice} $</td>*/}
            {/*                    <td>{dateOfChange}</td>*/}
            {/*                    <td>*/}
            {/*                        <div className="links">*/}
            {/*                            <Link to={'#'}>Ред.</Link>*/}
            {/*                            <Link to={'#'}>Удалить</Link>*/}
            {/*                        </div>*/}
            {/*                    </td>*/}
            {/*                </tr>*/}
            {/*            )*/}
            {/*        })}*/}
            {/*        </tbody>*/}
            {/*    </table>*/}
            {/*</div>*/}
        </div>
    )
};

export default ProductList;
import React from 'react';
import {Link} from "react-router-dom";

import './product-list-item.css';



const ProductListItem = ({products}) => {
    const renderRow = (products) => {

    }

    return (
        <div className={'product-list-item'}>
            <Link to={'/'}>Листинг товаров</Link>
            <div className={'box-row'}>
                <button type={"button"} className={"btn btn-warning"}>
                    Добавить товар
                </button>
            </div>

        </div>
    )

};

export default ProductListItem;
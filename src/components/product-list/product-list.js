import React from 'react';

import './product-list.css';



const ProductList = ({products}) => {
    const renderRow = (products) => {

    }

    return (
        <div className={'product-list'}>

                <button type={"button"} className={"btn btn-warning"}>
                    Добавить товар
                </button>
        </div>
    )

};

export default ProductList;
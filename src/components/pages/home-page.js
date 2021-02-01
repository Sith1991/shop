import React from 'react';
import ProductListItem from '../product-list-item'

const HomePage = () => {

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
            dateOfChange: '01.11.18'
        }
    ];

    return (
        <ProductListItem products={products}/>
    )
}

export default HomePage;
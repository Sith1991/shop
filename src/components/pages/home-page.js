import React, {Fragment} from 'react';
import ProductList from "../product-list";
import HeaderLists from "../header";


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
            dateOfChange: '31.10.18'
        }
    ];

    return (
        <Fragment>
            <HeaderLists />
            <ProductList products={products}/>
        </Fragment>
    )
}

export default HomePage;
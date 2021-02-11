import React from 'react';
import ProductList from "../product-list";
import HeaderLists from "../header";


const HomePage = () => {

    return (
        <div className={'home-page'}>
            <HeaderLists />
            <ProductList />
        </div>
    )
}

export default HomePage;
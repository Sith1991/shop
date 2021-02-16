import React from 'react';
import ProductList from "../product-list";
import HeaderTabs from "../header-tabs";


const HomePage = () => {

    return (
        <div className={'home-page'}>
            <HeaderTabs />
            <ProductList />
        </div>
    )
}

export default HomePage;
import React, {Fragment} from 'react';
import ProductList from "../product-list";
import HeaderLists from "../header";


const HomePage = () => {

    return (
        <Fragment>
            <HeaderLists />
            <ProductList />
        </Fragment>
    )
}

export default HomePage;
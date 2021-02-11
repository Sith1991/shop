import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from "react-bootstrap";
import ProductListTable from "../product-list-table";
import SearchPanel from "../../search-panel";

import './product-list.scss';


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
            <SearchPanel />
            <ProductListTable />

        </div>
    )
};

export default ProductList;
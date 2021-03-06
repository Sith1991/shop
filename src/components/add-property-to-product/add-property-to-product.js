import React, {Component} from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from "@material-ui/core/IconButton";

import './add-property-to-product.scss';

class AddPropertyToProduct extends Component {



    render () {
        return (
            <div className={'add-property-to-product'}>
                <div className={'add-property-head'}>
                    <h5>Добавление товару свойств</h5>
                    <IconButton color="primary" aria-label="add to shopping cart">
                        <AddCircleOutlineIcon />
                    </IconButton>
                </div>
            </div>
        )
    }
}

export default AddPropertyToProduct;
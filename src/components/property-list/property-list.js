import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import PropertyListTable from "../property-list-table";


import './property-list.scss';

export default class PropertyList extends Component {

    render () {
        return (
            <div className={'property-list'}>
                <div className={'button-wrap'}>
                    <Link to={'/add-property'} className={'add-property-link'}>
                        <Button className={'add-prop-button'} variant={"warning"}>
                            Добавить проперти
                        </Button>
                    </Link>
                </div>
                <PropertyListTable />
            </div>
        )
    }
}
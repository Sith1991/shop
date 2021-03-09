import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import PropertyListTable from "../property-list-table";

import './property-list.scss';

export default class PropertyList extends Component {

    state = {
        properties: [
            {
                id: 0,
                propName: 'Цвет авто',
                propType: 'Dropdown',
            },
            {
                id: 1,
                propName: 'Год выпуска',
                propType: 'Number',
            },
            {
                id: 2,
                propName: 'Тип топлива',
                propType: 'String',
            },
            {
                id: 3,
                propName: 'Цвет авто',
                propType: 'Dropdown',
            },
            {
                id: 4,
                propName: 'Год выпуска',
                propType: 'Number',
            },
            {
                id: 5,
                propName: 'Тип топлива',
                propType: 'String',
            },
            {
                id: 6,
                propName: 'Цвет авто',
                propType: 'Dropdown',
            },
            {
                id: 7,
                propName: 'Год выпуска',
                propType: 'Number',
            },
            {
                id: 8,
                propName: 'Тип топлива',
                propType: 'String',
            },
        ]
    }

    deleteItem = (id) => {
        this.setState(({properties}) => {
            const idx = properties.findIndex((el) => el.id === id);
            const newData = [
                ...properties.slice(0, idx),
                ...properties.slice(idx + 1)
            ]
            return {
                properties: newData
            }
        })
    }

    render () {
        const {properties}=this.state;

        return (
            <div className={'property-list-wrap'}>
                <div className={'header'}>
                    <div className={'wrap'}>
                        <div className={'background'}></div>
                        <Link to={'/'} className={'header-links'}>
                            Листинг товаров
                        </Link>
                    </div>
                    <div className={'wrap colored'}>
                        <div className={'background'}></div>
                        <Link to={'/property-list'} className={'header-links'}>
                            Листинг проперти
                        </Link>
                    </div>
                </div>
                <div className={'property-list'}>
                    <div className={'button-wrap'}>
                        <Link to={'/add-property'} className={'add-property-link'}>
                            <Button className={'add-prop-button'} variant={"warning"}>
                                Добавить проперти
                            </Button>
                        </Link>
                    </div>
                    <PropertyListTable properties={properties} onDeleted={this.deleteItem} />
                </div>
            </div>
        )
    }
}
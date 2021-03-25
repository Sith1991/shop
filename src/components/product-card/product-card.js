import React from 'react';
import {Link} from "react-router-dom";
import {Button, Form} from "react-bootstrap";

import './product-card.scss';

const ProductCard = () => {

    const data = {
        id: 1,
        itemName: 'Mercedes S550 4matic',
        file: 'https://i.ibb.co/bs9QvD9/image.png',
        description: 'Не следует, однако забывать, что начало повседневной работы по формированию позиции требуют определения и уточнения существенных финансовых и административных условий. Разнообразный и богатый опыт консультация с широким активом способствует подготовки и реализации существенных финансовых и административных условий. ',
        price: 118000,
        properties: {
            property_1: {
                property_1_Name: 'Цвет авто',
                property_1_Value_1: 'Синий',
                property_1_Value_2: 'Черный',
            },
            property_2: {
                property_2_Name: 'Год выпуска',
                property_2_Value_1: 2017,
            },
            property_3: {
                property_3_Name: 'Тип топлива',
                property_3_Value_1: 'Бензин',
            }
        },
    }

    const {
        itemName, file, description, price,
        properties: {
            property_1: {
                property_1_Name,
                property_1_Value_1,
                property_1_Value_2
            },
            property_2: {
                property_2_Name,
                property_2_Value_1,
            },
            property_3: {
                property_3_Name,
                property_3_Value_1,
            },
        }
    } = data;

    return (
        <div className={'product-card'}>
            <div className={'product-card-bordered-wrap'}>
                <div className={"product-card-wrap"}>
                    <div className={'link'}>
                        <Link to={'/'}>
                            Вернуться
                        </Link>
                    </div>
                    <div className={'product-card-wrapper'}>
                        <div className={'header-items-row'}>
                            <div className={'item-image'}>
                                <img src={file} alt="product"/>
                            </div>
                            <div className={'item-information'}>
                                <h3>{itemName}</h3>
                                <p>{description}</p>
                            </div>
                        </div>
                        <div className={"bottom-items-row"}>
                            <div className={"item-properties"}>
                                <h4>{property_1_Name}</h4>
                                <Form.Control as="select" custom>
                                    <option>{property_1_Value_1}</option>
                                    <option>{property_1_Value_2}</option>
                                </Form.Control>
                                <h4>{property_2_Name}</h4>
                                <p>{property_2_Value_1}</p>
                                <h4>{property_3_Name}</h4>
                                <p>{property_3_Value_1}</p>
                                <h4>Стоимость</h4>
                                <span>{price.toLocaleString('ru-RU')}$</span>
                            </div>
                            <div className={"button-wrap"}>
                                <Button variant={"warning"}>
                                    Беру!!!
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;
import React from 'react';
import {Link} from "react-router-dom";
import {Button, Form} from "react-bootstrap";

import './product-card.scss';

const ProductCard = () => {

    const data = {
        id: 1,
        itemName: 'Mercedes S550 4matic',
        imgUrl: 'https://i.ibb.co/bs9QvD9/image.png',
        description: 'Не следует, однако забывать, что начало повседневной работы по формированию позиции требуют определения и уточнения существенных финансовых и административных условий. Разнообразный и богатый опыт консультация с широким активом способствует подготовки и реализации существенных финансовых и административных условий. ',
        price: 118000,
        propertyName_1: 'Цвет авто',
        propertyName_2: 'Год выпуска',
        propertyName_3: 'Тип топлива',
        propertyDescription_1: {
            propertyValue_1: 'Синий',
            propertyValue_2: 'Черный',
        },
        propertyDescription_2: 2017,
        propertyDescription_3: 'Бензин',
    }

    const {
        itemName, imgUrl, description, price,
        propertyName_1, propertyName_2, propertyName_3,
        propertyDescription_1: {propertyValue_1, propertyValue_2}, propertyDescription_2, propertyDescription_3
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
                                <img src={imgUrl} alt="product"/>
                            </div>
                            <div className={'item-information'}>
                                <h3>{itemName}</h3>
                                <p>{description}</p>
                            </div>
                        </div>
                        <div className={"bottom-items-row"}>
                            <div className={"item-properties"}>
                                <h4>{propertyName_1}</h4>
                                <Form.Control as="select" custom>
                                    <option>{propertyValue_1}</option>
                                    <option>{propertyValue_2}</option>
                                </Form.Control>
                                <h4>{propertyName_2}</h4>
                                <p>{propertyDescription_2}</p>
                                <h4>{propertyName_3}</h4>
                                <p>{propertyDescription_3}</p>
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
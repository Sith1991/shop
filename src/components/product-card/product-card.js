import React, {Component} from 'react';
import {Link} from "react-router-dom";

import './product-card.css';

class ProductCard extends Component {

    data = {
        id: 1,
        itemName: 'Mercedes S550 4matic',
        imgUrl: 'https://i.ibb.co/bs9QvD9/image.png',
        description: 'Не следует, однако забывать, что начало повседневной работы по формированию позиции требуют определения и уточнения существенных финансовых и административных условий. Разнообразный и богатый опыт консультация с широким активом способствует подготовки и реализации существенных финансовых и административных условий. ',
        price: 118000,
        propertyName_1: 'Цвет авто',
        propertyName_2: 'Год выпуска',
        propertyName_3: 'Тип топлива',
        propertyDescription_1: {
            subproperty_1: 'Черный',
            subproperty_2: 'Синий',
        },
        propertyDescription_2: 2017,
        propertyDescription_3: 'Бензин',
    }

    numberFormat = (price) => {
        if (!isFinite(price)) {
            return price;
        }

        let parts = price.toString().split('.');

        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

        return parts.join('.');
    }

render () {

        const { id, itemName, imgUrl, description, price,
            propertyName_1, propertyName_2, propertyName_3,
            propertyDescription_1: {subproperty_1, subproperty_2}, propertyDescription_2, propertyDescription_3 } = this.data;

    return (
        <div className={'product-card'}>
            <div className={"product-card-wrap"}>
                <div className={'link'}>
                    <Link to={'/'}>
                        Вернуться
                    </Link>
                </div>
                <div className={'wrapper'}>
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
                            <select className={"custom-select"}>
                                <option defaultValue>{subproperty_1}</option>
                                <option value="1">{subproperty_2}</option>
                            </select>
                            <h4>{propertyName_2}</h4>
                            <p>{propertyDescription_2}</p>
                            <h4>{propertyName_3}</h4>
                            <p>{propertyDescription_3}</p>
                            <h4>Стоимость</h4>
                            <span>{this.numberFormat(price)}$</span>
                        </div>
                        <div className={"button-wrap"}>
                            <button type={"button"} className={"btn btn-warning"}>
                                Беру!!!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export default ProductCard;
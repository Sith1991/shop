import React from 'react';
import AddPropertyToProduct from "../add-property-to-product";
import {Link} from "react-router-dom";

import "./add-item.scss";
import {Form} from "react-bootstrap";


const AddItem = () => {

    const handleFileSelect = (event) => {
        document.getElementById('file-name').textContent=event.target.files[0].name;

        const output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
            URL.revokeObjectURL(output.src) // free memory
        }
    }


    return (
        <div className={'add-item'}>
            <div className={'add-item-bordered-wrap'}>
                <div className={'add-item-wrap'}>
                    <div className={'buttons-wrap'}>
                        <Link to={'/'} className={'button-back'}>
                            Вернуться
                        </Link>
                        <Link to={'/'} className={'button-save'}>
                            Сохранить
                        </Link>
                    </div>
                    <div className={'add-item-head'}>
                        <h5>Добавление свойства</h5>
                    </div>
                    <div className={'add-item-body'}>
                        <Form.Group>
                            <Form.Label>Название товара</Form.Label>
                            <Form.Control type="text" placeholder='Название товара' className={'item-input'}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Стоимость товара</Form.Label>
                            <Form.Control type="number" placeholder='Стоимость товара' className={'item-input'}/>
                        </Form.Group>

                            <label>Изображение</label>
                            <input type="file"
                                   accept=".jpg,.jpeg,.png"
                                   placeholder={'image'}
                                   className={'upload-image'}
                                   onChange={handleFileSelect}/>
                        <i className="fa fa-upload" aria-hidden="true"></i>
                        <span id={'file-name'}></span>
                            <img id="output"/>

                        <Form.Group>
                            <Form.Label>Описание</Form.Label>
                            <Form.Control as="textarea"
                                          type="text"
                                          placeholder='Описание товара'
                                          className={'item-input-textarea'}
                                          maxlength={1000}
                                          rows={6}
                            />
                        </Form.Group>
                    </div>

                    <AddPropertyToProduct />
                </div>
            </div>
        </div>
    )
}

export default AddItem;
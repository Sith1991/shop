import React from 'react';
import {Col, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

import './add-property.scss';


const AddProperty = () => {
    return (
        <div className={'add-property'}>
            <div className={'add-property-bordered-wrap'}>
                <div className={'add-property-wrap'}>
                    <div className={'buttons-wrap'}>
                        <Link to={'/property-list'} className={'button-back'}>
                            Вернуться
                        </Link>
                        <Link to={'/property-list'} className={'button-save'}>
                            Сохранить
                        </Link>
                    </div>
                    <div className={'add-prop-head'}>
                        <h5>Добавление свойства</h5>
                    </div>
                    <div className={'add-prop-body'}>
                        <Form>
                            <Form.Group>
                                    <Form.Label>Название свойства</Form.Label>
                                    <Form.Control type="text" placeholder='Название свойства' className={'prop-name-input'}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Укажите тип свойства</Form.Label>
                                <Form.Check
                                    type="radio"
                                    label="Dropdown"
                                    name="formHorizontalRadios"
                                    onChange={() => console.log('Checked 1')}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Number"
                                    name="formHorizontalRadios"
                                    onChange={() => console.log('Checked 2')}
                                />
                                <Form.Check
                                    type="radio"
                                    label="String"
                                    name="formHorizontalRadios"
                                    onChange={() => console.log('Checked 3')}
                                />
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProperty;
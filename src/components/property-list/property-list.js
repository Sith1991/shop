import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import PropertyListTable from "../property-list-table";
import {connect} from "react-redux";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import {fetchProperties, propertiesError} from "../../store/actions/properties-actions";
import firebase from 'firebase/app';
import 'firebase/database';
import {deletedProperty} from "../../store/actions/notifications-actions";
import {userLogOut} from "../../store/actions/isAuth-actions";

import './property-list.scss';

const PropertyList = ({fetchProperties, deletedProperty, userLogOut, properties, loading, error, email}) => {

    useEffect(() => {
        fetchProperties();
    }, [])

    const deleteItem = async (key) => {
        const db = firebase.database();
        const ref = db.ref('properties');
        const dbDataRef = ref.child(key);
        await dbDataRef.set(null, function (error) {        // отправляем null для того чтобы удалть полностью свойство по ключу key
            if (error) {
                propertiesError(error);
            } else {
                deletedProperty();
            }
        });
    }

    if (loading) {
        return <Spinner/>
    }

    if (error) {
        return <ErrorIndicator/>
    }

    return (
        <div className={'property-list-wrap'}>
            <div className={'header'}>
                <div className={'button-group'}>
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
                <div className={'button-group'}>
                    <div className={'user-name'}>
                        Пользователь (E-mail): {email}
                    </div>
                    <div className={'button-log-out-wrap'}>
                        <Button className={'button-log-out'} variant={"warning"} onClick={userLogOut}>
                            Выйти
                        </Button>
                    </div>
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
                <PropertyListTable properties={properties} onDeleted={deleteItem} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        properties: state.properties.properties,
        loading: state.properties.loading,
        error: state.properties.error,
        email: state.isAuth.email,
    }
};

const mapDispatchToProps = {
    fetchProperties,
    propertiesError,
    deletedProperty,
    userLogOut
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyList);
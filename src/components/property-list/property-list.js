import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import PropertyListTable from "../property-list-table";
import {connect} from "react-redux";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import {fetchProperties, propertiesError} from "../../store/actions/properties-actions";
import firebase from 'firebase/app';
import 'firebase/database';

import './property-list.scss';
import Notifications from "../notifications";

const PropertyList = ({fetchProperties, properties, loading, error}) => {

    useEffect(() => {
        fetchProperties();
    }, [])

    const [showNotification, setShowNotification] = useState(false);

    const deleteItem = async (key) => {
        setShowNotification(false);
        const db = firebase.database();
        const ref = db.ref('properties');
        const dbDataRef = ref.child(key);
        await dbDataRef.set(null, function (error) {        // отправляем null для того чтобы удалть полностью свойство по ключу key
            if (error) {
                propertiesError(error);
            } else {
                setShowNotification(true);
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
                {showNotification && <Notifications path={'/property-list'} deleted={'свойство'}/>}
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
    }
};

const mapDispatchToProps = {
    fetchProperties,
    propertiesError
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyList);
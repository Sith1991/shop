import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {withRouter} from 'react-router-dom';


const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notifications = ({history, showNotification, path, deletedItem, isEditing, closeNotifications}) => {

    const backToListItems = (path) => {
        return history.push(`${path}`)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        closeNotifications();

        backToListItems(path);
    };

    return (
        <div>
            {!isEditing && !deletedItem && path === '/property-list' ?
                <Snackbar open={showNotification} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Свойство успешно добавлено! Вы будете автоматически перенаправлены в список добавленных свойств.
                    </Alert>
                </Snackbar> : null}
            {!isEditing && !deletedItem && path === '/' ?
                <Snackbar open={showNotification} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Товар успешно добавлен! Вы будете автоматически перенаправлены в список товаров.
                    </Alert>
                </Snackbar> : null}
            {deletedItem ? <Snackbar open={showNotification} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {deletedItem === 'товар' ? 'Товар успешно удален' : null}
                    {deletedItem === 'свойство' ? 'Свойство успешно удалено' : null}
                </Alert>
            </Snackbar> : null}
            {isEditing && !deletedItem && path === '/' ?
                <Snackbar open={showNotification} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Товар успешно отредактирован! Вы будете автоматически перенаправлены в список товаров.
                    </Alert>
                </Snackbar> : null}
        </div>
    );
}

export default withRouter(Notifications);
import React, {useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {withRouter} from 'react-router-dom';


const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notifications = ({history, path, deleted, isEdited}) => {

    const [open, setOpen] = useState(true);

    const backToListItems = (path) => {
        return history.push(`${path}`)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);

        backToListItems(path);
    };

    return (
        <div>
            {!isEdited && !deleted && path === '/property-list' ?
                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Свойство успешно добавлено! Вы будете автоматически перенаправлены в список добавленных свойств.
                    </Alert>
                </Snackbar> : null}
            {!isEdited && !deleted && path === '/' ? <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Товар успешно добавлен! Вы будете автоматически перенаправлены в список товаров.
                </Alert>
            </Snackbar> : null}
            {deleted ? <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {deleted === 'товар' ? 'Товар успешно удален' : null}
                    {deleted === 'свойство' ? 'Свойство успешно удалено' : null}
                </Alert>
            </Snackbar> : null}
            {isEdited && !deleted && path === '/' ? <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Товар успешно отредактирован! Вы будете автоматически перенаправлены в список товаров.
                </Alert>
            </Snackbar> : null}
        </div>
    );
}

export default withRouter(Notifications);
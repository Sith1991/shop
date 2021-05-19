import React, {useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {withRouter} from 'react-router-dom';


const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notifications = ({history, path, error}) => {

    const [open, setOpen] = useState(true);

    const backToAddProperties = (path) => {
        return history.push(`${path}`)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);

        backToAddProperties(path);
    };

    return (
        <div>
            {path === '/property-list' ? <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Свойство успешно добавлено! Вы будете автоматически перенаправлены в список добавленных свойств.
                </Alert>
            </Snackbar> : null}
            {error && path === '/property-list' ? <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Действие не было выполнено по причине следующей ошибки: ${error}. Вы будете автоматически перенаправлены в список добавленных свойств.
                </Alert>
            </Snackbar> : null}
            {path === '/' ? <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Свойство успешно добавлено! Вы будете автоматически перенаправлены в список товаров.
                </Alert>
            </Snackbar> : null}
            {error && path === '/' ? <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Действие не было выполнено по причине следующей ошибки: ${error}. Вы будете автоматически перенаправлены в список товаров.
                </Alert>
            </Snackbar> : null}
        </div>
    );
}

export default withRouter(Notifications);
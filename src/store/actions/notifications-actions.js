import {
    NOTIFICATION_CREATED_PRODUCT, NOTIFICATION_CREATED_PROPERTY,
    NOTIFICATION_DELETED_PRODUCT, NOTIFICATION_DELETED_PROPERTY,
    NOTIFICATION_EDITED_PRODUCT, NOTIFICATION_GO_TO_CLOSE, NOTIFICATION_STATUS_RESET
} from "../../action-types";

const createdProduct = () => {
    return {
        type: NOTIFICATION_CREATED_PRODUCT,
        payload: '/',
    }
}

const editedProduct = () => {
    return {
        type: NOTIFICATION_EDITED_PRODUCT,
        payload: '/',
    }
}

const deletedProduct = () => {
    return {
        type: NOTIFICATION_DELETED_PRODUCT,
        payload: '/',
    }
}

const createdProperty = () => {
    return {
        type: NOTIFICATION_CREATED_PROPERTY,
        payload: '/property-list',
    }
}

const deletedProperty = () => {
    return {
        type: NOTIFICATION_DELETED_PROPERTY,
        payload: '/property-list',
    }
}

const closeNotifications = () => {
    return {
        type: NOTIFICATION_GO_TO_CLOSE,
    }
}

// Необходимо для того, что бы при переходе на другую страницу, не перебрасывало обратно после срабатывания нотификации,
// как это сделано в логике компоненты notifications.js
const resetNotifications = () => {
    return {
        type: NOTIFICATION_STATUS_RESET,
    }
}

export {
    createdProduct,
    editedProduct,
    deletedProduct,
    createdProperty,
    deletedProperty,
    closeNotifications,
    resetNotifications
}
import {
    NOTIFICATION_CREATED_PRODUCT, NOTIFICATION_CREATED_PROPERTY,
    NOTIFICATION_DELETED_PRODUCT, NOTIFICATION_DELETED_PROPERTY,
    NOTIFICATION_EDITED_PRODUCT, NOTIFICATION_GO_TO_CLOSE
} from "../../action-types";

const createdProduct = () => {
    console.log('createdProduct')
    return {
        type: NOTIFICATION_CREATED_PRODUCT,
        payload: '/',
    }
}

const editedProduct = () => {
    console.log('editedProduct')
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

export {
    createdProduct,
    editedProduct,
    deletedProduct,
    createdProperty,
    deletedProperty,
    closeNotifications
}
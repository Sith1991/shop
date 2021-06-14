import {
    NOTIFICATION_CREATED_PRODUCT, NOTIFICATION_CREATED_PROPERTY,
    NOTIFICATION_DELETED_PRODUCT, NOTIFICATION_DELETED_PROPERTY,
    NOTIFICATION_EDITED_PRODUCT, NOTIFICATION_GO_TO_CLOSE
} from "../../action-types";

const notificationsReducer = (state, action) => {

    if (state === undefined) {
        return {
            showNotification: false,
            path: null,
            isEditing: false,
            deletedItem: null,
        }
    }

    switch (action.type) {
        case NOTIFICATION_CREATED_PRODUCT:
            console.log('NOTIFICATION_CREATED_PRODUCT')
            return {
                showNotification: true,
                path: action.payload,
                isEditing: false,
                deletedItem: null,
            }
        case NOTIFICATION_EDITED_PRODUCT:
            console.log('NOTIFICATION_EDITED_PRODUCT')
            return {
                showNotification: true,
                path: action.payload,
                isEditing: true,
                deletedItem: null,
            }
        case NOTIFICATION_DELETED_PRODUCT:
            return {
                showNotification: true,
                path: action.payload,
                isEditing: false,
                deletedItem: 'товар',
            }
        case NOTIFICATION_CREATED_PROPERTY:
            return {
                showNotification: true,
                path: action.payload,
                isEditing: false,
                deletedItem: null,
            }
        case NOTIFICATION_DELETED_PROPERTY:
            return {
                showNotification: true,
                path: action.payload,
                isEditing: false,
                deletedItem: 'свойство',
            }
        case NOTIFICATION_GO_TO_CLOSE:
            return {
                ...state,
                showNotification: false,
            }
        default:
            return state
    }

}

export default notificationsReducer;
import React from 'react';
import {connect} from "react-redux";
import Notifications from "./notifications";
import {closeNotifications} from "../../store/actions/notifications-actions";

const NotificationsContainer = ({
                                    showNotification,
                                    path,
                                    isEditing,
                                    deletedItem,
                                    closeNotifications
                                }) => {

    return (
        <Notifications showNotification={showNotification}
                       path={path}
                       isEditing={isEditing}
                       deletedItem={deletedItem}
                       closeNotifications={closeNotifications}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        showNotification: state.notifications.showNotification,
        path: state.notifications.path,
        isEditing: state.notifications.isEditing,
        deletedItem: state.notifications.deletedItem,
    }
}

const mapDispatchToProps = {
    closeNotifications
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
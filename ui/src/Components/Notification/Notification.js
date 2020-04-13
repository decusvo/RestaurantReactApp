import React, {useEffect, useState} from "react";
import {Dialog, Divider, FlatButton, MuiThemeProvider} from "material-ui";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import withStyles from "@material-ui/core/styles/withStyles";
import MuiDialogContent from "@material-ui/core/DialogContent";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import History from "../../utils/history";
import {useSelector} from "react-redux";

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
    },
});

const MapNotifications = (props) => {
    const {notifications} = props;
    if (notifications !== []) {
        return notifications.reverse().map(function (notification, index) {
            return (<div key={index}>
                    <Typography >{notification[3]}</Typography>
                    <Divider />
                </div>
                )
        })
    } else {
        return null;
    }
};

const DialogTitle = withStyles(styles)(props => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                <CloseIcon />
            </IconButton>
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);


const Notification = (props) => {
    const {numberOfNotifications, open, setOpen} = props;
    const [notifications, setNotifications] = useState([]);
    const currentUser = useSelector(state => state.currentUser);

    useEffect(() => {
        if (currentUser.loggedIn && currentUser.staff){
            fetch("//127.0.0.1:5000/get_waiter_notifications", {method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"waiter_email": currentUser.user.name})
            }).then((response) => {
                return response.json();
            }).then((data) => {
                setNotifications(data.data.notifications);
                numberOfNotifications(notifications.length)
            });
        }
    }, [notifications, open]);

    function handleClose() {
        setOpen(false)
    }

    function handleClearNotifications() {
        if (currentUser.loggedIn && currentUser.staff) {
            fetch("//127.0.0.1:5000/clear_waiter_notifications", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"waiter_email": currentUser.user.name})
            }).then((response) => {
                return response.json();
            })
        }
    }

    const actions = [
        <FlatButton
            label="Clear"
            keyboardFocused={true}
            onClick={handleClearNotifications}
        />,
    ];

    return (<MuiThemeProvider muiTheme={getMuiTheme()}>
            <Dialog title="Notifications"
                    actions={actions}
                    modal={false}
                    open={open}
                    onRequestClose={handleClose}
                    autoScrollBodyContent={true}>
                <DialogTitle id={"customized-dialog-title"} onClose={handleClose}> </DialogTitle>
                <DialogContent dividers>
                    <MapNotifications notifications={notifications}/>
                </DialogContent>
            </Dialog>
        </MuiThemeProvider>)
};

export default Notification;

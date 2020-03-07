import React from "react";
import {Dialog, MuiThemeProvider} from "material-ui";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import withStyles from "@material-ui/core/styles/withStyles";
import MuiDialogContent from "@material-ui/core/DialogContent";

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

const MapNotifications = () => {
    const notifications = [{"waiter":"deniz", "message":"ready"}, {"waiter":"deniz", "message":"get-order"}, {"waiter":"deniz", "message":"customer-calls"}];

    return notifications.map(function (notification, index) {
        return(<Typography key={index}>{notification.message}</Typography>)
    })
};

const DialogTitle = withStyles(styles)(props => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant={"h6"}>{children}</Typography>
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
    const {open, setOpen} = props;

    function handleClose() {
        setOpen(false)
    }

    return (<MuiThemeProvider>
      <Dialog onClose={handleClose} aria-labelledby={"customized-dialog-title"} open={open}>
          <DialogTitle id={"customized-dialog-title"} onClose={handleClose}>Notifications</DialogTitle>
          <DialogContent dividers>
              <MapNotifications/>
          </DialogContent>
      </Dialog>
    </MuiThemeProvider>)
};

export default Notification;

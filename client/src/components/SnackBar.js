import { useEffect, useState } from 'react';
import { Snackbar } from '@material-ui/core/';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function CustomizedSnackbar(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const { isOpen, message = '', severity, type } = props.snackbarInfo;
    const messages = {
        msgTooLong: 'Message length must be less than or equal to 200 characters long',
        msgIsEmpty: 'Message  must  not be empty',
    };
    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const handleMsg = (type, message) => {
        if (type) {
            return messages[type];
        } else {
            return message;
        }
    };
    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {handleMsg(type, message)}
                </Alert>
            </Snackbar>
        </div>
    );
}

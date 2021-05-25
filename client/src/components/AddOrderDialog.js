import { useState, useCallback } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextareaAutosize,
} from '@material-ui/core/';
import OrderService from '../services/OrderService';
import LoadingButton from './buttons/LoadingButton';
import CustomizedSnackbar from './SnackBar';
const AddOrderDialog = (props) => {
    const { open, setOpen, patientId, setIsLatest } = props;
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    // snackbar
    const [snackbarInfo, setSnackbarInfo] = useState({
        isOpen: false,
        message: '',
        severity: 'error',
        type: null,
    });
    const handleClose = () => {
        setOpen(false);
    };
    const handleOnChange = (e) => {
        const { value } = e.target;

        if (value.length > 200) {
            setSnackbarInfo((prevState) => ({
                ...prevState,
                type: 'msgTooLong',
                isOpen: true,
            }));
        } else {
            setMessage(value);
        }
    };
    const addOrder = useCallback(() => {
        setLoading(true);
        const addData = async () => {
            const { data } = await OrderService.create(patientId, { message });
            if (!data) {
                return null;
            }
            if (data.result === 'error') {
                setSnackbarInfo((prevState) => ({
                    ...prevState,
                    message: data['msg'][0]['detail'],
                    isOpen: true,
                }));
            }
            return data;
        };
        addData();
        setLoading(false);
    }, [patientId, message]);
    const handleAdd = () => {
        addOrder();
        setIsLatest(false);
        setOpen(false);
    };
    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Order</DialogTitle>
                <DialogContent>
                    <DialogContentText>Add an new order</DialogContentText>
                    <TextareaAutosize
                        rowsMin={10}
                        autoFocus
                        margin="dense"
                        id="message"
                        placeholder="Input your order message"
                        aria-label="Order message"
                        defaultValue={message}
                        onChange={handleOnChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <LoadingButton
                        loading={loading}
                        disabled={!loading && message.length === 0}
                        onClick={handleAdd}
                        color="primary"
                    >
                        Add
                    </LoadingButton>
                </DialogActions>
            </Dialog>
            <CustomizedSnackbar snackbarInfo={snackbarInfo} />
        </div>
    );
};

export default AddOrderDialog;

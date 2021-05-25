import { forwardRef, useEffect, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Slide, Tooltip } from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import OrderService from '../services/OrderService';
import AddOrderDialog from './AddOrderDialog.js';
import CustomizedSnackbar from './SnackBar';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const OrdersDialog = (props) => {
    const classes = useStyles();

    const { open, setOpen, patientId } = props;
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowCount, setRowCount] = useState(null);
    const [isLatest, setIsLatest] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    // snackbar
    const [snackbarInfo, setSnackbarInfo] = useState({
        isOpen: false,
        message: '',
        severity: 'error',
        type: null,
    });
    const limit = 14;
    const columns = [
        { field: 'id', hide: true },
        {
            field: 'message',
            headerName: 'Message',
            flex: 2.0,
            editable: true,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <span>{params.value}</span>
                </Tooltip>
            ),
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 200,
            valueFormatter: (params) => {
                return new Intl.DateTimeFormat('zh-TW', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                }).format(dayjs(params.value));
            },
        },
    ];
    const handleClose = () => {
        setOpen(false);
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handlePageChange = (params) => {
        setPage(params.page + 1);
    };

    const getPatientOrders = useCallback(() => {
        const fetchData = async (patientId, page) => {
            const { data } = await OrderService.getAll(patientId, {
                page,
                limit,
                sort: 'desc',
            });

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
        return new Promise((resolve) => resolve(fetchData(patientId, page)));
    }, [patientId, page]);

    const handleEditCellChangeCommitted = useCallback(({ id, field, props }) => {
        const putData = async (id, sendData) => {
            const { data } = await OrderService.update(id, sendData);
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
        // validate data grid
        if (props.value.length === 0) {
            setSnackbarInfo((prevState) => ({
                ...prevState,
                type: 'msgIsEmpty',
                isOpen: true,
            }));
        } else if (props.value.length > 200) {
            setSnackbarInfo((prevState) => ({
                ...prevState,
                type: 'msgTooLong',
                isOpen: true,
            }));
        } else {
            //  Call update order api
            putData(id, { message: props.value });
        }
    }, []);

    useEffect(() => {
        let active = true;

        (async () => {
            setLoading(true);
            // console.log('useEffect is running');
            if (!rowCount || currentPage !== page || !isLatest) {
                const newRows = await getPatientOrders(patientId, page);

                setRowCount(newRows.totalRows);
                setRows(newRows.orders);
                setCurrentPage(newRows.currentPage);
                setIsLatest(true);
            }

            if (!active) {
                return;
            }

            setLoading(false);
        })();

        return () => {
            active = false;
        };
    }, [page, getPatientOrders, patientId, rowCount, currentPage, isLatest]);

    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Orders
                        </Typography>
                        <IconButton autoFocus color="inherit" onClick={handleDialogOpen}>
                            <AddIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pagination
                    paginationMode="server"
                    pageSize={limit}
                    rowCount={rowCount}
                    onPageChange={handlePageChange}
                    loading={loading}
                    onEditCellChangeCommitted={handleEditCellChangeCommitted}
                />
            </Dialog>
            <CustomizedSnackbar snackbarInfo={snackbarInfo} />
            {dialogOpen && (
                <AddOrderDialog setOpen={setDialogOpen} open={open} patientId={patientId} setIsLatest={setIsLatest} />
            )}
        </div>
    );
};

export default OrdersDialog;

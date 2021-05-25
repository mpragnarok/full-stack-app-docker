import {
    cloneElement,
    useState,
    useEffect,
    // useCallback
} from 'react';
import PatientService from '../services/PatientService';

import { Avatar, Grid, List, ListItem, ListItemText, ListItemAvatar, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import FaceIcon from '@material-ui/icons/Face';
import OrdersDialog from '../components/OrdersDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

const JuboApp = () => {
    const classes = useStyles();
    const [patients, setPatients] = useState([]);
    const [patientId, setPatientId] = useState(null);
    const [open, setOpen] = useState(false);

    const getPatients = async () => {
        const { data } = await PatientService.getAll();
        if (data) {
            setPatients(data);
        }
    };

    const handleOnClick = (patientId) => {
        console.log('🚀 ~ file: JuboApp.js ~ line 41 ~ handleOnClick ~ patientId', patientId);
        setPatientId(patientId);
        setOpen(true);
    };

    useEffect(() => {
        getPatients();
    }, []);

    const generateListItem = (list) => {
        return list.map((i) =>
            cloneElement(
                <>
                    <ListItem button onClick={() => handleOnClick(i._id)}>
                        <ListItemAvatar>
                            <Avatar>
                                <FaceIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={i.name} />
                    </ListItem>
                </>,
                { key: i._id }
            )
        );
    };
    return (
        <Grid maxwidth="sm" container spacing={0} direction="column" alignItems="center" justify="center">
            <Grid item xs={3}>
                <Typography variant="h6" className={classes.title}>
                    Patient List
                </Typography>
                <div className={classes.demo}>
                    <List>{generateListItem(patients)}</List>
                    {open && <OrdersDialog setOpen={setOpen} open={open} patientId={patientId} />}
                </div>
            </Grid>
        </Grid>
    );
};
export default JuboApp;

import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
const styles = {
    root: {
        marginLeft: 5,
    },
};
const Spinner = withStyles(styles)((props) => <CircularProgress className={props.classes.spinner} size={20} />);
const LoadingButton = (props) => {
    const { children, loading, ...rest } = props;
    return (
        <Button {...rest}>
            {children}
            {loading && <Spinner {...rest} />}
        </Button>
    );
};

export default LoadingButton;

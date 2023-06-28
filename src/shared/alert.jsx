import * as React from 'react';
import { Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';

const AlertMui = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Alert = (props) => {
    const { message, isOpen, setOpen } = props;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen({ message: message, open: false });
    };

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <AlertMui onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {message}
            </AlertMui>
        </Snackbar>
    );
}

export default Alert;

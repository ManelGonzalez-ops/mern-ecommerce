import React from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { useDataLayer } from '../Context'
import { Button, IconButton, Snackbar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { userLogout } from '../actions/userActions';


export const InfoSnackbar = ({message}) => {

    const dispatch = useDispatch()
    const {openSnackbar, setOpenSnackbar} = useDataLayer()
   
    const handleClose =(logout = false)=>{

        if(logout) dispatch(userLogout())
        setOpenSnackbar(false)
    }
    return (
        <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleClose}
        message={message}
        action={
            <React.Fragment>
                <Button color="secondary" size="small" onClick={()=>{handleClose(true)}}>
                    Sign out
            </Button>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </React.Fragment>
        }
    />
    )
}

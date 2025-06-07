import React, { useState, useEffect } from 'react';
import CoreDialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  dialogPaper: {
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    overflow: 'hidden',
  },
  dialogTitle: {
    backgroundColor: theme.palette.mode === 'light' ? '#f8f9fa' : '#2a2a2a',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)'}`,
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    color: theme.palette.mode === 'light' ? '#333' : '#f0f0f0',
  },
  closeButton: {
    color: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.54)' : 'rgba(255, 255, 255, 0.54)',
    padding: 8,
    '&:hover': {
      backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.04)',
    },
  },
  content: {
    padding: theme.spacing(2, 3),
  },
}));

function Dialog ({ title, modalOpen, onClose, children }) {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        setOpen(modalOpen)
    }, [modalOpen])
    
    const handleClose = () => {
        setOpen(false);
        onClose()
    };

    return (
        <>
            <CoreDialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    className: classes.dialogPaper,
                    elevation: 3
                }}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title" className={classes.dialogTitle} disableTypography>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <IconButton 
                        aria-label="close" 
                        className={classes.closeButton} 
                        onClick={handleClose}
                        size="small"
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </DialogTitle>
                <div className={classes.content}>
                    {children}
                </div>
            </CoreDialog>
        </>
    );
}

export default Dialog;
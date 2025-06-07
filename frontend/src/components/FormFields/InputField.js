import React from 'react';
import { at } from 'lodash';
import { useField } from 'formik';
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  inputField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(66, 66, 66, 0.9)',
      '&:hover': {
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      },
      '&.Mui-focused': {
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)',
      transition: 'all 0.3s ease',
    },
    '& .MuiInputLabel-outlined': {
      fontWeight: 500,
      color: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    },
    '& .MuiInputBase-input': {
      padding: '12px 14px',
    },
    '& .MuiFormHelperText-root': {
      marginTop: '6px',
      fontWeight: 500,
    },
    marginBottom: theme.spacing(2),
  },
}));

export default function InputField(props) {
  const { errorText, ...rest } = props;
  const [field, meta] = useField(props);
  const classes = useStyles();

  function _renderHelperText() {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
  }

  return (
    <TextField
      type="text"
      error={meta.touched && meta.error && true}
      helperText={_renderHelperText()}
      variant="outlined"
      fullWidth
      className={classes.inputField}
      InputLabelProps={{
        shrink: true,
      }}
      {...field}
      {...rest}
    />
  );
}

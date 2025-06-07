import React from 'react';
import { at } from 'lodash';
import { useField } from 'formik';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  formControl: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  checkboxLabel: {
    marginLeft: -8,
    '& .MuiFormControlLabel-label': {
      fontSize: '0.95rem',
      fontWeight: 500,
      color: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    },
  },
  checkbox: {
    '&.MuiCheckbox-root': {
      color: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.54)' : 'rgba(255, 255, 255, 0.54)',
      transition: 'all 0.2s ease',
      padding: '9px',
    },
    '&.Mui-checked': {
      color: theme.palette.primary.main,
    },
    '&:hover': {
      backgroundColor: theme.palette.mode === 'light' 
        ? 'rgba(251, 204, 60, 0.08)' 
        : 'rgba(251, 204, 60, 0.08)',
    },
  },
  helperText: {
    marginTop: '4px',
    marginLeft: '14px',
    fontWeight: 500,
    fontSize: '0.75rem',
  },
}));

export default function CheckboxField(props) {
  const { label, ...rest } = props;
  const [field, meta, helper] = useField(props);
  const { setValue } = helper;
  const classes = useStyles();

  function _renderHelperText() {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return <FormHelperText className={classes.helperText} error>{error}</FormHelperText>;
    }
  }

  function _onChange(e) {
    setValue(e.target.checked);
  }

  return (
    <FormControl className={classes.formControl} {...rest}>
      <FormControlLabel
        value={field.checked}
        checked={field.checked}
        className={classes.checkboxLabel}
        control={
          <Checkbox 
            {...field} 
            onChange={_onChange} 
            className={classes.checkbox}
            color="primary"
            size="medium"
          />
        }
        label={
          <Typography variant="body2">{label}</Typography>
        }
      />
      {_renderHelperText()}
    </FormControl>
  );
}

import React, { useState, useEffect } from 'react';
import { useField } from 'formik';
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  datePicker: {
    width: '100%',
    marginBottom: theme.spacing(2),
    '& .MuiInputBase-root': {
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
    '& .MuiInputLabel-root': {
      fontWeight: 500,
      color: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
      '&.Mui-focused': {
        color: theme.palette.primary.main,
      },
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.primary.main,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)',
      transition: 'all 0.3s ease',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
    '& .MuiInputAdornment-root .MuiIconButton-root': {
      padding: '8px',
      color: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.54)' : 'rgba(255, 255, 255, 0.54)',
      '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.04)',
      },
    },
    '& .MuiFormHelperText-root': {
      marginTop: '6px',
      fontWeight: 500,
    },
  },
}));

export default function DatePickerField(props) {
  const [field, meta, helper] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helper;
  const isError = touched && error && true;
  const { value } = field;
  const [selectedDate, setSelectedDate] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
    }
  }, [value]);

  function _onChange(date) {
    if (date) {
      setSelectedDate(date);
      try {
        const ISODateString = date.toISOString();
        setValue(ISODateString);
      } catch (error) {
        setValue(date);
      }
    } else {
      setValue(date);
    }
  }

  return (
    <Grid container>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          {...field}
          {...props}
          className={classes.datePicker}
          value={selectedDate}
          onChange={_onChange}
          error={isError}
          invalidDateMessage={isError && error}
          helperText={isError && error}
          inputVariant="outlined"
          format="dd/MM/yyyy"
          margin="normal"
          fullWidth
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          InputProps={{
            style: { paddingLeft: '14px' }
          }}
        />
      </MuiPickersUtilsProvider>
    </Grid>
  );
}

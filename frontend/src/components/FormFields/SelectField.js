import React from 'react';
import PropTypes from 'prop-types';
import { at } from 'lodash';
import { useField } from 'formik';
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  formControl: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  selectField: {
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
    '& .MuiSelect-select': {
      padding: '12px 14px',
    },
    '& .MuiInputLabel-outlined': {
      fontWeight: 500,
      color: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
      transform: 'translate(14px, 14px) scale(1)',
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.75)',
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)',
      transition: 'all 0.3s ease',
    },
  },
  menuItem: {
    padding: '10px 14px',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.04)',
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.mode === 'light' ? 'rgba(251, 204, 60, 0.15)' : 'rgba(251, 204, 60, 0.15)',
      '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(251, 204, 60, 0.25)' : 'rgba(251, 204, 60, 0.25)',
      },
    },
  },
  helperText: {
    marginTop: '6px',
    fontWeight: 500,
  },
}));

function SelectField(props) {
  const { label, data, ...rest } = props;
  const [field, meta] = useField(props);
  const { value: selectedValue } = field;
  const [touched, error] = at(meta, 'touched', 'error');
  const isError = touched && error && true;
  const classes = useStyles();
  
  function _renderHelperText() {
    if (isError) {
      return <FormHelperText className={classes.helperText}>{error}</FormHelperText>;
    }
  }

  return (
    <FormControl 
      variant="outlined" 
      className={`${classes.formControl} ${classes.selectField}`} 
      error={isError} 
      fullWidth 
      {...rest}
    >
      <InputLabel id={`select-label-${field.name}`}>{label}</InputLabel>
      <Select 
        labelId={`select-label-${field.name}`}
        label={label}
        {...field} 
        value={selectedValue ? selectedValue : ''}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
          PaperProps: {
            style: {
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            },
          },
        }}
      >
        {data.map((item, index) => (
          <MenuItem key={index} value={item.value} className={classes.menuItem}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {_renderHelperText()}
    </FormControl>
  );
}

SelectField.defaultProps = {
  data: []
};

SelectField.propTypes = {
  data: PropTypes.array.isRequired
};

export default SelectField;

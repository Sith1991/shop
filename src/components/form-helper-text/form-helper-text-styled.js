import React from 'react';
import { FormHelperText } from '@material-ui/core';
import { useFormHelperTextStyle } from '../../styles/customizing-material-ui-components';

const FormHelperTextStyled = ({ children }) => {
  const classes = useFormHelperTextStyle();
  return <FormHelperText classes={{ root: classes.root }}>{children}</FormHelperText>;
};

export { FormHelperTextStyled };

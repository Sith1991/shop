import React from 'react';
import { Radio } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import image from '../../svg/Ellipse.svg';

const StyledRadio = (props) => {
  const useStyles = makeStyles({
    root: {
      padding: '0 8px 0 0',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    icon: {
      borderRadius: '50%',
      width: 24,
      height: 24,
      boxShadow:
        'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      backgroundColor: '#FFFFFF',
      backgroundImage:
        'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
      },
      'input:hover ~ &': {
        backgroundColor: '#FFFFFF',
      },
    },
    checkedIcon: {
      backgroundImage: `url(${image})`,
      backgroundRepeat: 'no-repeat',
      margin: '0px auto',
      backgroundPosition: 'center center',
    },
  });

  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      size={'small'}
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
};

export { StyledRadio };

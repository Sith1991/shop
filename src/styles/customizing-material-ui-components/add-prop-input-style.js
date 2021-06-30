import { makeStyles } from '@material-ui/core/styles';

const useAddPropInputStyles = makeStyles({
  root: {
    width: '255px',
    padding: '8px 8px 7px 8px',
    marginRight: '22px',
    '@media (max-width:576px)': {
      marginRight: 0,
    },
  },
  input: {
    padding: '0',
    height: '1em',
  },
});

export { useAddPropInputStyles };

import { makeStyles } from '@material-ui/core/styles';

const useRegistrationButtonStyles = makeStyles({
  root: {
    background: '#ffb800',
    '&:hover': {
      background: '#d7a002',
    },
    borderRadius: 4,
    border: 0,
    color: '#FFFFFF',
    height: 32,
    width: 200,
  },
  label: {
    textTransform: 'none',
  },
});

export { useRegistrationButtonStyles };

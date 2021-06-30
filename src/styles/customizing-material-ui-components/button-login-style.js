import { makeStyles } from '@material-ui/core/styles';

const useLoginButtonStyles = makeStyles({
  root: {
    background: '#ffb800',
    '&:hover': {
      background: '#d7a002',
    },
    borderRadius: 4,
    border: 0,
    color: '#FFFFFF',
    height: 32,
    width: 160,
  },
  label: {
    textTransform: 'none',
  },
});

export { useLoginButtonStyles };

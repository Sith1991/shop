import { createTheme  } from '@material-ui/core/styles';

const theme = createTheme ({
  typography: {
    button: {
      fontFamily: 'Roboto, serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 16,
      lineHeight: '19px',
    },
  },
});

export { theme };

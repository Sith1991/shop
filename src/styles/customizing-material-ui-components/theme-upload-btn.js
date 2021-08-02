import { createTheme  } from '@material-ui/core/styles';

const themeUploadBtn = createTheme ({
  typography: {
    button: {
      fontFamily: 'Roboto, serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 14,
      lineHeight: '16px',
      letterSpacing: 'none',
    },
  },
});

export { themeUploadBtn };

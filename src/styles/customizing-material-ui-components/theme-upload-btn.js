import {createMuiTheme} from '@material-ui/core/styles';

const themeUploadBtn = createMuiTheme({
    typography: {
        button: {
            fontFamily: 'Roboto, serif',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 14,
            lineHeight: '16px',
            letterSpacing: 'none',
        }
    }
})

export default themeUploadBtn;
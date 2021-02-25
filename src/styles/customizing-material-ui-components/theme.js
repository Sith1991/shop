import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        button: {
            fontFamily: 'Roboto, serif',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 16,
            lineHeight: '19px',
        }
    }
})

export default theme;
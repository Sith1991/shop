import {makeStyles} from "@material-ui/core/styles";

const useProductCardItemSelectStyles = makeStyles((theme) => ({
    formControl: {
        margin: 0,
        width: 255,
    },
    root: {
        fontFamily: 'Roboto, serif',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: '16px',
        color: '#828282',
        paddingTop: 8.5,
        paddingBottom: 6.5,
    },
    icon: {
        color: '#0258FF'
    }
}));

export default useProductCardItemSelectStyles;
import {makeStyles} from "@material-ui/core/styles";

const usePropertyLabelStyles = makeStyles({
    root: {
        maxWidth: '120px',
        marginLeft: 0,
    },
    label: {
        fontFamily: 'Roboto, serif',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: '16px',
        color: '#000000',
        opacity: 0.8,
    },
});

export default usePropertyLabelStyles;
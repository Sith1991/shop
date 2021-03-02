import {makeStyles} from "@material-ui/core/styles";

const useSaveButtonStyles = makeStyles({
    root: {
        background: '#34C15C',
        '&:hover': {
            background: '#229641',
        },
        borderRadius: 4,
        border: 0,
        color: '#FFFFFF',
        height: 32,
        width: 160,
        boxShadow: '5px 10px 10px rgba(0, 0, 0, 0.05)'
    },
    label: {
        textTransform: 'none',
    },
});

export default useSaveButtonStyles;
import {makeStyles} from "@material-ui/core/styles";

const useUploadButtonStyles = makeStyles({
    root: {
        background: 'none',
        '&:hover': {
            background: 'none',
            boxShadow: 'none'
        },
        borderRadius: 4,
        color: '#828282',
        height: 32,
        width: 255,
        boxShadow: 'none',
        border: '1px solid #E0E0E0',
    },
    label: {
        textTransform: 'capitalize',
    },
});

export default useUploadButtonStyles;
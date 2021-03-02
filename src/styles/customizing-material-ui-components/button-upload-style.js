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
        minHeight: 32,
        width: 255,
        boxShadow: 'none',
        border: '1px solid #E0E0E0',
        padding: '4px 8px'
    },
    label: {
        textTransform: 'none',
        justifyContent: 'space-between',
    },
});

export default useUploadButtonStyles;
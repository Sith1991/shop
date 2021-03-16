import {makeStyles} from "@material-ui/core/styles";

const useAddItemLabelStyles = makeStyles({
    root: {
        fontFamily: 'Roboto, serif !important',
        fontStyle: 'normal !important',
        fontWeight: 'normal !important',
        fontSize: '14px !important',
        lineHeight: '16px !important',
        color: '#000000 !important',
        opacity: 0.8,
        letterSpacing: '0 !important',
    },
});

// !important пришлось добавить потому-что иначе стили не перебивались

export default useAddItemLabelStyles;
import React from 'react';
import {TablePagination} from "@material-ui/core";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import PropTypes from "prop-types";

const UniversalTablePagination = (props) => {

    const {array, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage} = props;

    const useStyles = makeStyles((theme) => ({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }));

    function TablePaginationActions(props) {
        const classes = useStyles();
        const theme = useTheme();
        const {count, page, rowsPerPage, onChangePage} = props;

        const handleFirstPageButtonClick = (event) => {
            onChangePage(event, 0);
        };

        const handleBackButtonClick = (event) => {
            onChangePage(event, page - 1);
        };

        const handleNextButtonClick = (event) => {
            onChangePage(event, page + 1);
        };

        const handleLastPageButtonClick = (event) => {
            onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
                </IconButton>
                <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                    {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
                </IconButton>
            </div>
        );
    }

    TablePaginationActions.propTypes = {
        count: PropTypes.number.isRequired,
        onChangePage: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
    };

       return (
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, {label: 'Все', value: -1}]}
                count={array.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                    inputProps: {'aria-label': 'rows per page'},
                    native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
    )
}

export default UniversalTablePagination;
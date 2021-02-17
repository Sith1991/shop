import React from 'react';
import {createMuiTheme, makeStyles, ThemeProvider, useTheme} from "@material-ui/core/styles";
import {ruRU} from "@material-ui/core/locale";
import IconButton from "@material-ui/core/IconButton";
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import PropTypes from "prop-types";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead, TablePagination,
    TableRow,
    TableSortLabel
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Link} from "react-router-dom";

import './property-list-table.scss';


const PropertyListTable = ({properties, onDeleted}) => {

    // русская локализация

    const theme = createMuiTheme({
        palette: {
            primary: {main: '#1976d2'},
        },
    }, ruRU);

    // начинаем делать пагинацию
    const useStyles1 = makeStyles((theme) => ({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }));

    function TablePaginationActions(props) {
        const classes = useStyles1();
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
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, properties.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // закончили с пагинацией

    // начинаем делать сортировку

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    let headCells = [
        {id: 'propName', label: 'Перечень проперти'},
        {id: 'propType', label: 'Тип'},
    ];

    function EnhancedTableHead(props) {
        const {classes, order, orderBy, onRequestSort} = props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            sortDirection={orderBy === headCell.id ? order : false}
                            id={`${headCell.id}`}
                            align={headCell.id === 'propName' ? "right" : 'left'}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                                IconComponent={ExpandMoreIcon}
                            >
                                <div className={'table-header'}>{headCell.label}</div>
                                {orderBy === headCell.id ? (<span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                    <TableCell key={'administration'}
                               id={'administration'}><div className={'table-header'}>Управление</div>
                    </TableCell>
                </TableRow>
            </TableHead>
        );
    }

    EnhancedTableHead.propTypes = {
        classes: PropTypes.object.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
    };

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState();

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
    }));

    const classes = useStyles();

    return (
        <div className={'property-list-table'}>
            <ThemeProvider theme={theme}>
                <TableContainer>
                    <Table>
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(properties, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((properties) => {
                                    const {id, propName, propType} = properties;
                                    return (
                                        <TableRow key={id}>
                                            <TableCell>
                                                <div className={'property-name table-body'}>{propName}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={'property-type table-body'}>{propType}</div>
                                            </TableCell>
                                            <TableCell align={"right"}>
                                                <Link to={'#'} onClick={() => onDeleted(id)}
                                                      className={'link'}>Удалить</Link>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 47 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, {label: 'Все', value: -1}]}
                                count={properties.length}
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
                        </TableFooter>
                    </Table>
                </TableContainer>
            </ThemeProvider>
        </div>
    )
}

export default PropertyListTable;
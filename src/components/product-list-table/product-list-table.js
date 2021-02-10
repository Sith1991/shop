import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow
} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';


const ProductListTable = () => {
    const products = [
        {
            id: 1,
            itemName: 'CASHES VALLEY LANE',
            price: 500000,
            dateOfChange: '01.11.18'
        },
        {
            id: 2,
            itemName: 'DURUN DURUN HOUSE',
            price: 1216000,
            dateOfChange: '01.11.18'
        },
        {
            id: 3,
            itemName: 'CASHES VALLEY LANE',
            price: 500000,
            dateOfChange: '31.10.18'
        },
        {
            id: 4,
            itemName: 'CASHES VALLEY LANE',
            price: 500000,
            dateOfChange: '01.11.18'
        },
        {
            id: 5,
            itemName: 'CASHES VALLEY LANE',
            price: 500000,
            dateOfChange: '01.11.18'
        },
        {
            id: 6,
            itemName: 'CASHES VALLEY LANE',
            price: 500000,
            dateOfChange: '01.11.18'
        },
        {
            id: 7,
            itemName: 'CASHES VALLEY LANE',
            price: 500000,
            dateOfChange: '01.11.18'
        },
        {
            id: 8,
            itemName: 'CASHES VALLEY LANE',
            price: 500000,
            dateOfChange: '01.11.18'
        },
        {
            id: 9,
            itemName: 'CASHES VALLEY LANE',
            price: 500000,
            dateOfChange: '01.11.18'
        },
        {
            id: 10,
            itemName: 'CASHES VALLEY LANE',
            price: 500000,
            dateOfChange: '01.11.18'
        },
        {
            id: 11,
            itemName: 'CASHES VALLEY LANE',
            price: 500000,
            dateOfChange: '01.11.18'
        },
        {
            id: 12,
            itemName: 'CASHES VALLEY LANE',
            price: 500000,
            dateOfChange: '01.11.18'
        },
        {
            id: 13,
            itemName: 'CASHES VALLEY LANE',
            price: 500000,
            dateOfChange: '01.11.18'
        },
        {
            id: 14,
            itemName: 'CASHES VALLEY LANE',
            price: 500000,
            dateOfChange: '01.11.18'
        },
        {
            id: 15,
            itemName: 'CASHES VALLEY LANE',
            price: 500000,
            dateOfChange: '01.11.18'
        },
        {
            id: 16,
            itemName: 'CASHES VALLEY LANE',
            price: 500000,
            dateOfChange: '01.11.18'
        },
        {
            id: 17,
            itemName: 'CASHES VALLEY LANE',
            price: 500000,
            dateOfChange: '01.11.18'
        },
        {
            id: 18,
            itemName: 'CASHES VALLEY LANE',
            price: 500000,
            dateOfChange: '01.11.18'
        },
        {
            id: 19,
            itemName: 'CASHES VALLEY LANE',
            price: 500000,
            dateOfChange: '01.11.18'
        },
    ];

    const useStyles1 = makeStyles((theme) => ({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }));

    function TablePaginationActions(props) {
        const classes = useStyles1();
        const theme = useTheme();
        const { count, page, rowsPerPage, onChangePage } = props;

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
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        );
    };

    TablePaginationActions.propTypes = {
        count: PropTypes.number.isRequired,
        onChangePage: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
    };
    const useStyles2 = makeStyles({
        table: {
            minWidth: 500,
        },
    });
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <div className={'product-list-table'}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Перечень товаров</TableCell>
                            <TableCell>Стоимость</TableCell>
                            <TableCell>Дата изменения</TableCell>
                            <TableCell>Управление</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                                {(rowsPerPage > 0
                                    ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : products
                                ).map((product) => {
                                    const {id, itemName, price, dateOfChange} = product;
                                    const formatedPrice = price.toLocaleString('ru-RU');
                                    return (
                                        <TableRow key={id}>
                                            <TableCell className={'product-name'}><Link to={`/item-card/${id}`}>{itemName}</Link></TableCell>
                                            <TableCell>{formatedPrice} $</TableCell>
                                            <TableCell>{dateOfChange}</TableCell>
                                            <TableCell>
                                                <div className="links">
                                                    <Link to={'#'}>Ред.</Link>
                                                    <Link to={'#'}>Удалить</Link>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            count={products.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    )

}

export default ProductListTable;
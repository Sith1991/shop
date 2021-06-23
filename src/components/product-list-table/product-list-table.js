import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableRow,
} from "@material-ui/core";
import {Link} from "react-router-dom";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {ruRU} from '@material-ui/core/locale';
import UniversalTablePagination from "../universal-table-pagination";
import ProductListTableHeader from "./product-list-table-header";
import Spinner from "../spinner";

import './product-list-table.scss';

const ProductListTable = ({products, onDeleted, loading, productsError, deletedProduct}) => {

    // русская локализация
    const theme = createMuiTheme({
        palette: {
            primary: {main: '#1976d2'},
        },
    }, ruRU);

    // начинаем делать пагинацию
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

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState();

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const timestampToDate = (timestamp) => {
        const d = new Date();
        d.setTime(timestamp);
        return ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear().toString().substr(-2);
    }

    return (
        <div className={'product-list-table'}>
            <ThemeProvider theme={theme}>
                <TableContainer>
                    <Table>
                        <ProductListTableHeader
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        {loading ? <Spinner/> :
                            <TableBody>
                                {/*Если rowsPerPage = -1 (т.е. выбрано в пагинации "Показать Все", то мапим без слайса)*/}
                                {(rowsPerPage > 0 ?
                                        stableSort(products, getComparator(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : stableSort(products, getComparator(order, orderBy))
                                )
                                    .map((product) => {
                                        const {id, itemName, price, dateOfChange} = product;
                                        const formattedPrice = price.toLocaleString('ru-RU');
                                        const formattedDateOfChange = timestampToDate(dateOfChange);
                                        return (
                                            <TableRow key={id}>
                                                <TableCell align={'center'} className={'link table-body'}>
                                                    <Link to={`/item-card/${id}`}>
                                                        <div className={'table-value'}>{itemName}</div>
                                                    </Link>
                                                </TableCell>
                                                <TableCell className={'table-body'}>
                                                    <div className={'table-value'}>{formattedPrice} $</div>
                                                </TableCell>
                                                <TableCell className={'table-body'}>
                                                    <div className={'table-value'}>{formattedDateOfChange}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="links">
                                                        <Link to={`/add-item/${id}`} className={'link'}>Ред.</Link>
                                                        <Link to={'#'}
                                                              onClick={() => onDeleted(id, 'products', productsError, deletedProduct)}
                                                              className={'link'}>Удалить</Link>
                                                    </div>
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
                        }
                        <TableFooter>
                            <TableRow>
                                <UniversalTablePagination
                                    array={products}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    handleChangePage={handleChangePage}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </ThemeProvider>
        </div>
    )
}

export default ProductListTable;
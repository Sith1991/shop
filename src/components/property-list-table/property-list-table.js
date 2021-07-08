import React from 'react';
import { Link } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ruRU } from '@material-ui/core/locale';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableRow,
} from '@material-ui/core';

import { UniversalTablePagination } from '../universal-table-pagination';
import { PropertyListTableHeader } from './index';

import './property-list-table.scss';

const PropertyListTable = ({
  properties,
  onDeleted,
  propertiesError,
  deletedProperty,
}) => {
  // русская локализация
  const theme = createMuiTheme(
    {
      palette: {
        primary: { main: '#1976d2' },
      },
    },
    ruRU
  );

  // начинаем делать пагинацию
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, properties.length - page * rowsPerPage);

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

  // закончили с сортировкой

  return (
    <div className={'property-list-table'}>
      <ThemeProvider theme={theme}>
        <TableContainer>
          <Table>
            <PropertyListTableHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {/*Если rowsPerPage = -1 (т.е. выбрано в пагинации "Показать Все", то мапим без слайса)*/}
              {(rowsPerPage > 0
                ? stableSort(properties, getComparator(order, orderBy)).slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : stableSort(properties, getComparator(order, orderBy))
              ).map((properties) => {
                const { id, propertyName, propertyType } = properties;
                return (
                  <TableRow key={id}>
                    <TableCell>
                      <div className={'property-name table-body'}>
                        {propertyName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={'property-type table-body'}>
                        {propertyType}
                      </div>
                    </TableCell>
                    <TableCell align={'right'}>
                      <Link
                        to={'#'}
                        onClick={() =>
                          onDeleted(
                            id,
                            'properties',
                            propertiesError,
                            deletedProperty
                          )
                        }
                        className={'link'}
                      >
                        Удалить
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 47 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <UniversalTablePagination
                  array={properties}
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
  );
};

export { PropertyListTable };

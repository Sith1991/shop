import React from 'react';
import {TableCell, TableHead, TableRow, TableSortLabel} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

import './product-list-table.scss';

const ProductListTableHeader = (props) => {

    const {order, orderBy, onRequestSort} = props;
    const headCells = [
        {id: 'itemName', label: 'Перечень товаров'},
        {id: 'price', label: 'Стоимость'},
        {id: 'dateOfChange', label: 'Дата изменения'},
    ];
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    ProductListTableHeader.propTypes = {
        onRequestSort: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
    };

    const useStyles = makeStyles(() => ({
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
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                        id={`${headCell.id}`}
                        align={headCell.id === 'itemName' ? 'center' : 'left'}
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
    )
}

export default ProductListTableHeader;
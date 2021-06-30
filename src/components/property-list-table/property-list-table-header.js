import React from 'react';
import PropTypes from 'prop-types';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

import './property-list-table.scss';

const PropertyListTableHeader = (props) => {
  const { order, orderBy, onRequestSort } = props;

  const headCells = [
    { id: 'propName', label: 'Перечень проперти' },
    { id: 'propType', label: 'Тип' },
  ];

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  PropertyListTableHeader.propTypes = {
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
              <span className={'table-header'}>{headCell.label}</span>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell key={'administration'} id={'administration'}>
          <span className={'table-header'}>Управление</span>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export { PropertyListTableHeader };
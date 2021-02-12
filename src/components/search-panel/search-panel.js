import React, {Component} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './search-panel.scss';


export default class SearchPanel extends Component {

    onSearchChange = (e) => {
        this.props.termSetup(e.target.value)
    }

    onColumnChange = (e) => {
        this.props.columnChange(e.target.value)
    }

    render() {

        return (
            <div className={'search-panel'}>
                <TextField className={'input'}
                    label="Поиск"
                           type="search"
                           variant="outlined"
                           onChange={this.onSearchChange}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <SearchIcon/>
                                   </InputAdornment>
                               ),}}/>
                <FormControl className={'select'} variant="outlined">
                    <InputLabel>Столбце</InputLabel>
                    <Select
                        label={'Категория'}
                        defaultValue={'itemName'}
                        onChange={this.onColumnChange}>
                        <MenuItem value={'itemName'}>Перечень товаров</MenuItem>
                        <MenuItem value={'price'}>Стоимость</MenuItem>
                        <MenuItem value={'dateOfChange'}>Дата изменения</MenuItem>
                    </Select>
                </FormControl>
            </div>
        )
    }
}
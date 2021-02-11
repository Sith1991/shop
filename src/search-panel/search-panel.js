import React, {Component} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './search-panel.scss';


export default class SearchPanel extends Component {

    render() {

        return (
            <div className={'search-panel'}>
                <TextField label="Поиск"
                           type="search"
                           variant="outlined"
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <SearchIcon/>
                                   </InputAdornment>
                               ),
                           }}/>
                <div>
                    В:
                </div>
                <div>
                    <FormControl className={'select'} variant="outlined">
                        <InputLabel>Столбце</InputLabel>
                        <Select
                            label="Столбце"
                        >
                            <MenuItem value={10}>Перечень товаров</MenuItem>
                            <MenuItem value={20}>Стоимость</MenuItem>
                            <MenuItem value={30}>Дата изменения</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        )
    }
}
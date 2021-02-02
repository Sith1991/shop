import React from 'react';
import {Link} from 'react-router-dom';

import './header.css';

const HeaderLists = () => {
    return (
        <div className={'header'}>
            <ul className={'wrap'}>
                <li className={'link colored'}>
                    <Link to={'/'}>Листинг товаров</Link>
                </li>
                <li className={'link'}>
                    <Link to={'/property-list'} >Листинг проперти</Link>
                </li>
            </ul>
        </div>
    )
}

export default HeaderLists;
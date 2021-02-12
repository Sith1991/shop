import React from 'react';
import {Link} from 'react-router-dom';

import './header.css';

const HeaderTabs = () => {
    return (
        <div className={'header'}>
            <div className={'wrap colored'}>
                <div className={'background'}></div>
                <Link to={'/'}>
                    Листинг товаров
                </Link>
            </div>
            <div className={'wrap'}>
                <div className={'background'}></div>
                <Link to={'/property-list'}>
                    Листинг проперти
                </Link>
            </div>
        </div>
    )
}

export default HeaderTabs;
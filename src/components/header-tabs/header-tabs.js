import React from 'react';
import {Link} from 'react-router-dom';

import './header-tabs.scss';

const HeaderTabs = () => {
    return (
        <div className={'header'}>
            <div className={'wrap colored'}>
                <div className={'background'}></div>
                <Link to={'/'} className={'header-links'}>
                    Листинг товаров
                </Link>
            </div>
            <div className={'wrap'}>
                <div className={'background'}></div>
                <Link to={'/property-list'} className={'header-links'}>
                    Листинг проперти
                </Link>
            </div>
        </div>
    )
}

export default HeaderTabs;
import React from 'react';
import { Link } from 'react-router-dom';

import './error-indicator.scss';

const ErrorIndicator = () => {
  return (
    <div className={'error-indicator'}>
      <div className={'error-indicator-wrap'}>
        <div className={'error-indicator-big-text'}>Error!</div>
        <div className={'error-indicator-big-text'}>Страница не найдена</div>
        <div className={'error-indicator-low-text'}>Произошли технические неполадки, либо страница устарела, была удалена или не существовала вовсе</div>
        <div className={'back-to-home'}>
          <Link to={'/'}>Вернуться на главную</Link>
        </div>
      </div>
    </div>
  );
};

export { ErrorIndicator };

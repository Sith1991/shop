import React from 'react';

import './error-message-text.scss';

const ErrorMessageText = ({ message }) => {
  if (message === undefined) {
    return null;
  }

  switch (message) {
    case 'There is no user record corresponding to this identifier. The user may have been deleted.':
      return (
        <div className={'text-error'}>Данного пользователя не существует</div>
      );

    case 'The password is invalid or the user does not have a password.':
      return <div className={'text-error'}>Неверный пароль</div>;
    case 'The email address is already in use by another account.':
      return (
        <div className={'text-error'}>
          Пользователь с данным e-mail уже зарегестрирован
        </div>
      );
    default:
      return <div className={'text-error'}>{message}</div>;
  }
};

export { ErrorMessageText };
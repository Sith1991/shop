import React from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const PriceFormatInput = ({ classesInput, onChange, onBlur, values }) => {
  return (
    <OutlinedInput
      variant="outlined"
      notched={false}
      placeholder="Стоимость товара"
      className={'number-input'}
      classes={{
        root: classesInput.root,
        input: classesInput.input,
      }}
      name={'price'}
      onChange={onChange}
      onBlur={onBlur}
      value={values.toLocaleString('ru-RU')}
    />
  );
};

export { PriceFormatInput };

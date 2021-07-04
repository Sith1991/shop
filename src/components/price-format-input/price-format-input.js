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
    onChange={onChange} // необходимо прокидывать с такими именами, иначе NumberFormat не сработает
    onBlur={onBlur} // необходимо прокидывать с такими именами, иначе NumberFormat не сработает
    value={values.price.toLocaleString('ru-RU')} // toLocaleString добавлен, что бы при редактировании цена отображалась в правильном формате
    />
  );
};

export { PriceFormatInput };

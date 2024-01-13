import { useState } from 'react';
import { BiSolidSearchAlt2 } from 'react-icons/bi';
import ImageButton from './ImageButton';

function Input({ value, onChange, label, search, selected }) {
  const [isSelected, setIsSelected] = useState(selected);

  return (
    <div className="input">
      <div className={`input__label-field ${isSelected && 'input__label-field_selected'}`}>
        <label className="input__label">{label}</label>
        <input className="input__field" value={value || ''}
          onInput={(event) => { onChange(event.target.value) }}
          onFocus={() => { setIsSelected(true) }}
          onBlur={() => { !value && setIsSelected(false) }}
        />
      </div>
      {search && <ImageButton>
        <BiSolidSearchAlt2 className="image-button__img" />
      </ImageButton>}
    </div>
  )
}

export default Input;

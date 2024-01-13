import { useEffect, useRef, useState } from 'react';
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';
import ReactIcon from './ReactIcon';

function Dropdown({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(0);

  const dropdownEl = useRef();

  useEffect(() => {

    const handleClick = (event) => {
      if (dropdownEl.current === null || isOpen === 0) return;

      if (!dropdownEl.current.contains(event.target)) setIsOpen(1);
    }

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isOpen]);

  const renderedOptions = options.map((option) => {
    return <div
      key={option.value}
      className="dropdown__option"
      onClick={() => {
        setIsOpen(1);
        onChange(option.value);
      }}>{option.label}</div>;
  });

  const dropdownIcon = (isOpen === 2) ? <BiSolidUpArrow className="dropdown__img" />
    : <BiSolidDownArrow className="dropdown__img" />;

  return (
    <div className="dropdown" ref={dropdownEl}>
      <div className="dropdown__current" onClick={() => setIsOpen((isOpen === 1 || isOpen === 0) ? 2 : 1)}>
        <p className="dropdown__text">{`Page ${value}`}</p>
        <ReactIcon src={dropdownIcon} color="#86a69d" />
      </div>
      <div className={`dropdown__menu 
      ${(isOpen === 2) ? 'dropdown__menu_open' : (isOpen === 1) ? 'dropdown__menu_close' : ''}`}>
        {renderedOptions}
      </div>
    </div>
  );
}

export default Dropdown;

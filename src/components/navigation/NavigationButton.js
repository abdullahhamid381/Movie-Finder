import { useSelector } from 'react-redux';
import ReactIcon from '../reusable/ReactIcon';

function NavigationButton({ children, onClick, title, path }) {
  const currentPath = useSelector((state) => state.navigationReducer.currentPath);

  return (
    <button
      className={`image-button image-button_navigation ${(currentPath === path) && 'image-button_selected'}`}
      onClick={onClick}
      title={title}>
      <ReactIcon src={children} color={(currentPath === path) ? '#7a316f' : '#86a69d'} />
    </button>
  )
}

export default NavigationButton;

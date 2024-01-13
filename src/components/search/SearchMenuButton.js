import { useSelector } from 'react-redux';
import ReactIcon from '../reusable/ReactIcon';

function SearchMenuButton({ children, onClick, title, section }) {
  const searchSection = useSelector((state) => state.navigationReducer.searchSection);

  return (
    <button
      className={`image-button ${(searchSection === section)
        && 'image-button_selected'} image-button_search`}
      onClick={onClick}
      title={title}>
      <ReactIcon src={children} color={(searchSection === section) ? '#7a316f' : '#86a69d'} />
    </button>
  )
}

export default SearchMenuButton;

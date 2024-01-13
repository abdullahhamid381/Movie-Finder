import ReactIcon from './ReactIcon';

function ImageButton({ children, onClick, title }) {
  return (
    <button className="image-button" onClick={onClick} title={title}>
      <ReactIcon src={children} color="#7a316f" />
    </button>
  )
}

export default ImageButton;

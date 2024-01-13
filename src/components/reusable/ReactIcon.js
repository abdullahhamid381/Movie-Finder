import { IconContext } from 'react-icons';

function ReactIcon({ src, color }) {
  return (
    <IconContext.Provider value={{ color: color }}>
      {src}
    </IconContext.Provider>
  );
}

export default ReactIcon;

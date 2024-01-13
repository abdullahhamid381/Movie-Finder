import { useSelector } from 'react-redux';

function Route({ path, children }) {
  const currentPath = useSelector((state) => {
    return state.navigationReducer.currentPath;
  });

  if (path === currentPath) {
    return children;
  }

  return;
}

export default Route;

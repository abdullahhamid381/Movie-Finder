import { useDispatch, useSelector } from 'react-redux';
import { setFullName } from '../../store';
import { BiSolidUser } from 'react-icons/bi';
import { ImSpinner } from 'react-icons/im';
import { useFetchUserNameQuery, useSetUserNameMutation } from '../../store';
import Input from '../reusable/Input';
import ReactIcon from '../reusable/ReactIcon';

function UserInfo() {
  const { data, error, isLoading } = useFetchUserNameQuery();
  const [setUserName] = useSetUserNameMutation();

  const dispatch = useDispatch();
  const { firstName, lastName } = useSelector((state) => (
    {
      firstName: state.userProfileReducer.fullName.firstName,
      lastName: state.userProfileReducer.fullName.lastName
    }
  ));

  let content;
  if (isLoading) {
    content = <ReactIcon src={<ImSpinner className="spinner" />} color="#86a69d" />
  } else if (error) {
    content = <p className="no-results">An error occurred while trying to get user profile.</p>;
  } else {
    const handleFirstNameInput = (value) => {
      dispatch(setFullName({ firstName: value, lastName }));
    }
    const handleLastNameInput = (value) => {
      dispatch(setFullName({ firstName, lastName: value }));
    }
    const saveChanges = () => {
      setUserName({ firstName, lastName });
    }

    content = (
      <>
        <ReactIcon src={<BiSolidUser className="user-info__img" />} color="#86a69d" />
        <div className="user-info__name">
          <h1 className="user-info__title">User profile</h1>
          <Input value={firstName} onChange={handleFirstNameInput}
            label={`First name${(data.firstName !== firstName) ? ' *' : ''}`} selected />
          <Input value={lastName} onChange={handleLastNameInput}
            label={`Last name${(data.lastName !== lastName) ? ' *' : ''}`} selected />
          <button className="button" onClick={saveChanges}>Save changes</button>
        </div>
      </>
    );
  }

  return (
    <div className="user-info">
      {content}
    </div>
  );
}

export default UserInfo;

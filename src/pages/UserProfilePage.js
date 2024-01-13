import UserInfo from '../components/user/UserInfo';
import UserPersonalList from '../components/user/UserPersonalList';

function UserProfilePage() {
  return (
    <div>
      <UserInfo />
      <UserPersonalList url="/moviesList" type="movie" title="Movies watchlist" />
      <UserPersonalList url="/seriesList" type="serie" title="Series watchlist" />
      <UserPersonalList url="/booksList" type="book" title="Books reading list" />
    </div>
  );
}

export default UserProfilePage;

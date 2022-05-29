import UsersContainer from '../containers/UsersContainer';
import UserContainer from '../containers/UserContainer';
import { Routes, Route } from 'react-router';

const UsersPage = () => {
  return (
    <>
      <UsersContainer />
      <Routes>
          <Route
            path=":id"
            element={<UserContainer/>}
        />
      </Routes>
    </>
  )
};

export default UsersPage;
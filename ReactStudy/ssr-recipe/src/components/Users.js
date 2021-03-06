import { Link } from 'react-router-dom';

const Users = ({ users }) => {
  if (!users) return null;  //  users가 없다면 아무것도 렌더링 하지 않는다.
  return (
    <div>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
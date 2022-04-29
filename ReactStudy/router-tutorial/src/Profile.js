import { useParams } from 'react-router';

const data = {
  juhyeon: {
    name: '오주현',
    description: '리액트를 배우고있는 개발자'
  },
  changmin: {
    name: '오창민',
    description: '동생'
  }
};

const Profile = () => {
  const { username } = useParams();
  const profile = data[username];
  if (!profile) {
    return <div>존재하지 않는 사용자입니다.</div>
  }
  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>
    </div>
  );
};

export default Profile;
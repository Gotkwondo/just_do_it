import { connect } from 'react-redux';
import Sample from '../component/Sample';
import { getPost, getUsers } from '../modules/sample';
import { useEffect } from 'react';

const SampleContainer = ({
  getPost,
  getUsers,
  post,
  users,
  loadingPost,
  loadingUsers
}) => {
  //  클래스 형태 컴포넌트였다면 componentDidMount
  useEffect(() => {
    getPost(1);
    getUsers(1);
  }, [getPost, getUsers]);
  return (
    <Sample
      post={post}
      users={users}
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
    />
  );
};

//  컴포넌트와 리덕스를 연동
export default connect(
  ({ sample }) => ({
    post: sample.post,
    users: sample.users,
    loadingPost: sample.loadingPost,
    loadingUsers: sample.loadingUsers
  }),
  {
    getPost,
    getUsers
  }
)(SampleContainer);
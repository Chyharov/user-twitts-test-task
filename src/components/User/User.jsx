import { useState, useEffect } from 'react';
import s from '../User/User.module.scss';

const User = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem('currentPage');
    return storedPage ? parseInt(storedPage) : 1;
  });
  const [usersPerPage] = useState(1);
  const [followers, setFollowers] = useState(() => {
    const followersFromStorage = localStorage.getItem('followers');
    if (followersFromStorage) {
      return JSON.parse(followersFromStorage);
    }
    return {};
  });

  const [following, setFollowing] = useState(() => {
    const followingFromStorage = localStorage.getItem('following');
    if (followingFromStorage) {
      return JSON.parse(followingFromStorage);
    }
    return {};
  });

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(`https://643d3605f0ec48ce9055e3aa.mockapi.io/api/v1/users?page=${page}&limit=${usersPerPage}`);
      const data = await response.json();
      setUsers(data);
    }
    fetchUsers();
  }, [page, usersPerPage]);

  const handleFollowClick = (id) => {
    setFollowers(followers => {
      const updatedFollowers = { ...followers };
      updatedFollowers[id] = !updatedFollowers[id];
      localStorage.setItem('followers', JSON.stringify(updatedFollowers));

      // update following state based on updated followers
      setFollowing(following => {
        const updatedFollowing = { ...following };
        updatedFollowing[id] = updatedFollowers[id] ? 'Following' : 'Follow';
        localStorage.setItem('following', JSON.stringify(updatedFollowing));
        return updatedFollowing;
      });

      return updatedFollowers;
    });
  };

  useEffect(() => {
    localStorage.setItem('following', JSON.stringify(following));
  }, [following]);

  useEffect(() => {
    localStorage.setItem('currentPage', page);
  }, [page]);

  return (
    <div className={s.userInfo}>
      {users.length ? (
        users.map(user => (
          <div key={user.id}>
            <div className={s.boaderCenter}></div>
            <div className={s.userEclips}>
              <img className={s.userAvatar} src={user.avatar} alt={user.user} />
            </div>
            <div className={s.userInfoList}>
              <p className={s.userTweets}>Tweets: {user.tweets}</p>
              <p className={s.userFollowers}>Followers: {user.followers + (followers[user.id] ? 1 : 0)}</p>
              <button className={s.FollowBtn} onClick={() => handleFollowClick(user.id)} style={{
                backgroundColor: followers[user.id] ? '#5CD3A8' : '#EBD8FF'
              }}>
                {following[user.id] || 'Follow'}
              </button>

            </div>
          </div>

        ))
      ) : (
        <div className={s.userEnded}>
          <div className={s.boaderCenter}></div>

          <div className={s.available}>
            <h1 className={s.availableMessage}>No users available</h1>
          </div>
          
        </div>
        
      )}
      
      <div className={s.pagination}>
        <button className={s.paginationBtn} onClick={() => setPage(page => page - 1)} disabled={page === 1}>Prev</button>
        <button className={s.paginationBtn} onClick={() => setPage(page => page + 1)} disabled={users.length < usersPerPage}>Next</button>
      </div>

    </div>
  );
}

export default User;

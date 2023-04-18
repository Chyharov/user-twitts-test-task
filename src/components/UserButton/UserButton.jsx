import React, { useState } from 'react';
import s from '../UserButton/UserButton.module.scss';

function UserButton() {
  const [following, setFollowing] = useState(false);

  const handleClick = () => {
    setFollowing(!following);
  };

  return (
    <button className={s.FollowBtn} onClick={handleClick} style={{
        backgroundColor: following ? '#5CD3A8' : '#EBD8FF'
      }}>
      {following ? 'Following' : 'Follow'}
    </button>
  );
}

export default UserButton;
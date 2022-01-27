import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [userStats, setUserStats] = useState(null);

  const logHandler = () => sessionStorage.clear();

  useEffect(() => {
    axios.get(`https://api.chess.com/pub/player/${sessionStorage.getItem('chessname')}`)
    .then(res => {
      res.data.last_online = new Date(res.data.last_online * 1000);
      res.data.joined = new Date(res.data.joined * 1000);
      setUserProfile(res.data);
    })
    .catch(err => {
      console.log(err);
    })

    axios.get(`https://api.chess.com/pub/player/${sessionStorage.getItem('chessname')}/stats`)
    .then(res => setUserStats(res.data))
    .catch(err => console.log(err))
  }, [])

  if (userStats && userProfile) {
    return (
    <>
    <div className='header'>
      <a href='/'>
        <h1>ChessHub</h1>
      </a>
      <div className='rightheader'>
        <a href='/profile' className='register'>Profile</a>
        <a href='/' className='logout' onClick={logHandler}>Logout</a>
      </div>
    </div>
    <div className='allwrapper'>
      <div className='profilewrapper'>
        <h2>Your Profile</h2>
        <div>
          {userProfile.avatar ? <img src={userProfile.avatar} alt='user avatar' id='searchedAvatar'/> : <i>No avatar</i>}
          <p>{userProfile.name}</p>
          <p>Followers: {userProfile.followers}</p>
          <p>Last Seen: {userProfile.last_online.toLocaleString()}</p>
          <p>Joined: {userProfile.joined.toLocaleString()}</p>
          <p>Plan: {userProfile.status}</p>
        </div>
      </div>
      <div className='statswrapper'>
      <h2>Your Stats</h2>
          {userStats.chess_daily ?
          <>
          <h3>Chess Daily Stats</h3>
            <p>Peak Rating: {userStats.chess_daily.best ? userStats.chess_daily.best.rating : 'Not Available'}</p>
            <p>Recent Rating: {userStats.chess_daily.last.rating}</p>
            <p>Winrate: {(userStats.chess_daily.record.win/(userStats.chess_daily.record.win+userStats.chess_daily.record.loss+userStats.chess_daily.record.draw))*100}%</p>
            </>
          : null}

          {userStats.chess_rapid ?
          <>
          <h3>Rapid Stats</h3>
            <p>Peak Rating: {userStats.chess_rapid.best ? userStats.chess_rapid.best.rating : 'Not Available'}</p>
            <p>Recent Rating: {userStats.chess_rapid.last ? userStats.chess_rapid.last.rating : 'Not available'}</p>
            <p>Winrate: {(userStats.chess_rapid.record.win/(userStats.chess_rapid.record.win+userStats.chess_rapid.record.loss+userStats.chess_rapid.record.draw))*100}%</p>
            </>
          :null}

          {userStats.chess_bullet ?
          <>
          <h3>Bullet Stats</h3>
            <p>Peak Rating: {userStats.chess_bullet.best ? userStats.chess_bullet.best.rating : 'Not Available'}</p>
            <p>Recent Rating: {userStats.chess_bullet.last ? userStats.chess_bullet.last.rating : 'Not Available'}</p>
            <p>Winrate: {(userStats.chess_bullet.record.win/(userStats.chess_bullet.record.win+userStats.chess_bullet.record.loss+userStats.chess_bullet.record.draw))*100}%</p>
            </>
          :null}

          {userStats.chess_blitz ?
          <>
          <h3>Blitz Stats</h3>
            <p>Peak Rating: {userStats.chess_blitz.best ? userStats.chess_blitz.best.rating : 'Not Available'}</p>
            <p>Recent Rating: {userStats.chess_blitz.last ? userStats.chess_blitz.last.rating : 'Not Available'}</p>
            <p>Winrate: {(userStats.chess_blitz.record.win/(userStats.chess_blitz.record.win+userStats.chess_blitz.record.loss+userStats.chess_blitz.record.draw))*100}%</p>
          </>
          :null}
      </div>
    </div>
    </>
    )
  } else {
    return <div>loading...</div>
  }
}
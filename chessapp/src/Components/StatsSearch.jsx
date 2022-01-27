import {useState} from 'react';
import axios from 'axios';

function StatsSearch(props) {
  const [stats, setStats] = useState(null);
  const [username, setUsername] = useState('');

  const statHandler = e => {
   setUsername(e.target.value)
  }

  const clickHandler = () => {
    axios.get(`https://api.chess.com/pub/player/${username}/stats`)
    .then(res => setStats(res.data))
    .catch(err => console.log(err))
  }

  return (
    <>
    <input type='text' onChange={statHandler}></input>
    <button onClick={clickHandler}>View Stats</button>
    {stats ?
    <>
    {stats.chess_daily ?
    <>
    <h3>Chess Daily Stats</h3>
      <p>Peak Rating: {stats.chess_daily.best.rating}</p>
      <p>Recent Rating: {stats.chess_daily.last.rating}</p>
      <p>Winrate: {(stats.chess_daily.record.win/(stats.chess_daily.record.win+stats.chess_daily.record.loss+stats.chess_daily.record.draw))*100}%</p>
      </>
    : null}

    {stats.chess_rapid ?
    <>
    <h3>Rapid Stats</h3>
      <p>Peak Rating: {stats.chess_rapid.best.rating}</p>
      <p>Recent Rating: {stats.chess_rapid.last.rating}</p>
      <p>Winrate: {(stats.chess_rapid.record.win/(stats.chess_rapid.record.win+stats.chess_rapid.record.loss+stats.chess_rapid.record.draw))*100}%</p>
      </>
    :null}

    {stats.chess_bullet ?
    <>
    <h3>Bullet Stats</h3>
      <p>Peak Rating: {stats.chess_bullet.best.rating}</p>
      <p>Recent Rating: {stats.chess_bullet.last.rating}</p>
      <p>Winrate: {(stats.chess_bullet.record.win/(stats.chess_bullet.record.win+stats.chess_bullet.record.loss+stats.chess_bullet.record.draw))*100}%</p>
      </>
    :null}

    {stats.chess_blitz ?
    <>
    <h3>Blitz Stats</h3>
      <p>Peak Rating: {stats.chess_blitz.best.rating}</p>
      <p>Recent Rating: {stats.chess_blitz.last.rating}</p>
      <p>Winrate: {(stats.chess_blitz.record.win/(stats.chess_blitz.record.win+stats.chess_blitz.record.loss+stats.chess_blitz.record.draw))*100}%</p>
      </>
    :null}
    </>

    : null}
    </>
  )
}

export default StatsSearch;
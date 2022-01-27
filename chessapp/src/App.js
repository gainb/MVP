import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import ProfileSearch from './Components/ProfileSearch.jsx';
import StatsSearch from './Components/StatsSearch.jsx';
import { Routes, Route } from "react-router-dom";
import Register from './Components/Register.jsx';
import Login from './Components/Login.jsx';
import Profile from './Components/Profile.jsx';

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setAuth(sessionStorage.getItem('userid'));
  },[])

  return (
    <>
    <Routes>
      <Route path='/' element={auth ? <Privpage /> : <Pubpage />} />
      <Route path='register' element={<Register />} />
      <Route path='login' element={<Login />} />
      <Route path='profile' element={<Profile />} />
    </Routes>
    </>
  );
}

function Pubpage() {
  const [searchedUser, setSearchedUser] = useState('');
  const [searchedInfo, setSearchedInfo] = useState(null);

  const infoBar = e => {
    setSearchedUser(e.target.value)
  }

  const searchHandler = () => {
    axios.get(`https://api.chess.com/pub/player/${searchedUser}`)
    .then(res => {
      res.data.last_online = new Date(res.data.last_online * 1000);
      res.data.joined = new Date(res.data.joined * 1000);
      setSearchedInfo(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <>
    <div className='header'>
      <a href='/'>
        <h1>ChessHub</h1>
      </a>
      <div className='rightheader'>
        <a href='/register' className='register'>Register</a>
        <a href='/login' className='login'>Login</a>
      </div>
    </div>
  <div className='bodycontainer'>
    <div className='searchBar'>
      <h2>Profile</h2>
      <input type='text' onChange={infoBar}></input>
      <button onClick={searchHandler}>View Profile</button>
      <ProfileSearch searchedInfo = {searchedInfo}/>
    </div>
    <div className='userInfo'>
      <h2>Stats</h2>
      <StatsSearch />
    </div>
  </div>
  <div className='puzzle'>
    <h2>Daily Puzzle</h2>
    <iframe style={{width: 400, height: 480}} src="https://www.chess.com/daily_puzzle" frameBorder="0" title='puzzle'></iframe>
  </div>
    </>
  )
}

function Privpage() {
  const [searchedUser, setSearchedUser] = useState('');
  const [searchedInfo, setSearchedInfo] = useState(null);

  const infoBar = e => {
    setSearchedUser(e.target.value)
  }

  useEffect(() => {
    console.log(sessionStorage.getItem('chessname'));
  })

  const searchHandler = () => {
    axios.get(`https://api.chess.com/pub/player/${searchedUser}`)
    .then(res => {
      res.data.last_online = new Date(res.data.last_online * 1000);
      res.data.joined = new Date(res.data.joined * 1000);
      setSearchedInfo(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const logHandler = () => sessionStorage.clear();

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
  <div className='bodycontainer'>
    <div className='searchBar'>
      <h2>Profile</h2>
      <input type='text' onChange={infoBar}></input>
      <button onClick={searchHandler}>View Profile</button>
      <ProfileSearch searchedInfo = {searchedInfo}/>
    </div>
    <div className='userInfo'>
      <h2>Stats</h2>
      <StatsSearch />
    </div>
  </div>
  <div className='puzzle'>
    <h2>Daily Puzzle</h2>
    <iframe style={{width: 400, height: 480}} src="https://www.chess.com/daily_puzzle" frameBorder="0" title='puzzle'></iframe>
  </div>
    </>
  )
}

export default App;

import {useState} from 'react';
import axios from 'axios';

function Register (props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [chessName, setChessName] = useState('');

  const typeHandler = e => {
    setUsername(e.target.value);
  }

  const passHandler = e => {
    setPassword(e.target.value);
  }

  const chessHandler = e => setChessName(e.target.value);

  const clickHandler = e => {
    e.preventDefault();
    axios.post('/regacc', {
      username: username,
      password: password,
      chessName: chessName
    })
    .then(res => window.location.href = '/')
    .catch(err => console.log(err));
  }

  return(
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
    <div className='registerForm'>
      <h2 className='registerText'>Register</h2>
      <form>
          <label htmlFor="fname">Username:</label><br></br>
          <input type="text" id="regname" name="username" onChange = {typeHandler}/><br></br>
          <label htmlFor="chessName">Chess.com Username:</label><br></br>
          <input type="text" id="chessName" name="chessName" onChange = {chessHandler}/><br></br>
          <label htmlFor="password">Password:</label><br></br>
          <input type="password" id="regpass" name="password" onChange = {passHandler}/><br></br>
          <input type='submit' onClick={clickHandler}></input>
      </form>
    </div>
    </>
  )
}

export default Register
import {useState} from 'react';
import axios from 'axios';

function Login (props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const typeHandler = e => setUsername(e.target.value)

  const passHandler = e => setPassword(e.target.value)

  const clickHandler = e => {
    e.preventDefault();
    axios.post('/login', {
      username: username,
      password: password
    })
    .then(res => {
      if (res.data.length === 0) {
        window.location.href = '/login';
      } else {
        sessionStorage.setItem('userid', res.data.userid);
        sessionStorage.setItem('chessname', res.data.chessname);
        console.log(res.data.userid);
        window.location.href = '/';
      }
    })
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
    <div className='loginForm'>
      <h2 className='loginText'>Log in</h2>
      <form>
          <label htmlFor="fname">Username:</label><br></br>
          <input type="text" id="regname" name="username" onChange = {typeHandler}/><br></br>
          <label htmlFor="password">Password:</label><br></br>
          <input type="password" id="regpass" name="password" onChange = {passHandler}/><br></br>
          <input type='submit' onClick={clickHandler} value='Login'></input>
      </form>
    </div>
    </>
  )
}

export default Login;
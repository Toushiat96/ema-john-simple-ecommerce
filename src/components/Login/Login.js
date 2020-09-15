import React, { useState, useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
firebase.initializeApp(firebaseConfig)

function Login() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''

  })
  
  const [LoggedInUser , SetLoggedInUser] = useContext(UserContext)
  const history = useHistory();
  const location = useLocation();
  
  let  { from } = location.state || { from: { pathname: "/" } };

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const signedInuser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInuser);
        //  console.log(displayName , email , photoURL);
      })

    // .cath(err =>{
    // console.log(err);
    // console.log(err.message);

    // })
  }

  const handleSignOut = () => {
    // console.log('sign out')
    firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          newUser: '',
          email: '',
          password: '',
          error: '',
          success: '',
          photo: ''

        }
        setUser(signedOutUser);

      })
  }
  const handleBlur = (e) => {
    //  console.log( e.target.name ,e.target.value);
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);

    }


    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const userInfo = { ...user };
      userInfo[e.target.name] = e.target.value;
      setUser(userInfo);
    }
  }
  const handleSubmit = (e) => {
    // console.log(user.email, user.password)
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user }
          newUserInfo.error = ''
          newUserInfo.success = true;
          setUser(newUserInfo);
         
          updateUserName(user.name);
        })
        .catch(error => {
          // Handle Errors here.
          const newUserInfo = { ...user }
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo)

          // ...
        });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user }
          newUserInfo.error = ''
          newUserInfo.success = true;
          setUser(newUserInfo);
          SetLoggedInUser(newUserInfo)
          history.replace(from);
          console.log('user created successfully ', res.user)


        })
        .catch(error => {
          const newUserInfo = { ...user }
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo)
        });

    }
    e.preventDefault();
  }
  const updateUserName = name => {

    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,

    }).then(function () {
      console.log(' User Name Update successfuly')
    }).catch(function (error) {
      console.log(error)
    });

  }
  return (
    <div style ={{textAlign:'center'}}>
      {
        user.isSignedIn ? <button onClick={handleSignOut}> Sign out</button> : <button onClick={handleSignIn}> Sign in</button>

      }
      {
        user.isSignedIn && <div>

          <p>Welcome : {user.name}</p>
          <p> Your Email is : {user.email}</p>
          <img src={user.photo} alt="" />

        </div>
      }
      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser"> New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Enter Your Name" />}
        <br />
        <input type="email" name="email" onBlur={handleBlur} placeholder=" Your Email Address" required />
        <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder="Enter your Password" required />
        <br />
        <input type="submit" value={newUser ? 'Sign Up ' : 'Sign in'} />
        <p style={{ color: "red" }}>{user.error}</p>
        {user.success && <p style={{ color: "green" }}>User {newUser ? 'created' : 'logged in'} create successfully</p>}
      </form>
    </div>
  );
}

export default Login;

import React, { Component } from 'react';
// import './App.css';
import { Button, Icon, Collapsible, CollapsibleItem, Row, Input } from 'react-materialize';
import Footer from './Images/Baby-Chicks-Icon6.png';
import Iconchick from './Images/icon.png';
import axios from 'axios';

class App extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
      email: "",
      password: "",
      show: false,
      submissions: [] 
    }

    this.toSignUp = this.toSignUp.bind(this)
    this.submit = this.submit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.toProfile = this.toProfile.bind(this)
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value
    const name = target.id;
    this.setState({
      [name]: value
    });
  }

  submit(e) {
    e.preventDefault()
    let email = document.getElementById("email").value
    console.log(this.state.email)
    localStorage.setItem("email",email)
    const promise = axios.post("/users", this.state);
    promise.then((result) => {
      console.log(result)
      if (result.data.match === false) {
        window.alert("Password or email incorrect, please try again")
        console.log("doesn't match")
      }
      else {
        this.props.router.push('/profile/' + this.state.email)
      }
    })
    promise.catch((error) => {
      console.log(error);
    });
  }

  toProfile() {
    this.props.router.push('/profile/' + this.state.email)
  }

  toSignUp() {
    this.props.router.push('/signup')
  }


  render() {
    return (
      <div
        className="App">
        {React.cloneElement(this.props.children, {
          email: this.state.email,
          submit: this.submit,
          signup: this.toSignUp,
          handleChange: this.handleChange,
          password: this.state.password,
          toProfile: this.toProfile,
          submission: this.state.submission
        })}
      </div>
    );
  }
}

export default App;

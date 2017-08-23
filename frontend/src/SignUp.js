import React, { Component } from "react";
// import defaultImage from './Images/Cat.JPG';
import './SignUp.css';
import { Row, Input, Icon, Button } from 'react-materialize';
import axios from 'axios';

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // name: this.props.params.userName || "",
            first: "",
            last: "",
            girl: "0",
            boy: "0",
            occupation: "",
            email: "",
            postal: "",
            city: "",
            phone: "",
            password: "",
            passwords: ""
        }
        this.handlesubmit = this.handlesubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.return = this.return.bind(this)
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value
        const name = target.id;
        this.setState({
            [name]: value
        });
    }

    handlesubmit(e) {
        e.preventDefault()
        let email = document.getElementById("email").value
        localStorage.setItem("email",email)
        console.log(this.state)
        //make the axios request to your server to create the information 
        const promise = axios.post("/users/signup", this.state);
        promise.then((result) => {
            console.log("success");
            console.log(result.data);
            if (result.data.userExist === true) {
                window.alert("User already exists, please go back and sign in.")
                this.props.router.push('/')
            }
            else {
                window.alert("Awesome! You're all signed up!")
                this.props.router.push('/profile/' + this.state.email)
            }
        });
        promise.catch((error) => {
            console.log(error);
        });
    }

    return() {
        this.props.router.push('/')
    }

    render() {
        return (
            <div>
                <div className="container">
                    <form onSubmit={(e) => { this.handlesubmit(e) }} type="submit">
                        <Row>
                            {/* <Input s={12} label="" validate disabled defaultValue={this.props.params.userName} /> */}
                            <Input
                                id="first"
                                required
                                label="First Name"
                                s={6}
                                value={this.state.first}
                                onChange={this.handleChange} />
                            <Input
                                id="last"
                                required
                                label="Last Name"
                                s={6}
                                value={this.state.last}
                                onChange={this.handleChange} />
                            <div
                                id="words"><p> How many children/child do you have?</p></div>
                            <div
                                id="girls">
                                <Icon right s={1}>child_care</Icon>
                                <Input id="girl" s={5} type='select' value={this.state.girl} onChange={this.handleChange} label="Girls?" defaultValue='0' required>
                                    <option value='0'>0 Girl</option>
                                    <option value="1">1 Girl</option>
                                    <option value="2">2 Girls</option>
                                    <option value="3">3 Girls</option>
                                    <option value="4">4 Girls</option>
                                    <option value="5">5 Girls</option>
                                    <option value="6">6 Girls</option>
                                </Input>
                            </div>
                            <div id="boys">
                                <Icon left s={1}>face</Icon>
                                <Input
                                    id="boy"
                                    s={5}
                                    type='select'
                                    value={this.state.boy}
                                    onChange={this.handleChange}
                                    label="Boys?"
                                    defaultValue='0'
                                    required>
                                    <option value='0'>0 Boy</option>
                                    <option value='1'>1 Boy</option>
                                    <option value='2'>2 Boys</option>
                                    <option value='3'>2 Boys</option>
                                    <option value='4'>4 Boys</option>
                                    <option value='5'>5 Boys</option>
                                    <option value='6'>6 Boys</option>
                                </Input>
                            </div>
                            <Input
                                id="city"
                                required
                                label="City"
                                s={6}
                                value={this.state.city}
                                onChange={this.handleChange} />
                            <Input
                                id="postal"
                                required
                                label="Postal Code"
                                s={6}
                                value={this.state.postal}
                                onChange={this.handleChange} />
                            <Input
                                id="occupation"
                                required
                                label="Occupation"
                                s={12}
                                value={this.state.occupation}
                                onChange={this.handleChange} />
                            <Input
                                id="email"
                                type="email"
                                label="Email"
                                s={6}
                                value={this.state.email}
                                onChange={this.handleChange}
                                required />
                            <Input
                                id="phone"
                                required
                                label="Phone Number"
                                s={6}
                                value={this.state.phone}
                                onChange={this.handleChange} />
                            <Input
                                id="password"
                                type="password"
                                required
                                label="Password"
                                s={6}
                                value={this.state.password}
                                onChange={this.handleChange} />
                            <Input
                                id="passwords"
                                type="password"
                                required
                                label="Password Confirm"
                                s={6}
                                value={this.state.passwords}
                                onChange={this.handleChange} />
                        </Row>
                        <Button
                            type="submit"
                            waves='light'>submit
                            <Icon left>child_friendly</Icon>
                        </Button>
                        <Button
                            id="back"
                            onClick={this.return}
                            waves='light'>
                            back
                                <Icon left>
                                navigate_before
                                </Icon>
                        </Button>

                    </form>



                </div>
                <div className="filler">
                </div>

            </div>
        )
    }
}

export default SignUp;
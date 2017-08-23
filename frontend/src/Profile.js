import React, { Component } from "react";
import defaultImage from './Images/Cat.JPG';
import './Profile.css';
import { Dropdown, Button, NavItem, Icon, Card, CardTitle, Table } from 'react-materialize';
import { Link } from 'react-router';
import Footer from './Images/Baby-Chicks-Icon6.png';
import Cat from './Images/cat-wallpaper.png';
import axios from 'axios';

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            verify: false,
            first: "",
            last: "",
            girl: "0",
            boy: "0",
            occupation: "",
            email: "",
            postal: "",
            city: "",
            phone: "",
            email: ""
        }
    }

    componentWillMount() {
        //make the axios request to your server to update the information this.props.params.email
        localStorage.getItem("email")
        this.setState({
            email: localStorage.getItem("email")
        }, () => {
            const promise = axios.get("/users/" + this.state.email, this.state);
            promise.then((result) => {
                console.log(result.data);
                console.log(result.data[0].email)
                this.setState({
                    email: result.data[0].email,
                    first: result.data[0].first,
                    last: result.data[0].last,
                    girl: result.data[0].girl,
                    boy: result.data[0].boy,
                    occupation: result.data[0].occupation,
                    postal: result.data[0].postal,
                    city: result.data[0].city,
                    phone: result.data[0].phone
                },
                    () => {
                        let name = this.state.first + " " + this.state.last
                        localStorage.setItem("name", name)
                        console.log(name)
                    })
                console.log(this.state.email1)
            }).catch((error) => {
                console.log(error);
            });
        })
    }

    render() {
        return (
            <div>
                <div className="profileBox">
                    <div id="dropdown">
                        <Dropdown trigger={
                            <Button><Icon small>settings</Icon>menu</Button>
                        }>
                            <NavItem>
                                <Link to={"/profile/" + this.state.email} >my Profile</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/myhours">my Hours</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/acceptedRequest">my Requests</Link>
                            </NavItem>
                            <NavItem divider />
                            <NavItem>
                                <Link to="/myrequest">Create Requests</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/mylist">All Requests</Link>
                            </NavItem>
                            <NavItem onClick={this.clear}>
                                Sign Out
                            </NavItem>
                        </Dropdown>
                    </div>
                    <div
                        className="profilePic">
                        <img
                            src={defaultImage}
                            alt="logo" />
                    </div>
                    <div
                        className="profile">
                        <div className="name">
                            {this.state.first} {this.state.last}
                        </div>
                        <div className="email">
                            {this.state.email}
                        </div>
                        <div className="area">
                            {this.state.city}
                        </div>
                        <div className="postal">
                            {this.state.postal}
                        </div>
                        <div className="kids">
                            {this.state.girl} baby girls and {this.state.boy} baby boys
                        </div>
                        <div className="work">
                            {this.state.occupation}
                        </div>
                        <div className="phone">
                            {this.state.phone}
                        </div>
                        <div className="id">
                            Government ID Verification:
                            <span id={(this.state.verify) === true ? "verified" : "notVerified"}>
                                <b> confirmed
                                <Icon>verified_user</Icon>
                                    <Icon>close</Icon></b></span>
                        </div>
                    </div>

                </div >

                <div className="commentBox">
                    Reviews
                </div>
            </div >
        )
    }
}

export default Profile;
import React, { Component } from "react";
// import defaultImage from './Images/Cat.JPG';
import './Profile.css';
import { Dropdown, Button, NavItem, Icon } from 'react-materialize';
import { Link } from 'react-router';
// import Footer from './Images/Baby-Chicks-Icon6.png';
// import Cat from './Images/cat-wallpaper.png';
import axios from 'axios';

class AcceptedRequest extends Component {
    constructor() {
        super()
        this.state = {
            verify: false,
            first1: "",
            last1: "",
            girl1: "0",
            boy1: "0",
            occupation1: "",
            email1: "",
            postal1: "",
            city1: "",
            phone1: ""
        }
    }


    render() {
        return (
                <div className="acceptedRequest">
                    <div id="dropdown">
                        <Dropdown trigger={
                            <Button><Icon small>settings</Icon>menu</Button>
                        }>
                            <NavItem>
                                <Link to="/profile">my Profile</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/myhours">my Hours</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/myList">my Requests</Link>
                            </NavItem>
                            <NavItem divider />
                            <NavItem>
                                <Link to="/myrequest">Create Requests</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/acceptedhours">All Requests</Link>
                            </NavItem>
                        </Dropdown>
                    </div>
            </div >
        )
    }
}

export default AcceptedRequest;
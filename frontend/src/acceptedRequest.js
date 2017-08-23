
import React, { Component } from "react";
// import defaultImage from './Images/Cat.JPG';
import './myRequest.css';
import { NavItem, Button, Icon, Dropdown } from 'react-materialize';
import { Link } from 'react-router';
// import axios from 'axios';

class myHours extends Component {
    constructor() {
        super()
        this.state = {
            verify: false,
            email:""

        }
    }

    componentWillMount() {
        localStorage.getItem("email")
        this.setState({
            email: localStorage.getItem("email")
        })
    }
    render() {
        return (
            <div className="hours">
                    <Dropdown trigger={
                        <Button
                            id="menu">
                            <Icon small>settings</Icon>menu
                    </Button>
                    }>
                        <NavItem>
                            <Link to={"/profile/" + this.state.email}>my Profile</Link>
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
                    </Dropdown>
                </div>
                )
    }
}

export default myHours;







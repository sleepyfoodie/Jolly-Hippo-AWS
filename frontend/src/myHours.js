
import React, { Component } from "react";
// import defaultImage from './Images/Cat.JPG';
import './myHours.css';
import { NavItem, Button, Icon, Dropdown } from 'react-materialize';
import { Link } from 'react-router';
import kid from './Images/construction.jpg';
// import axios from 'axios';

class myHours extends Component {
    constructor() {
        super()
        this.state = {
            verify: false,
            email:""

        }
        this.clear = this.clear.bind(this)
    }

    clear() {
        localStorage.setItem("name","")
        localStorage.setItem("email","")
        this.props.router.push('/')
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
                        <NavItem divider />
                        <NavItem>
                            <Link to="/myrequest">Create Requests</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/mylist">All Requests</Link>
                        </NavItem>
                        <NavItem onClick={this.clear}>
                            Logout
                        </NavItem>
                    </Dropdown>

                    <div className="big">
                        <img 
                            id="kid"
                            src={kid}
                            alt="under construction"
                        />

                        <h5 id="word">
                            under construction...
                        </h5>
                    </div>
                </div>
                )
    }
}

export default myHours;







import React, { Component } from "react";
// import defaultImage from './Images/Cat.JPG';
import './myRequest.css';
import { Row, Input, NavItem, Button, Icon, Dropdown } from 'react-materialize';
import { Link } from 'react-router';
import axios from 'axios';

class myRequest extends Component {
    constructor() {
        super()
        this.state = {
            verify: false,
            startDate: "",
            endDate: "",
            hourS: "11",
            minS: "00",
            amSpm: "am",
            hourE: "08",
            minE: "00",
            amEpm: "pm",
            boy: 0,
            girl: 0,
            postal: "",
            specialRequest: "",
            name:""
        }
        this.submit = this.submit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    submit(e) {
        let newName = localStorage.getItem("name")
        this.setState({
            name: newName
        },
        () => {
        console.log(this.state)
        e.preventDefault()
        console.log(this.state)
        //make the axios request to your server to create the information 
        const promise = axios.post("/requests", this.state);
        promise.then((result) => {
            window.alert("Awesome! Your request has been submitted")
            // this.props.router.push('/profile/' + this.state.email)
        });
        promise.catch((error) => {
            console.log(error);
        });
        })
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value
        const name = target.id;
        this.setState({
            [name]: value
        });
    }

    componentWillMount() {
        localStorage.getItem("email")
        this.setState({
            email: localStorage.getItem("email")
        })
    }

    render() {
        return (
            <div className="item">
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
                <div className="bigBox">
                    <div className="calendar">
                        <form
                            className="calendar"
                            type="submit"
                            onSubmit={(e) => { this.submit(e) }}>
                            {/* <div className="name">

                            </div> */}
                            <div className="dateBox">
                                <div
                                    id="icon">
                                    <Icon>insert_invitation</Icon>
                                </div>
                                <p>Select Dates:</p>
                            </div>
                            <div
                                id="start">
                                <Row>
                                    <Input
                                        id='startDate'
                                        placeholder="Start Date"
                                        type='date'
                                        onChange={this.handleChange}
                                        value={this.state.startDate} />
                                </Row>
                            </div>
                            <div
                                id="end"><Row>
                                    <Input
                                        id='endDate'
                                        placeholder="End Date"
                                        type='date'
                                        onChange={this.handleChange}
                                        value={this.state.endDate} />
                                </Row>
                            </div>
                            <div
                                className="timeSpot">
                                <div
                                    id="icon">
                                    <Icon>watch_later</Icon>
                                </div>
                                <p>Select time start:</p>
                            </div>
                            <div
                                className="time">
                                <div
                                    id="hour">
                                    <Row>
                                        <Input
                                            s={4}
                                            id="hourS"
                                            type='select'
                                            onChange={this.handleChange}
                                            value={this.state.hourS}
                                            label="Hour"
                                            defaultValue='01'>
                                            <option value='1'>01</option>
                                            <option value='2'>02</option>
                                            <option value='3'>03</option>
                                            <option value='4'>04</option>
                                            <option value='5'>05</option>
                                            <option value='6'>06</option>
                                            <option value='7'>07</option>
                                            <option value='8'>08</option>
                                            <option value='9'>09</option>
                                            <option value='10'>10</option>
                                            <option value='11'>11</option>
                                            <option value='12'>12</option>
                                        </Input>
                                    </Row>
                                </div>
                                <div
                                    id="min">
                                    <Row>
                                        <Input
                                            s={4}
                                            id="minS"
                                            type='select'
                                            onChange={this.handleChange}
                                            value={this.state.minS}
                                            label="Minute"
                                            defaultValue='00'>
                                            <option value='05'>05</option>
                                            <option value='10'>10</option>
                                            <option value='15'>15</option>
                                            <option value='20'>20</option>
                                            <option value='25'>25</option>
                                            <option value='30'>30</option>
                                            <option value='35'>35</option>
                                            <option value='40'>40</option>
                                            <option value='45'>45</option>
                                            <option value='50'>50</option>
                                            <option value='55'>55</option>
                                            <option value='00'>00</option>
                                        </Input>
                                    </Row>
                                </div>
                                <div
                                    id="ampm">
                                    <Row>
                                        <Input
                                            s={4}
                                            id="amSpm"
                                            type='select'
                                            onChange={this.handleChange}
                                            value={this.state.amSpm}
                                            label="AM/PM"
                                            defaultValue='am'>
                                            <option value='1'>am</option>
                                            <option value='2'>pm</option>
                                        </Input>
                                    </Row>
                                </div>
                            </div>
                            <div
                                className="timeSpot">
                                <div
                                    id="icon">
                                    <Icon>watch_later</Icon>
                                </div>
                                <p>Select time end:</p>
                            </div>
                            <div
                                className="time">
                                <div
                                    id="hour">
                                    <Row>
                                        <Input
                                            id="hourE"
                                            s={4}
                                            type='select'
                                            value={this.state.hourE}
                                            onChange={this.handleChange}
                                            label="Hour"
                                            defaultValue='01'>
                                            <option value='1'>01</option>
                                            <option value='2'>02</option>
                                            <option value='3'>03</option>
                                            <option value='4'>04</option>
                                            <option value='5'>05</option>
                                            <option value='6'>06</option>
                                            <option value='7'>07</option>
                                            <option value='8'>08</option>
                                            <option value='9'>09</option>
                                            <option value='10'>10</option>
                                            <option value='11'>11</option>
                                            <option value='12'>12</option>
                                        </Input>
                                    </Row>
                                </div>
                                <div
                                    id="min">
                                    <Row>
                                        <Input
                                            id="minE"
                                            s={4}
                                            type='select'
                                            value={this.state.minE}
                                            onChange={this.handleChange}
                                            label="Minute"
                                            defaultValue='00'>
                                            <option value='05'>05</option>
                                            <option value='10'>10</option>
                                            <option value='15'>15</option>
                                            <option value='20'>20</option>
                                            <option value='25'>25</option>
                                            <option value='30'>30</option>
                                            <option value='35'>35</option>
                                            <option value='40'>40</option>
                                            <option value='45'>45</option>
                                            <option value='50'>50</option>
                                            <option value='55'>55</option>
                                            <option value='00'>00</option>
                                        </Input>
                                    </Row>
                                </div>
                                <div
                                    id="ampm">
                                    <Row>
                                        <Input
                                            id="amEpm"
                                            s={4}
                                            type='select'
                                            value={this.state.amEpm}
                                            onChange={this.handleChange}
                                            label="AM/PM"
                                            defaultValue='am'>
                                            <option value='1'>am</option>
                                            <option value='2'>pm</option>
                                        </Input>
                                    </Row>
                                </div>
                            </div>
                            <div>
                                <Input
                                    id="postal"
                                    label="Postal Code"
                                    value={this.state.postal}
                                    onChange={this.handleChange}
                                    s={12} />
                            </div>
                            <div
                                id="special">
                                <textarea
                                    id="specialRequest"
                                    value={this.state.specialRequest}
                                    onChange={this.handleChange}
                                    type="submit"
                                    placeholder="Comments/Special Requests..."
                                    id="specialRequest">
                                </textarea>
                            </div>
                        <Button
                            id="submit"
                            type="submit">
                            <Icon id="fix" small>wb_sunny</Icon>
                            submit
                        </Button>
                        </form>
                    </div>
                    <div
                        className="blob">
                        <p><b><Icon>input</Icon>Create Requests Friendly Set by Step Instructions</b></p>
                        <p>1) Choose a start date and an end date</p>
                        <p>2) Choose the hours during the days when you need a sitter</p>
                        <p>3) Please be courteous and mindful and set hours to a minimum of 3 hours per sitting</p>
                        <p>4) Enter your postal code so potential sitters can gage your area</p>
                        <p>5) Please give a brief descriptio of your kids in the comment section. Remember, the more parents can know about your child's personality, the higher likelihood they will take on a request.</p>
                        <p>6) You may also submit any special requests or comments below.</p>
                        <p>7) Click <Icon>wb_sunny</Icon>"SUBMIT" on form and wait for confirmation</p>
                        <Button onClick={this.props.toProfile}>cancel</Button>
                    </div>
                </div>

            </div>
        )
    }
}

export default myRequest;
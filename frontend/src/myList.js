import React, { Component } from 'react';
import './myList.css';
import { NavItem, Dropdown, Button, Icon, Collapsible, CollapsibleItem, Input } from 'react-materialize';
import Cat from './Images/Cat.JPG';
import { Link } from 'react-router';
import axios from 'axios';
import list1 from './Images/list1.jpg';
import list2 from './Images/list2.jpg';
import list3 from './Images/list3.jpg';



class MyList extends Component {

    constructor() {
        super()
        this.state = {
            open: false,
            data: [],
            name: "",
            email: "",
            submission: {}
        }
        this.clear = this.clear.bind(this)
        this.submit = this.submit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    //function that gets triggered when submit button is pressed. my goal is to have the "checked" divs stored inside "submissions"
    submit(e) {
        e.preventDefault()
        let newSub = this.state.data[this.state.submission]
        console.log(newSub)
        this.setState({
            submission: newSub
        })
    }

    //onchange handler
    onChange(e) {
        // copy this.state.data
        // change value of this.state.data[e] to true or false ( opposite of its current value )
        // setState with new array
        console.log(e)
        const newSub = {}
        this.setState({
            submission: e
        }, () => {
            console.log(this.state.submission)
        })
    }

    //function for logging out
    clear() {
        localStorage.setItem("name", "")
        localStorage.setItem("email", "")
        this.props.router.push('/')
    }

    //this grabs the name and email from localstorage, and grabs stuff from database to fill the list of "babysitting requests"
    componentWillMount() {
        var newName = localStorage.getItem("name")
        var newEmail = localStorage.getItem("email")
        const promise = axios.get("/requests")
        promise.then((result) => {
            this.setState({
                data: result.data,
                name: newName,
                email: newEmail,
                check: false
            })
        });
        promise.catch((error) => {
            console.log(error);
        })
    }

    render() {
        //this maps out each request from the database as an array
        let data = this.state.data.map((items, i) => {
            return (
                <div>
                    <div key={i}>
                        {/* collapsible is part of materialize react */}
                        <Collapsible popout defaultActiveKey={1}>
                            <CollapsibleItem header={items.startDate + " to " + items.endDate} icon='filter_drama'>
                                <div><b>Times:</b> {items.hourS}:{items.minE}{items.amSpm} to {items.hourE}:{items.minE}{items.amEpm}</div>
                                <div><b>Location:</b> {items.postal}</div>
                                <div><b>Number of Boys: </b> {items.boy}</div>
                                <div><b>Number of Girls: </b>{items.girl}</div>
                                <div><b>Comments</b> {items.specialRequest}</div>
                                {/* <p><img id="pic"
                                    src={Cat} /></p> */}
                                {/* checkbox underneath here */}
                                <Input
                                    name='take'
                                    type='checkbox'
                                    id="submit"
                                    //not entirely sure if this value matters...
                                    value={items.check}
                                    //onChange={() => { this.onChange(i) }}
                                    label='take this request' />
                            </CollapsibleItem>
                        </Collapsible>
                    </div>
                </div>
            )
        })
        console.log(this.state)
        return (
            <div className="List">
                {/* this is just the drop down menu on the page */}
                <Dropdown trigger={
                    <Button id="menu">
                        <Icon small>settings</Icon>menu
                    </Button>
                }>
                    <NavItem>
                        <Link to="/profile/:email">my Profile</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/myhours">my Hours</Link>
                    </NavItem>
                    <NavItem divider />
                    <NavItem>
                        <Link to="/myrequest">Create Requests</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/myList">All Requests</Link>
                    </NavItem>
                    <NavItem onClick={this.clear}>
                        Logout
                    </NavItem>
                </Dropdown>

                {/* here's the form. the mapped array of data is wrapped inside a div, which is wrapped inside a form...  */}
                <form onSubmit={this.submit}>
                    <div className="data" value='submit'>
                        {data}
                    </div>
                    <Button id="submit">
                        {/* onSubmit={this.submit} */}
                        submit
                    </Button>
                </form>

                <div className="data">
                    <Collapsible popout defaultActiveKey={1}>
                        <CollapsibleItem header="coming soon..." icon='filter_drama'>
                        Phase 2 coming soon
                            <p><img id="pic"
                                src={Cat} /></p>
                        </CollapsibleItem>
                    </Collapsible>

                </div>
                
            </div>
        );
    }
}

export default MyList;

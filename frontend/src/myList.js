import React, { Component } from 'react';
import './myList.css';
import { NavItem, Dropdown, Button, Icon, Collapsible, CollapsibleItem, Input } from 'react-materialize';
import Cat from './Images/Cat.JPG';
// import Footer from './Images/Baby-Chicks-Icon6.png';
// import Iconchick from './Images/icon.png';
import { Link } from 'react-router';
import axios from 'axios';
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time



class MyList extends Component {
    eventLogger = (e: MouseEvent, data: Object) => {
        console.log('Event: ', e);
        console.log('Data: ', data);
    };

    constructor() {
        super()
        this.state = {
            open: false,
            data: [],
            name: "",
            email: ""
        }
    }

    componentWillMount() {
        var newName = localStorage.getItem("name")
        var newEmail = localStorage.getItem("email")
        const promise = axios.get("/requests")
        promise.then((result) => {
            this.setState({
                data: result.data,
                name: newName,
                email: newEmail
            })
        });
        promise.catch((error) => {
            console.log(error);
        })
    }

    render() {
        let data = this.state.data.map((items, i) => {
            return (
                <div>
                    <div key={i}>
                        <Collapsible popout defaultActiveKey={1}>
                            <CollapsibleItem header={"from " + items.startDate + " to " + items.endDate} icon='filter_drama'>
                                <div>From {items.hourS}:{items.minE}{items.amSpm} to {items.hourE}:{items.minE}{items.amEpm}</div>
                                <div>Location: {items.postal}</div>
                                <div>I have {items.boy} boys and {items.girl} girls</div>
                                <div>{items.specialRequest}</div>
                                <p><img id="pic"
                                    src={Cat} /></p>
                                <Input
                                    name='take'
                                    type='checkbox'
                                    value='red'
                                    label='I want take this request' />
                            </CollapsibleItem>
                        </Collapsible>
                    </div>
                </div>
            )
        })
        let eggArray = ["eggOne", "eggTwo", "eggThree", "eggFour", "eggFive"]
        let array = eggArray.map((eggs, i) => {
            return (
                <div key={i}>
                    <Draggable>
                        <div
                            axis="x"
                            handle=".handle"
                            defaultPosition={{ x: 0, y: 0 }}
                            position={null}
                            grid={[25, 25]}
                            onStart={this.handleStart}
                            onDrag={this.handleDrag}
                            onStop={this.handleStop}
                            className="egg"
                            id={eggs}>
                        </div>
                    </Draggable>
                </div>
            )
        })

        return (
            <div className="List">
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
                    <NavItem>
                        <Link to="/AcceptedRequest">my Requests</Link>
                    </NavItem>
                    <NavItem divider />
                    <NavItem>
                        <Link to="/myrequest">Create Requests</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/myList">All Requests</Link>
                    </NavItem>
                </Dropdown>

                {array}

                <div className="data">
                    {data}
                </div>


            </div>
        );
    }
}

export default MyList;

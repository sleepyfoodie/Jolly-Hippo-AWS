import React, { Component } from 'react';
import './home.css';
import { Button, Icon, Collapsible, CollapsibleItem, Row, Input } from 'react-materialize';
import Footer from './Images/Baby-Chicks-Icon6.png';
import Iconchick from './Images/icon.png';
import axios from 'axios';
import chickA from './Images/chick1.png';
import chickB from './Images/chick2.png';
import chickC from './Images/chick3.png';

class Home extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
            email: "",
            password: "",
            show: false
        }
    }


    render() {
        return (
            <div
                className="App">

                <div className="App-header">
                    <img
                        src={Iconchick}
                        className="App-logo"
                        alt="logo" />
                    <h2
                        className="pulse">Jolly Hippo</h2>
                    <h5>Let's help each other... <Icon>favorite</Icon></h5>

                    <div className="signIN">
                        <Collapsible popout>
                            <CollapsibleItem
                                header="Let's Begin"
                                icon='favorite'>
                                <form
                                    type="submit"
                                    onSubmit={(e) => { this.props.submit(e) }}>
                                    <Row>
                                        <Input
                                            id="email"
                                            value={this.props.email}
                                            onChange={this.props.handleChange}
                                            s={6} label="Email"
                                            validate type="email">
                                            <Icon>account_circle</Icon>
                                        </Input>
                                        <Input
                                            id="password"
                                            value={this.props.password}
                                            onChange={this.props.handleChange}
                                            s={6}
                                            label="Password"
                                            validate type='password'>
                                            <Icon>lock_open</Icon>
                                        </Input>
                                    </Row>
                                    <div className="buttons">
                                        <Icon
                                            s={1}>lock_open</Icon>
                                        <Button
                                            className="button"
                                            type="submit"
                                            waves='light'>Login
                                        </Button>
                                    </div>
                                </form>
                                <div className="buttons">
                                    <Icon
                                        s={1}>account_circle
                                    </Icon>
                                    <Button
                                        onClick={this.props.signup}
                                        className="button"
                                        type="submit"
                                        waves='light'>Sign Up
                                    </Button>
                                </div>
                                <p></p>
                                <Input
                                    name='group1'
                                    type='checkbox'
                                    value='red'
                                    label='Remember Me' />
                            </CollapsibleItem>
                        </Collapsible>

                    </div>

                    {/* <img
                        src={Footer}
                        alt="footer"
                        className="footer" /> */}
                    <div className="end">
                        <img
                            src={chickA}
                            alt="chick"
                            className="footer A" />
                        <img
                            src={chickB}
                            alt="chick"
                            className="footer B" />
                        <img
                            src={chickC}
                            alt="chick"
                            className="footer C" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;

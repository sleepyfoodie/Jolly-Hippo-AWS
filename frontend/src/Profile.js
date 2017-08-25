import React, { Component } from "react";
import defaultImage from './Images/Cat.JPG';
import './Profile.css';
import { Dropdown, Button, NavItem, Icon, Card, CardTitle, Table } from 'react-materialize';
import { Link } from 'react-router';
import Footer from './Images/Baby-Chicks-Icon6.png';
import Cat from './Images/cat-wallpaper.png';
import axios from 'axios';
import child1 from './Images/child1.jpg';
import child2 from './Images/child2.jpg';
import child3 from './Images/child3.jpg';
import child4 from './Images/child4.jpg';
import child5 from './Images/child5.jpg';

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
        this.clear = this.clear.bind(this)
    }

    clear() {
        localStorage.setItem("email", "")
        localStorage.setItem("name", "")
        this.props.router.push('/')
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
        const photo = [child1, child2, child3, child4, child5];
        var index = Math.floor((Math.random() * photo.length))
        return (
            <div className="content">
                <Card className='small'
                    header={<CardTitle image={photo[index]}>{this.state.first} {this.state.last}</CardTitle>}
                    actions={[<a href='#'>..</a>]}>
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
                            <NavItem divider />
                            <NavItem>
                                <Link to="/myrequest">Create Requests</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/mylist">All Requests</Link>
                            </NavItem>
                            <NavItem
                                onClick={this.clear}>Logout
                        </NavItem>
                        </Dropdown>
                    </div>
                    <div className="boxy">
                        <div className="profileBox">
                            <div id="pic">
                                <div className="profilePic">
                                    <img
                                        src={defaultImage}
                                        alt="cat person" />
                                </div>
                            </div>
                            <div className="profile">

                                <Table>
                                    <thead>
                                        <tr>
                                            <th data-field="id"><h4>Personal</h4></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td><h5>Name:</h5></td>
                                            <td><h5>{this.state.first} {this.state.last}</h5></td>
                                        </tr>
                                        <tr>
                                            <td><h5>Area:</h5></td>
                                            <td><h5>{this.state.city}</h5></td>
                                        </tr>
                                        <tr>
                                            <td><h5>Postal Code:</h5></td>
                                            <td><h5>{this.state.postal}</h5></td>
                                        </tr>
                                        <tr>
                                            <td><h5>Kids:</h5></td>
                                            <td><h5>{this.state.girl} girls and {this.state.boy} boys</h5></td>
                                        </tr>
                                        <tr>
                                            <td><h5>Occupation:</h5></td>
                                            <td><h5>{this.state.occupation}</h5></td>
                                        </tr>
                                        <tr>
                                            <td><h5>ID Verification</h5></td>
                                            <td><h5
                                                id={(this.state.verify) === true ? "verified" : "notVerified"}>
                                                Not Verified
                                                <Icon>verified_user</Icon>
                                                <Icon>close</Icon></h5>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th data-field="id"><h4>Contact</h4></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td><h5>Phone:</h5></td>
                                            <td><h5>{this.state.phone}</h5></td>
                                            <td>*</td>
                                        </tr>
                                        <tr>
                                            <td><h5>Email:</h5></td>
                                            <td><h5>{this.state.email}</h5></td>
                                            <td>*</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>

                        <div className="about">
                            <div className="reviews">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th data-field="id"><h4>Reviews</h4></th>
                                        </tr>
                                    </thead>
                                </Table>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In bibendum dolor scelerisque, convallis lectus sed, tincidunt lectus. Aenean laoreet augue id sapien viverra pulvinar. Nunc fermentum lacus in erat efficitur dignissim. Morbi auctor nunc magna, eget facilisis massa consequat nec. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed convallis at leo nec ornare. Phasellus sagittis dui a velit suscipit, at commodo lacus sodales. Vivamus nec efficitur urna. Pellentesque lacinia, sem vel sodales aliquet, odio ligula mattis tellus, eu sodales lacus dolor at nulla. Nullam iaculis purus eu rutrum fringilla.

Sed vestibulum lacus mi, sed ultrices nunc tincidunt efficitur. Quisque consectetur consequat sem, a congue lectus vehicula ac. Quisque fringilla lectus ac luctus mollis. Sed vel ultricies orci, sit amet imperdiet elit. Etiam hendrerit, eros quis mollis efficitur, ante eros cursus nulla, nec commodo neque massa in quam. In et nulla vehicula, eleifend sapien at, ullamcorper lectus. Vestibulum risus est, fermentum vel neque non, placerat fringilla nisl.

Praesent erat dui, ultricies in mauris non, maximus fermentum mi. Suspendisse nec vulputate sem. Sed tincidunt sollicitudin risus a tincidunt. Phasellus hendrerit ultrices risus quis ultricies. Phasellus id velit odio. Suspendisse semper sem eget ultrices ultricies. Pellentesque sagittis sapien tortor, facilisis semper nibh commodo non. Nullam id porttitor est. Ut vitae dui sed dui semper venenatis eget in nunc. Sed quis magna laoreet, hendrerit lacus in, congue leo. Fusce iaculis tincidunt urna non dictum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dignissim mi vitae felis rhoncus, porta eleifend arcu mollis. Pellentesque condimentum quam sit amet neque cursus, id malesuada tortor porta. Aenean congue, erat a consequat elementum, dui lacus facilisis turpis, quis efficitur tortor sapien et felis. Sed blandit ipsum dolor, sit amet dignissim dolor finibus eu.

Aliquam ut turpis sit amet tellus lobortis fringilla quis ut purus. Etiam ultricies ex eget nisi ullamcorper, ac condimentum eros facilisis. Fusce aliquam pulvinar lacinia. Aenean sed elit ac dui ullamcorper sodales. Aliquam sodales, diam sed venenatis viverra, nibh risus ullamcorper nisl, at molestie nulla est vel tortor. Aliquam tempus magna nec ullamcorper malesuada. Donec consequat nunc sed ultrices malesuada.

Sed quis odio sed sem cursus posuere. Suspendisse volutpat pharetra hendrerit. In at tincidunt elit, ut rhoncus ipsum. Donec sed dui quam. Praesent blandit molestie dictum. Duis at nisi in tortor faucibus lacinia. Nam velit lorem, semper nec nibh quis, sagittis mollis sapien. Aliquam non gravida sem. Donec porttitor ut magna nec porttitor.
                        </div>
                            <div className="work">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th data-field="id"><h4>Experience</h4></th>
                                        </tr>
                                    </thead>
                                </Table>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In bibendum dolor scelerisque, convallis lectus sed, tincidunt lectus. Aenean laoreet augue id sapien viverra pulvinar. Nunc fermentum lacus in erat efficitur dignissim. Morbi auctor nunc magna, eget facilisis massa consequat nec. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed convallis at leo nec ornare. Phasellus sagittis dui a velit suscipit, at commodo lacus sodales. Vivamus nec efficitur urna. Pellentesque lacinia, sem vel sodales aliquet, odio ligula mattis tellus, eu sodales lacus dolor at nulla. Nullam iaculis purus eu rutrum fringilla.

Sed vestibulum lacus mi, sed ultrices nunc tincidunt efficitur. Quisque consectetur consequat sem, a congue lectus vehicula ac. Quisque fringilla lectus ac luctus mollis. Sed vel ultricies orci, sit amet imperdiet elit. Etiam hendrerit, eros quis mollis efficitur, ante eros cursus nulla, nec commodo neque massa in quam. In et nulla vehicula, eleifend sapien at, ullamcorper lectus. Vestibulum risus est, fermentum vel neque non, placerat fringilla nisl.

Praesent erat dui, ultricies in mauris non, maximus fermentum mi. Suspendisse nec vulputate sem. Sed tincidunt sollicitudin risus a tincidunt. Phasellus hendrerit ultrices risus quis ultricies. Phasellus id velit odio. Suspendisse semper sem eget ultrices ultricies. Pellentesque sagittis sapien tortor, facilisis semper nibh commodo non. Nullam id porttitor est. Ut vitae dui sed dui semper venenatis eget in nunc. Sed quis magna laoreet, hendrerit lacus in, congue leo. Fusce iaculis tincidunt urna non dictum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dignissim mi vitae felis rhoncus, porta eleifend arcu mollis. Pellentesque condimentum quam sit amet neque cursus, id malesuada tortor porta. Aenean congue, erat a consequat elementum, dui lacus facilisis turpis, quis efficitur tortor sapien et felis. Sed blandit ipsum dolor, sit amet dignissim dolor finibus eu.

Aliquam ut turpis sit amet tellus lobortis fringilla quis ut purus. Etiam ultricies ex eget nisi ullamcorper, ac condimentum eros facilisis. Fusce aliquam pulvinar lacinia. Aenean sed elit ac dui ullamcorper sodales. Aliquam sodales, diam sed venenatis viverra, nibh risus ullamcorper nisl, at molestie nulla est vel tortor. Aliquam tempus magna nec ullamcorper malesuada. Donec consequat nunc sed ultrices malesuada.

Sed quis odio sed sem cursus posuere. Suspendisse volutpat pharetra hendrerit. In at tincidunt elit, ut rhoncus ipsum. Donec sed dui quam. Praesent blandit molestie dictum. Duis at nisi in tortor faucibus lacinia. Nam velit lorem, semper nec nibh quis, sagittis mollis sapien. Aliquam non gravida sem. Donec porttitor ut magna nec porttitor.
                        </div>
                        </div>
                    </div>
                </Card>

            </div >
        )
    }
}

export default Profile;
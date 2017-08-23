import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Profile from './Profile';
import MyRequest from './myRequest';
import SignUp from './SignUp';
import MyHours from './myHours';
import AcceptedRequest from './acceptedRequest';
import MyList from './myList';
import Home from './home';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="/profile/:email" component={Profile} />
            <Route path="/myrequest" component={MyRequest} />
            <Route path="/signup" component={SignUp} />
            <Route path="/acceptedrequest" component={AcceptedRequest} />
            <Route path="/myhours" component={MyHours} />
            <Route path="/mylist" component={MyList} />
        </Route>
    </Router>, document.getElementById('root'));
registerServiceWorker();
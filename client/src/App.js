import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Login from './components/Auth/Login/Login';
import Signup from './components/Auth/Signup/Signup';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Menu />
                <p
                    style={{
                        display: 'flex',
                        alignContent: 'center',
                        justifyContent: 'center',
                    }}>
                    Node commerce front end
                </p>
                <Switch>
                    <Route path="/" exact component={() => <div>Home</div>} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;

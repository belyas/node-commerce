import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Login from './components/Auth/Login/Login';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Menu />
                <Switch>
                    <Route path="/" exact component={() => <div>Home</div>} />
                    <Route path="/login" component={Login} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;

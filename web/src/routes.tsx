import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import EventsMap from './pages/EventsMap';
import Landing from './pages/Landing';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/events" component={EventsMap} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
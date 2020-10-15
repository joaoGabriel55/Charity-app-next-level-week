import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import EventsMap from './pages/EventsMap';
import CharityEvent from './pages/CharityEvent';
import CreateCharityEvent from './pages/CreateCharityEvent';
import Landing from './pages/Landing';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/events" exact component={EventsMap} />

                <Route path="/events/create" exact component={CreateCharityEvent} />
                <Route path="/events/:id" exact component={CharityEvent} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
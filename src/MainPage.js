import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";



class MainPage extends React.Component{

    state = {
        
    }
    
    render(){
            return (
                <Router>
                    <div>
                        <div>
                            <Link to="/">Profile</Link>
                        </div>
                        <Switch>
                            <Route path='/songs/:id'>
                                {this.state.loadedAll ? this.renderPage() : null}
                            </Route>
                            <Route path='/' exact>
                                {this.state.loadedAll ? this.renderProfile() : null}
                            </Route>
                        </Switch>
                        
                    </div>
                </Router>
               
            )
    }

}

export default MainPage;
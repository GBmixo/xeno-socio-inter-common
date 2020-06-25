import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import GameCanvas from './Components/GameCanvas.js';
//import TrackCanvas from './Components/TrackCanvas.js';


class MainPage extends React.Component{

    state = {
        everythingLoaded: true,
        levels: {
            seattle:{
                //This is generally what I'm imagining the level-object structure is going to be like
                //This information should be enough to render an image on the canvas with a spot to look out for
                pikePlaceMarket:[
                    {name: "testObject", position: "12 14", size: "360 20", sprite: "?"},
                    {name: "testObject2", position: "100 20", size: "40 400", sprite: "?"},
                    {name: "Clark", position: "300 122", size: "90 200", sprite: "?", context: "talk"}
                ]
            }
        },
        worldState: {
            //I'm using the state here to store the player's location
            currentCity: "seattle",
            currentSpot: "pikePlaceMarket",
            //These aren't permanent or set in stone but for testing interactions and how they are recorded
            peopleTalkedTo: 0,
            informationCollected: 0,
            testObjectIntereacted: false
        }
    }

    handleClick = (index, context) => {
        let worldState = this.state.worldState;
        let levels = this.state.levels;
        console.log(levels[worldState.currentCity][worldState.currentSpot][index])
        console.log(context);
    }

    renderCanvas(){
        //This uses the current city and spot within the city to navigate the levels object and find the objects to put onscreen
        let levelObjects = this.state.levels [this.state.worldState.currentCity] [this.state.worldState.currentSpot];

        return(
            <div>
                < GameCanvas onClick={this.handleClick} levelObjects={levelObjects} />
            </div>
        );
    }
    
    render(){
            return (
                <Router>
                    <div>
                        <div>
                            <Link to="/">Main</Link>
                        </div>
                        <Switch>
                            <Route path='/' exact>
                                {this.state.everythingLoaded ? this.renderCanvas() : null}
                            </Route>
                        </Switch>
                        
                    </div>
                </Router>
            )
    }

}

export default MainPage;
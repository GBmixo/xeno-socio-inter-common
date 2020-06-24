import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import GameCanvas from './Components/GameCanvas.js';
import Dialog from './Containers/Dialog.js'


class MainPage extends React.Component{

    //Could a container component replace most of state?
    state = {
        everythingLoaded: true,
        levels: {
            seattle:{
                //This is generally what I'm imagining the level-object structure is going to be like
                //This information should be enough to render an image on the canvas with a spot to look out for
                pikePlaceMarket:[
                    //{name: "testObject", position: "12 140", size: "360 20", sprite: "?"},
                    {name: "testObject2", position: "100 20", size: "40 400", sprite: "?"},
                    {name: "Clark", position: "300 122", size: "90 200", sprite: "?", context: "talk", color: "#FFFFFF"}
                ]
            }
        },
        worldState: {
            //I'm using the state here to store the player's location
            currentCity: "seattle",
            currentSpot: "pikePlaceMarket",
            //this sets the dialog appearing onscreen
            dialogBox: [],
            dialogCurrent: -1,
            //These aren't permanent or set in stone but for testing interactions and how they are recorded
            peopleTalkedTo: 0,
            informationCollected: 0,
            testObjectIntereacted: false
        }
    }

    handleClick = (index, context) => {
        //readability variables
        let worldState = this.state.worldState;
        let levels = this.state.levels;
        //Finds the object in the state by the given index
        let object = levels[worldState.currentCity][worldState.currentSpot][index];
        if(context == "talk"){
            //runs the npcTalk script
            this.npcTalk(object);
        }
    }

    npcTalk = (object, specs=null) => {

        //prepares shortened variable for readability
        let oldState = this.state;
        //unrender and wait until state is updated
        oldState.everythingLoaded = false;
        this.setState(oldState);

        //Finds the dialog array in the Dialog object file and sets it as the dialogBox
        oldState.worldState.dialogBox = Dialog(object.name, specs);
        //If there's a dialog line at the next index to render...
        if(oldState.worldState.dialogBox[oldState.worldState.dialogCurrent + 1]){
            console.log(oldState.worldState.dialogCurrent)

            //add 1 to the current dialog index
            oldState.worldState.dialogCurrent += 1;

        //if there isn't any lines next...
        }else{
            console.log('no more lines')
            //reset the values to go back
            oldState.worldState.dialogCurrent = -1;
            oldState.worldState.dialogBox = [];
        }
        
        //gives the okay for the element to re-render
        oldState.everythingLoaded = true;
        this.setState(oldState);
        //console.log(this.state);
    }

    renderCanvas(){
        //This uses the current city and spot within the city to navigate the levels object and find the objects to put onscreen
        let levelObjects = this.state.levels [this.state.worldState.currentCity] [this.state.worldState.currentSpot];

        return(
            <div>
                < GameCanvas key={GameCanvas} onClick={this.handleClick} levelObjects={levelObjects} worldState={this.state.worldState} fuck={this.state.fuck} />
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
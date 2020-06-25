import React from 'react';

import Alien from '../alien-mirror/side-2.png'
import Pike from '../other-images/pike_place.jpg'
import CheckClickCollision from './CheckClickCollision.js';


class GameCanvas extends React.Component{

    componentDidMount = () => {
        //Renders the canvas with game objects
        this.prepareCanvasObjects();
    }

    prepareCanvasObjects = () => {
        //The reference to the canvas and other info tied to variables
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        const rect = canvas.getBoundingClientRect();
        var bg = new Image()

        bg.onload = function () {
            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        // THIS NEEDS TO GO SOMEWHERE ELSE
            loadAlien()
        };


        //LIGHTSWITCH
        bg.src = Pike
        this.setBackground(canvas, bg);
        
        
        //this gets an image on the canvas on load
        var loadAlien = function (){
            var context = canvas.getContext('2d');
            var image = new Image();
            image.onload = function () {
                //this is the coordinates to talk to starbucks 
                context.drawImage(image, 700, 270, canvas.width/8, canvas.height/4);
            };
            image.src = Alien;
            
        }
        
        
        
        
        //This is the event listener for the clicks that check for collision with game elements
        canvas.addEventListener('click', e => {
            let object = {};
            //Finds the difference from the (0, 0) of the canvas
            object.x = (e.clientX - rect.left);
            object.y =  (e.clientY - rect.top);
            //Calculates whether the click touched an object

            this.checkCollision(object.x, object.y);
            // console.log(object, 'object')
        })
        
    //         let collision = CheckClickCollision(this.props.levelObjects, object.x, object.y);

    //         if(collision){
    //             this.checkContext(collision[0], collision[1]);
    //         }
    //         return 'click';
    //     }

    //     this.renderCanvasObjects(ctx)
    //     this.renderDialog(ctx, this.props.worldState.dialogBox[this.props.worldState.dialogCurrent], [30, 50]);
        
    }

    renderCanvasObjects = (ctx) => {
        this.props.levelObjects.map(obj => {
            
            //Seperates the data into individual numbers
            let pos = obj.position.split(' ');
            let dimensions = obj.size.split(' ');

            //Sets the rectangle color
            ctx.fillStyle = "#212F3C";
            if(obj.color){
                ctx.fillStyle = obj.color;
            }else{
                ctx.fillStyle = "#FFFF33";
            }
            
            //Creates a rectangle with the fillStyle
            ctx.fillRect(pos[1],pos[0],dimensions[1],dimensions[1]);
            // return 'CLICK'

            var draw = function(){

                    ctx.beginPath();
                    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
                    ctx.moveTo(110, 75);
                    ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
                    ctx.moveTo(65, 65);
                    ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
                    ctx.moveTo(95, 65);
                    ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
                    ctx.stroke();
                
            }
            draw()

        })
        return 'click'
    }

    renderDialog = (ctx, text, position, fontSize="30px", font="Arial") => {
        let worldState = this.props.worldState;
        console.log(this.props.worldState);

        if(worldState.dialogBox[worldState.dialogCurrent]){
                text = worldState.dialogBox[worldState.dialogCurrent]
                ctx.font = fontSize + " " + font;
                ctx.fillStyle = "#000000";
                ctx.fillText(text, position[0], position[1]);
        }

        
    }
    
    setBackground = (canvas, backgroundColor) => {
        canvas.style.background = backgroundColor;
    }
    
    checkCollision = (clickX, clickY) => {
        console.log(clickX + ' ' + clickY)
        let objects = this.props.levelObjects;
        for(let i = 0; i < objects.length; i++){
            let pos = objects[i].position.split(' ');
            let size = objects[i].size.split(' ');
            //Compares the click to the dimensions of the rectangle
            if( (clickX > pos[0]) && (clickX < parseInt(pos[0]) + parseInt( size[0])) && (clickY > pos[1]) && (clickY < parseInt(pos[1]) + parseInt(size[1])) ){
                console.log('hit ' + objects[i].name);
                this.checkContext(i, objects[i]);
            }
        }
    }


    checkContext = (index, object) => {
        switch(object.context){
            case "talk": this.props.onClick(index, 'talk')
            break;
            case "read": this.props.onClick(index, 'read')
            break;
            case "pickup": this.props.onClick(index, 'pickup')
            break;
            case "dialogue": this.props.onClick(index, 'dialogue')
            break; 
            default: this.props.onClick(index, "impossible")
        }
    }

    render(){
        return(
            <div>
                <canvas ref="canvas" width={1000} height={700} />
            </div>
        )
    }
    
}
/*
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.font = "30px Arial";
ctx.fillText("Hello World", 10, 50);

                if( (clickX > parseInt(coords[1])) && (clickX < (parseInt(coords[1]) + noteCollection[note].width)) ){
                    if(noteCollection[note].status == true){
                        this.props.noteHit(note, songId)
                    }
                }

                if( (clickX > parseInt(coords[1])) && (clickX < (parseInt(coords[1]) + noteCollection[note].width)) && (clickY > parseInt(coords[0])) && (clickY < (parseInt(coords[0]) + noteCollection[note].height)) ){
                    if(noteCollection[note].status == false){
                        this.noteClicked(note, songId)
                    }else if(noteCollection[note].status == true){
                        this.noteClicked(note, songId)
                    }
                }


const gameCanvas = (props) => {
    return (<canvas width = "1200" height = "800" ></canvas>);
}
*/


export default GameCanvas;
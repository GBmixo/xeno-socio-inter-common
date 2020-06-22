import React from 'react';


class GameCanvas extends React.Component{

    componentDidMount = () => {
        //Renders the canvas with game objects
        this.renderCanvasObjects();
    }

    renderCanvasObjects = () => {
        //console.log(this.props);
        //The reference to the canvas and other info tied to variables
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        const rect = canvas.getBoundingClientRect();
        //Sets a BG color
        this.setBackground(canvas, "#4B4B55");

        //This is the event listener for the clicks that check for collision with game elements
        canvas.addEventListener('click', e => {
            let object = {};
            //Finds the difference from the (0, 0) of the canvas
            object.x = (e.clientX - rect.left);
            object.y =  (e.clientY - rect.top);
            //Calculates whether the click touched an object
            this.checkCollision(object.x, object.y);
        })

        this.props.levelObjects.map(obj => {

            //Seperates the data into individual numbers
            let pos = obj.position.split(' ');
            let dimensions = obj.size.split(' ');
            //Sets the rectangle color
            ctx.fillStyle = "#FFFF33";
            //Creates a rectangle with the fillStyle
            ctx.fillRect(pos[0],pos[1],dimensions[0],dimensions[1]);
        })
        
    }

    setBackground = (canvas, backgroundColor) => {
        canvas.style.background = backgroundColor;
    }

    checkCollision = (clickX, clickY) => {
        //console.log(clickX + ' ' + clickY)
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
            default: this.props.onClick(index, "impossible")
        }
    }

    render(){
        return(
            <div>
                <canvas ref="canvas" width={750} height={450} />
            </div>
        )
    }
    
}
/*
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
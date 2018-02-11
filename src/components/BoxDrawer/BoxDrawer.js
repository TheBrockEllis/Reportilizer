import React from 'react';
import './BoxDrawer.css';

export class BoxDrawer extends React.Component {
  constructor(props){
    super(props);

    // there are 3.7ish pixels to a mm
    this.state = {
      points: [],
      conversionRate: 3.779528
    }

    this.markBox = this.markBox.bind(this);
    this.placeMark = this.placeMark.bind(this);
    this.removeMark = this.removeMark.bind(this);
  }

  markBox(event){
    // console.log(event.target.offsetTop, event.target.offsetLeft);
    // console.log(event.screenX, event.screenY);

    // Lot going on here, so let's break it down
    // screenX - target.offsetLeft makes sure we're getting the pixel counts based on the #canvas
    // Math.floor() rounds to the nearest whole number
    // / conversaionRate is to make pixels into mm, since that's what jsPdf needs
    let canvasX = event.pageX - event.target.offsetLeft;
    let canvasY = event.pageY - event.target.offsetTop;

    let pdfX = Math.floor(canvasX / this.state.conversionRate);
    let pdfY = Math.floor(canvasY / this.state.conversionRate);

    let newPoints = this.state.points;
    newPoints.push([pdfX, pdfY]);

    //add them to points
    this.setState({
      points: newPoints
    });

    //console.log("State updated:", this.state);

    //if there are two, fire the parent addBox event and clear state
    if(this.state.points.length === 2){
      // console.log("We've got enough to draw a box!", this.state);

      // we know two x, y coordinates
      // we assume tha the first point is the top, left hand corner and the second is the bottom right hand corner
      // we can get the width and height from subtracting the 2nd point's value from the 1st point's

      let width = this.state.points[1][0] - this.state.points[0][0];
      let height = this.state.points[1][1] - this.state.points[0][1];

      let box = {
        x: this.state.points[0][0],
        y: this.state.points[0][1],
        width: width,
        height: height
      }

      //console.log("Trying to add a box", box);

      // calls <App /> addBox(), which will add tracking for boxIndex
      this.props.addBox(box);

      //reset the state
      this.setState({
        points: []
      });

      this.removeMark();
    } else {
      this.placeMark(canvasX, canvasY);
      return;
    }
  }

  placeMark(x, y){
    let mark = document.createElement('div');
    mark.style.width = '3px';
    mark.style.height = '3px';
    mark.style.backgroundColor = 'red';
    mark.className = 'mark';
    mark.style.position = 'absolute';
    mark.style.left = `${x}px`;
    mark.style.top = `${y}px`;
    document.getElementById('canvas').append(mark);
  }

  removeMark(){
    let marks = document.getElementsByClassName('mark');
    // console.log(marks);

    [].forEach.call(marks, instance => {
      // console.log(instance);
      instance.parentNode.removeChild(instance);
    });
  }

  paintBox(box){
    // this.props.boxes.forEach( (box, index) => {
      let div = document.createElement('div');
      div.style.border = '1px solid #000';
      div.style.position = 'absolute';
      div.id = `box_${box.boxIndex}`;
      div.innerHTML = `#${box.boxIndex}`;
      div.style.top = `${box.y * this.state.conversionRate}px`;
      div.style.left = `${box.x * this.state.conversionRate}px`;
      div.style.width = `${box.width * this.state.conversionRate}px`;
      div.style.height = `${box.height * this.state.conversionRate}px`;
      document.getElementById('canvas').append(div);

      //console.log("Trying to add box to screen", box.y * this.state.conversionRate);
    // })
  }

  render(){
    return (
      <div id='canvas' onClick={this.markBox}>
        Click twice to create a new box:
      </div>
    )

  }

}

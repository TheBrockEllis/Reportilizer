import React, { Component } from 'react';
import './App.css';

import { BoxVisualizer } from '../BoxVisualizer/BoxVisualizer';
import { BoxDrawer } from '../BoxDrawer/BoxDrawer';
import { CodeEditor } from '../CodeEditor/CodeEditor';

// import { data } from '../../lib/fixture-data';

import jsPDF from 'jspdf';

class App extends Component {
  constructor(props){
    super(props);

    var pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'letter',
    });

    this.state = {
      pdf: pdf,
      boxes: [],
      boxIndex: 0
    };

    this.generatePDF = this.generatePDF.bind(this);
    // this.generateRandomBox = this.generateRandomBox.bind(this);
    this.addBox = this.addBox.bind(this);
    this.deleteBox = this.deleteBox.bind(this);
    this.updateCode = this.updateCode.bind(this);
  }

  generatePDF(){
    this.state.pdf.text('Custom Report Card', 10, 10);

    // draw all of the saved boxes to the PDF
    this.state.boxes.forEach(box => {
      this.state.pdf.rect(box.x, box.y, box.width, box.height);
      console.log(box.code);
      console.log(box.x);
      console.log(box.y);
      this.state.pdf.text(box.code, box.x, box.y);
    });

    this.state.pdf.save('rando.pdf');
  }

  // generateRandomBox(){
  //   let x = this.generateRandomNumber(100);
  //   let y = this.generateRandomNumber(100);
  //   let w = this.generateRandomNumber(100);
  //   let h = this.generateRandomNumber(100);
  //
  //   let box = {
  //     x: x,
  //     y: y,
  //     width: w,
  //     height: h
  //   }
  //
  //   this.addBox(box);
  // }

  addBox(box){
    box['boxIndex'] = this.state.boxIndex;
    box['code'] = '';

    console.log(box);

    this.setState({
      boxes: [...this.state.boxes, box],
      boxIndex: this.state.boxIndex + 1
    });

    // console.log(this.state.boxes);
    // console.log(this.state.boxes.indexOf(box));

    this.refs.drawer.paintBox(box);

    //console.log(`A ${box.width} x ${box.height} rect was added at ${box.x} and ${box.y}`);
    //console.log(this.state.boxes);
  }

  deleteBox(box){
    var targetIndex;
    for (var i=0; i < this.state.boxes.length; i++) {
        if (this.state.boxes[i].boxIndex === box.boxIndex) {
            targetIndex = i;
        }
    }

    let boxes = this.state.boxes;
    boxes.splice(targetIndex, 1);

    //remove the box from the page
    let visualBox = document.getElementById(`box_${box.boxIndex}`);
    visualBox.parentNode.removeChild(visualBox);

    this.setState({
      boxes: boxes
    })
  }

  updateCode(boxIndex, text){
    let boxes = this.state.boxes;
    boxes[boxIndex].code = text;

    this.setState({
      boxes: boxes
    })
  }

  // generateRandomNumber(limit){
  //   return Math.floor(Math.random() * limit);
  // }

  render() {
    return (
      <div className="App">
        { /* <button onClick={this.generateRandomBox}>Add random box</button> */ }
        <button onClick={this.generatePDF}>Generate PDF</button>

        <BoxVisualizer boxes={this.state.boxes} deleteBox={this.deleteBox} />
        <BoxDrawer addBox={this.addBox} boxes={this.state.boxes} ref='drawer' />
        <CodeEditor boxes={this.state.boxes} updateCode={this.updateCode} />
      </div>
    );
  }
}

export default App;

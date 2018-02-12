import React, { Component } from 'react';
import './App.css';

import { BoxVisualizer } from '../BoxVisualizer/BoxVisualizer';
import { BoxDrawer } from '../BoxDrawer/BoxDrawer';
import { CodeEditor } from '../CodeEditor/CodeEditor';

import { fixture_data } from '../../lib/fixture-data';
import dot from 'dot';
import juice from 'juice';

// dot.templateSettings = {
//   strip: false,
//   varname: 'yo'
// }

var wkhtmltopdf, mkdirp;
wkhtmltopdf = window.require('wkhtmltopdf');
mkdirp = window.require('mkdirp');

class App extends Component {
  constructor(props){
    super(props);

    if(localStorage.getItem('reportcard')){
      this.state = JSON.parse(localStorage.getItem('reportcard'));
    }else{
      this.state = this.initState();
    }

    this.generatePDF = this.generatePDF.bind(this);
    this.addBox = this.addBox.bind(this);
    this.deleteBox = this.deleteBox.bind(this);
    this.updateCode = this.updateCode.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.selectCodeBox = this.selectCodeBox.bind(this);
    this.saveState = this.saveState.bind(this);
    this.deleteState = this.deleteState.bind(this);
    this.generatePDF = this.generatePDF.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  componentDidMount(){
    this.state.boxes.forEach(box => {
      this.refs.drawer.paintBox(box);
    })
  }

  initState(){
    return {
      boxes: [],
      boxIndex: 0,
      selectedCodeBox: 0,
      drawerHidden: true
    }
  }

  generatePDF(){
    // save the report card to localStorage
    localStorage.setItem('reportcard', JSON.stringify(this.state));

    // create a 'PDF' div that will be hidden from view and used to take a snapshot
    let printablePdf = document.createElement('div');
    printablePdf.id = 'printablePdf';
    printablePdf.style.width = '216mm';
    printablePdf.style.height = '279mm';
    printablePdf.style.margin = 0;
    printablePdf.style.position = 'relative';

    document.getElementsByTagName('body')[0].appendChild(printablePdf);

    this.state.boxes.forEach(box => {
      let div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.left = box.x + 'mm';
      div.style.top = box.y + 'mm';
      div.style.width = box.width + 'mm';
      div.style.height = box.height + 'mm';
      div.style.border = '1px solid #f1f1f1'; //remove this later

      // run the template and do all of the fancy shit
      let templateFunction = dot.template(box.code);
      let html = templateFunction(fixture_data);

      // inline all of the CSS styles we have
      html = juice.inlineContent(html, box.style);

      //append that shit to the box
      div.innerHTML = html;

      console.log(html);
      printablePdf.appendChild(div);
    });

    mkdirp('~/reportcards/');

    wkhtmltopdf(printablePdf.outerHTML, {
      output: '~/reportcards/wkhtmlpdf.pdf',
      dpi: 300,
      pageSize: 'Letter',
      marginLeft: 0,
      marginRight: 0
    });

    printablePdf.style.display = 'none';
  }

  addBox(box){
    box['boxIndex'] = this.state.boxIndex;
    box['code'] = '';
    box['style'] = '';

    this.setState({
      boxes: [...this.state.boxes, box],
      boxIndex: this.state.boxIndex + 1
    });

    this.refs.drawer.paintBox(box);
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

  saveState(){
    localStorage.setItem('reportcard', this.state);
  }

  deleteState(){
    this.state.boxes.forEach(box => {
      this.deleteBox(box);
    })

    localStorage.removeItem('reportcard');
    this.setState( this.initState() );
  }

  updateCode(boxIndex, text){
    let boxes = this.state.boxes;
    boxes[boxIndex].code = `${text}`;

    this.setState({
      boxes: boxes
    })
  }

  updateStyle(boxIndex, text){
    let boxes = this.state.boxes;
    boxes[boxIndex].style = text;

    this.setState({
      boxes: boxes
    })
  }

  selectCodeBox(box, index){
    this.child.updateSelectedBoxIndex(index);
  }

  toggleDrawer(){
    this.setState(prevState => ({
      drawerHidden: !prevState.drawerHidden
    }));
  }

  render() {
    return (
      <div className="App">
        <div className='flexbox'>

          <div className='left'>
            <button onClick={this.toggleDrawer}>Toggle Drawer</button>
            <button onClick={this.deleteState}>Delete Template</button>
            <button onClick={this.saveState}>Save Template</button>
            <button onClick={this.generatePDF}>Generate PDF</button>

            <BoxVisualizer boxes={this.state.boxes} deleteBox={this.deleteBox} selectCodeBox={this.selectCodeBox} />
          </div>
          <div className='right'>
            <CodeEditor boxes={this.state.boxes} updateCode={this.updateCode} updateStyle={this.updateStyle} ref={instance => { this.child = instance; }} />
          </div>

        </div>

        <BoxDrawer addBox={this.addBox} boxes={this.state.boxes} drawerHidden={this.state.drawerHidden} toggleDrawer={this.toggleDrawer} ref='drawer' />
      </div>
    );
  }
}

export default App;

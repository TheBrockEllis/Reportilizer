import React from 'react';
import './CodeEditor.css';

export class CodeEditor extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      selectedBoxIndex: 0
    }

    this.updateCode = this.updateCode.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.handleBoxSelect = this.handleBoxSelect.bind(this);
  }

  updateCode(event){
    this.props.updateCode(this.state.selectedBoxIndex, event.target.value);
  }

  updateStyle(event){
    this.props.updateStyle(this.state.selectedBoxIndex, event.target.value);
  }

  handleBoxSelect(event){
    this.updateSelectedBoxIndex(event.target.value);
  }

  updateSelectedBoxIndex(index){
    this.setState({selectedBoxIndex: index});
  }

  render(){
    var code, style;

    if(this.props.boxes.length > 0) {
      code = this.props.boxes[this.state.selectedBoxIndex].code;
      style = this.props.boxes[this.state.selectedBoxIndex].style;
    }else{
      style = '';
      code = '';
    }

    return (
      <div id='codeeditor'>

        <div> Box:
          <select onChange={this.handleBoxSelect} value={this.state.selectedBoxIndex}>
            { this.props.boxes.map( (box, index) => {
                return <option key={index} value={box.boxIndex}>{box.boxIndex}</option>;
              })
            }
          </select>
        </div>

        <p>HTML/Template Code</p>
        <textarea onChange={this.updateCode} value={code} />

        <p>Styling</p>
        <textarea onChange={this.updateStyle} value={style} />

      </div>
    )
  }
}

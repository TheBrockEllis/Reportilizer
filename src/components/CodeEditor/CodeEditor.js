import React from 'react';

export class CodeEditor extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      selectedBoxIndex: 0
    }

    this.updateCode = this.updateCode.bind(this);
    this.handleBoxSelect = this.handleBoxSelect.bind(this);
  }

  updateCode(event){
    console.log(event.target.value);
    // this.setState({value: event.target.value});
    this.props.updateCode(this.state.selectedBoxIndex, event.target.value);
  }

  handleBoxSelect(event){
    this.setState({selectedBoxIndex: event.target.value});
  }

  render(){
    var code;
    if(this.props.boxes.length > 0) {
      code = this.props.boxes[this.state.selectedBoxIndex].code;
    }else{
      code = '';
    }

    return (
      <div>
        <select onChange={this.handleBoxSelect}>
          { this.props.boxes.map( (box, index) => {
              return <option key={index} value={box.boxIndex}>{box.boxIndex}</option>;
            })
          }
        </select>
        { /* <textarea onChange={this.updateCode} value={this.state.value} /> */ }
        <textarea onChange={this.updateCode} value={code} />
      </div>
    )
  }
}

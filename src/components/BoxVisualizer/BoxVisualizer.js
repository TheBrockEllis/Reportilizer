import React from 'react';
import './BoxVisualizer.css';

export class BoxVisualizer extends React.Component {
  constructor(props){
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.selectCodeBox = this.selectCodeBox.bind(this);
  }

  handleDelete(box, index){
    this.props.deleteBox(box, index);
  }

  selectCodeBox(box, index){
    this.props.selectCodeBox(box, index);
  }

  render(){
    // if(this.props.boxes.length === 0) return null;
    //console.log("props", this.props.boxes);
    return (
      <div id='visualizer'>
        Current boxes

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>X</th>
              <th>Y</th>
              <th>Width</th>
              <th>Height</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          { this.props.boxes.map( (box, index) => {
            //console.log("box", box);
            // https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
            return (
              <tr key={index}>
                <td>{box.boxIndex}</td>
                <td><input type='number' defaultValue={box.x} /></td>
                <td><input type='number' defaultValue={box.y} /></td>
                <td><input type='number' defaultValue={box.width} /></td>
                <td><input type='number' defaultValue={box.height} /></td>
                <td><button onClick={() => this.handleDelete(box, index)}>delete</button></td>
                <td><button onClick={() => this.selectCodeBox(box, index)}>&lt;&gt;</button></td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )

  }

}

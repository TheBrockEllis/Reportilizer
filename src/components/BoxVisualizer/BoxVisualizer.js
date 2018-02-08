import React from 'react';
import './BoxVisualizer.css';

export class BoxVisualizer extends React.Component {
  constructor(props){
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(box, index){
    this.props.deleteBox(box, index);
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
            </tr>
          </thead>
          <tbody>
          { this.props.boxes.map( (box, index) => {
            //console.log("box", box);
            // https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
            return (
              <tr key={index}>
                <td>{box.boxIndex}</td>
                <td>{box.x}</td>
                <td>{box.y}</td>
                <td>{box.width}</td>
                <td>{box.height}</td>
                <td><button onClick={() => this.handleDelete(box, index)}>delete</button></td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )

  }

}

import React, { Component } from 'react';
import {birdList, habitats} from './birdInfo.js';

class BirdName extends Component{
  render(){
    return(
      <div>
          <h2>{this.props.name}</h2>


      </div>
    );
  }
}
class BirdImage extends Component{
  render(){
    return(
      <div>
        <image src={this.props.image} />


      </div>
    );
  }
}

class BirdHabitat extends Component{
  render(){
    return(
      <div>
        <p>Habitat: {this.props.habitat}</p>

      </div>
    );
  }
}
class BirdProfile extends Component {
  render(){
    return(
      <div>
          <h1>Bird Form</h1><hr />
          <BirdName name={birdList[0].name} />
          <BirdImage image={birdList[0].image} />
          <BirdHabitat habitat={birdList[0].habitat} />
        </div>
    );
  }
}

class BirdForm extends Component {
    render() {
      return(
        <div>
         <h1>Bird Form</h1><hr />
         <form action=''>
          <input id="bird-search" type="text" placeholder="Search"  />
          <button type="submit">Go</button>
         </form>
        </div>
      );
    }
  }

export default BirdForm;
import React, {Component} from 'react';
import axios from 'axios';

class Provinces extends Component {
  constructor(props) {
    super();
    this.state = {
      provinces: []
    };

  }

  componentDidMount() {
    axios
    .get("/api/provinces")
    .then(
      response => {
        console.log(response);
        this.setState({
          provinces: response.data
        })
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    )
  }

  render() {
    const provinces = this.state.provinces.map((province, i) => 
        /*change provincia to name*/
        <li key={i}>{province.provincia}</li>
      );
      console.log(provinces)
    return (
      <div>
        <h1>Provincias</h1>
      <ul>
        {provinces}
      </ul>
      </div>
    );
  }
}

export default Provinces;
import React, { Component } from "react";
import MenuList from "./Menu";
import MapContainer from "./MapContainer";
import Provinces from './Provinces';

import axios from 'axios';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedItem: { 
        lat: 0, 
        lng: 0, 
        boolselect: false
      },
      provinces: [],
      zoomProv: 6
    };
    this.showInfo = this.showInfo.bind(this);
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

  showInfo(e, selectedItem) {
    selectedItem["boolselect"] = true;
    this.setState({ selectedItem: selectedItem });
  }

  render() {
    //link barra de menu
    let links = [
      {label: 'Home', link: '#home'},
      {label: 'Info', link: '#info'},
      {label: 'Map', link: '#map'}
    ];
    return (
      <div>
        <MenuList data={links}/>
        <Provinces provinces={this.state.provinces} onClick={this.showInfo} />
        <MapContainer
          center={{ lat: -34.603722, lng: -58.381592 }}
          zoom={5}
          data={this.state.provinces}
          selectedItem={this.state.selectedItem}
          zoomProv = {this.state.zoomProv}
        />
      </div>
    );
  }
}
export default App;
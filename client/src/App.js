import React, { Component } from "react";
import MapContainer from "./MapContainer";

import "./App.css";

const data = [
  {
    name: "Buenos Aires",
    title: "Buenos Aires",
    lat: -34.603722,
    lng: -58.381592,
    cases_number: 25,
    disease: "Dengue",
    id: 1
  }
];

const CityList = props => {
  return (
    <div>
      <ul>
        {props.items.map((item, index) => {
          return (
            <li key={index} onClick={e => props.onClick(e, item)}>
              {item.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

class App extends Component {
  state = {
    selectedItem: { 
      lat: 0, 
      lng: 0, 
      boolselect: false
    }
  };

  showInfo(e, selectedItem) {
    selectedItem["boolselect"] = true;
    this.setState({ selectedItem: selectedItem });
  }

  render() {
    return (
      <div>
        <CityList items={data} onClick={this.showInfo.bind(this)} />
        <MapContainer
          center={{ lat: -34.603722, lng: -58.381592 }}
          zoom={5}
          data={data}
          selectedItem={this.state.selectedItem}
        />
      </div>
    );
  }
}
export default App;
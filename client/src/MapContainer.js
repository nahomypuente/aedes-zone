///* global google */
import React, { Component } from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {

  render() {
    //const google = window.google;
    //const data = this.props.data;
    //const center = this.props.center;

    return (
      <div className="map-container">
        <Map
          google={this.props.google}
          className={"map"}
          zoom={this.props.zoom}
          initialCenter={this.props.center}
        >

          { this.props.selectedItem.boolselect ? (<Marker
              key={this.props.selectedItem.id}
              title={this.props.selectedItem.name}
              name={this.props.selectedItem.name}
              position={{ 
                lat: this.props.selectedItem.lat, 
                lng: this.props.selectedItem.lng }}
            />) : ('')}


          <InfoWindow
            visible={true}
            position={{
              lat: this.props.selectedItem.lat,
              lng: this.props.selectedItem.lng
            }}
          >
            <div>
              <h1>Numero de casos: {this.props.selectedItem.cases_number}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCDPo0EeLCKbnKRAk6MqzHMKnTzPhty2vs"
})(MapContainer);

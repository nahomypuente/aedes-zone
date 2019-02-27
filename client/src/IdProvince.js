import React, {Component} from 'react';

class IdProvince extends Component {
  constructor(props) {
    super();
  }
  render() {
    console.log(this.props.prov_data);
    return(
      <div>
        <h3>Tu seleccion ha sido: {this.props.prov_data.nombre}</h3>
        <h4>Enfermedad: {this.props.prov_data.enfermedad}</h4>
        <h4>Num de casos: {this.props.prov_data.numero_de_casos}</h4>
      </div>
    )
  }
}

export default IdProvince;
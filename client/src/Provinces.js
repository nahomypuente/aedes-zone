import React, {Component} from 'react';

class Provinces extends Component {

  render() {
    return (
      <div>
        <select>
          {this.props.provinces.map((province, index) => (
              <option key={index} onClick={e => this.props.onClick(e, province)}>
                {province.title}
              </option>
            )
          )}
        </select>
      </div>
    );
  }
};

export default Provinces;


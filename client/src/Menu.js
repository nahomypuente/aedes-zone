import React, {Component} from 'react';

class MenuList extends Component {
  render() {
    console.log(this.props.data);
    const linksMarkup = this.props.data.map((link, i) => 
      <li key={i}>{link.label}</li>
    )
    return(
      <ul>
        {linksMarkup}
      </ul>
    );
  }
}

export default MenuList;
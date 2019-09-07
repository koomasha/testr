import React, { Component } from 'react';

class List extends Component {
  render() {
    const data = this.props.data;
    const dataType = this.props.dataType;
    const listItems = data.map((item) =>
        <li key={item.key}>{item.key} - {item.value}</li> 
    );
    return (
      <div className={dataType}>
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }
}
export default List;
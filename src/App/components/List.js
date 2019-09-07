import React, { Component } from 'react';

class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            filteredList: [],
        }
    }
    filterList = () => {
        const filter = document.getElementById(`${this.props.dataType}-filter`).value.toLowerCase();
        const filteredList = this.props.data.filter(d => d.key.toLowerCase().includes(filter));
        this.setState({ filteredList });
    }
    render() {
        const data = (this.state.filteredList.length) ? this.state.filteredList : this.props.data;
        const dataType = this.props.dataType;
        return (
            <div className={dataType}>
                <h3>Top {dataType}</h3>  
                <ul>
                    {data.map((item) => <li key={item.key}>{item.key} - {item.value}</li>)}
                </ul>
                <input id={`${dataType}-filter`} onKeyUp={this.filterList} />
            </div>
        );
    }
}
export default List;
import React, { Component } from 'react';
import './Home.css';
import  List  from '../components/List';
class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            words: [],
            hashtags: [],
            avg: 0
        }
    }
    getData = () => {
        fetch('http://localhost:5000').then(res =>  res.json()).then(data => {
            if(data) {
                this.setState({users: data.users});
                this.setState({words: data.words});
                this.setState({hashtags: data.hashtags});
                this.setState({avg: data.avg});
                this.setState({serverTime: Math.floor((new Date() - new Date(data.serverStartTime))/60000)});
            }
        });
    }
    
    render() {
        return (
            <div className="home">
            <h3> Avg twitts per second: {this.state.avg} </h3>
            <h5> Server is runing for {this.state.serverTime} minutes</h5>
            <div className="lists">
                <List data={this.state.users} dataType="users"/>
                <List data={this.state.words} dataType="words"/>
                <List data={this.state.hashtags} dataType="hashtags"/>
            </div>
            <button variant="raised" onClick={this.getData}>Refresh data</button>
            </div>
        );
    }
}
export default Home;
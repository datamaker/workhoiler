import React, { Component } from 'react';
import { Home } from '../containers';

class Wall extends Component {
    render() {        
        return(
            <Home username={this.props.params.username}/>
        );
    }
}

export default Wall;

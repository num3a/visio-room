import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import { grey700, white } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
class DiscoverContainer extends Component {

    navigate(){
        browserHistory.push('/');
    }

    render(){
        return <div className="discover-background">
            <div className="row center-xs center-sm center-md center-lg">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 discover-message">
                    <h3 style={{color: white}}>Your office everywhere !</h3>
                    <h3 style={{color: white}}>No compromise...</h3>
                    <RaisedButton label="Find a room" primary={true} onClick={() => this.navigate()} />

                </div>
            </div>
        </div>;
    }
}

export default DiscoverContainer;
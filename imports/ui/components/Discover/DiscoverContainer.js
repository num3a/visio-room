import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import { grey700, white } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import createHistory from 'history/createBrowserHistory';

class DiscoverContainer extends Component {

    navigate(){
        const history = createHistory();
        this.props.history.push('/');
    }

    render(){
        return <div className="discover-background">
            <div className="row center-xs center-sm center-md center-lg">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 discover-message">
                    <p style={{color: white}}>
                        VisioRoom is an on-demand working spaces boutique that offers to individuals and professionals alike the most central and convenient working spaces, across major cities in the world. We believe in digital nomadism and aim at accelerating the shift to a new era of professional mobility.
                    </p>
                    <RaisedButton label="Find a room" primary={true} onClick={() => this.navigate()} />

                </div>
            </div>
        </div>;
    }
}

export default DiscoverContainer;
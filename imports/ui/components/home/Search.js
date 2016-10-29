import React, { Component } from 'react';
import { connect } from 'react-redux';

class Search extends Component {
    render() {
        return (<div>
            Search Form
        </div>);
    }
}


const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(Search);
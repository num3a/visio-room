import React, {Component} from "react";
import {connect} from "react-redux";
import DatePicker from "material-ui/DatePicker";
import Slider from "material-ui/Slider";

class Search extends Component {
    render() {
        return (
            <div>
                <form>
                    <h4>Search</h4>
                    <label>Date:</label>
                    <DatePicker
                        container="inline"
                        hintText="Choose a date"
                    />
                    <Slider defaultValue={1} />
                </form>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(Search);
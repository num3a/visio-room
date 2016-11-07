import React, {Component} from "react";
import Search from "./Search";
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RoomList from './RoomList';

//TODO: add http://flexboxgrid.com/
//TODO: 4 cols for search /
class HomeContainer2 extends Component {
    render() {
        return(
            <div>
                <div className="row">
                    <div className="col-lg-12">
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                        <div className="box">
                            <Search/>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-9 col-md-9 col-lg-9">
                        <RoomList/>
                    </div>
                </div>
            </div>

        );
    }
}

export default HomeContainer2;
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
                        <Toolbar>
                            <ToolbarGroup firstChild={true}>
                                <DropDownMenu value={1} onChange={() => {}}>
                                    <MenuItem value={1} primaryText="All Broadcasts" />
                                    <MenuItem value={2} primaryText="All Voice" />
                                    <MenuItem value={3} primaryText="All Text" />
                                    <MenuItem value={4} primaryText="Complete Voice" />
                                    <MenuItem value={5} primaryText="Complete Text" />
                                    <MenuItem value={6} primaryText="Active Voice" />
                                    <MenuItem value={7} primaryText="Active Text" />
                                </DropDownMenu>
                            </ToolbarGroup>
                            <ToolbarGroup>
                                <ToolbarTitle text="Options" />
                                <FontIcon className="muidocs-icon-custom-sort" />
                                <ToolbarSeparator />
                                <RaisedButton label="Create Broadcast" primary={true} />
                                <IconMenu
                                    iconButtonElement={
                                        <IconButton touch={true}>
                                            <NavigationExpandMoreIcon />
                                        </IconButton>
                                    }
                                >
                                    <MenuItem primaryText="Download" />
                                    <MenuItem primaryText="More Info" />
                                </IconMenu>
                            </ToolbarGroup>
                        </Toolbar>
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
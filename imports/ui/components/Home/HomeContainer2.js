import React, {Component} from "react";
import RoomList from './RoomList';

class HomeContainer2 extends Component {

    render() {
        return(
            <div>
                <div className="row">
                    <div className="col-xs-12 col-sm-9 col-md-9 col-lg-9">
                        <div className="box">
                            <RoomList/>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default HomeContainer2;
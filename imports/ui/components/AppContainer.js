import React, { Component } from 'react';
import classNames from 'classnames';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

import { TopNavigationContainer, SideNavigationContainer} from './navigation';
import { Layout, Button, Header, Navigation, Drawer, Content,
    Footer, FooterSection, FooterLinkList, FooterDropDownSection,
    Grid, Cell
} from 'react-mdl';
import { getColorClass, getTextColorClass} from '../utils/palette';

class App extends Component {
    render() {
        return (
            <div>
                <Layout fixedHeader className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>
                    <Header className={getColorClass('primary')} title="Material Design Lite" scroll>

                        <div className={"mdl-layout--large-screen-only"}>
                            <TopNavigationContainer/>
                        </div>
                    </Header>
                    <Drawer title="Title">
                        <SideNavigationContainer/>
                    </Drawer>
                    <Content>
                        {this.props.children}
                        <Footer size="mini">
                            <FooterSection type="bottom" logo="More Information">
                                <FooterLinkList>
                                    <a href="https://developers.google.com/web/starter-kit/">Web Starter Kit</a>
                                    <a href="#">Help</a>
                                    <a href="#">Privacy & Terms</a>
                                </FooterLinkList>
                            </FooterSection>
                        </Footer>
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default AppContainer = createContainer(() => {
    return {
        currentUser: Meteor.user(),
    };
}, App);
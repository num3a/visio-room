import React, { Component } from 'react';
import classNames from 'classnames';

import { Layout, Header, Navigation, Drawer, Content, Footer, FooterSection, FooterLinkList, FooterDropDownSection} from 'react-mdl';
import { getColorClass, getTextColorClass} from '../utils/palette';
class AppContainer extends Component {

    render() {
        return (
           <div>
               <Layout fixedHeader className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>
                   <Header className={getColorClass('primary')} title="Material Design Lite" scroll>
                           <Navigation className={"mdl-layout--large-screen-only"}>
                               <a href="#">Link</a>
                               <a href="#">Link</a>
                               <a href="#">Link</a>
                               <a href="#">Link</a>
                           </Navigation>
                       </Header>
                       <Drawer title="Title">
                           <Navigation>
                               <a href="#">Link</a>
                               <a href="#">Link</a>
                               <a href="#">Link</a>
                               <a href="#">Link</a>
                           </Navigation>
                       </Drawer>
                       <Content>
                           <Footer size="mega">
                               <FooterSection type="middle">
                                   <FooterDropDownSection title="Features">
                                       <FooterLinkList>
                                           <a href="#">About</a>
                                           <a href="#">Terms</a>
                                           <a href="#">Partners</a>
                                           <a href="#">Updates</a>
                                       </FooterLinkList>
                                   </FooterDropDownSection>
                                   <FooterDropDownSection title="Details">
                                       <FooterLinkList>
                                           <a href="#">Specs</a>
                                           <a href="#">Tools</a>
                                           <a href="#">Resources</a>
                                       </FooterLinkList>
                                   </FooterDropDownSection>
                                   <FooterDropDownSection title="Technology">
                                       <FooterLinkList>
                                           <a href="#">How it works</a>
                                           <a href="#">Patterns</a>
                                           <a href="#">Usage</a>
                                           <a href="#">Products</a>
                                           <a href="#">Contracts</a>
                                       </FooterLinkList>
                                   </FooterDropDownSection>
                                   <FooterDropDownSection title="FAQ">
                                       <FooterLinkList>
                                           <a href="#">Questions</a>
                                           <a href="#">Answers</a>
                                           <a href="#">Contact Us</a>
                                       </FooterLinkList>
                                   </FooterDropDownSection>
                               </FooterSection>
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

export default AppContainer;
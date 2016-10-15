import React, { Component } from 'react';
import { Layout, Button, Header,  Content,
    Footer, FooterSection, FooterLinkList, FooterDropDownSection,
    Card, CardText, CardTitle, CardActions, CardMenu, IconButton,
    List, ListItem,
    Grid, Cell, Textfield
} from 'react-mdl';
import { getColorClass, getTextColorClass} from '../../utils/palette';

const LogIn = (props) => (
    <div className="vs-login">
        <Grid>
            <Cell col={4} offsetDesktop={3} offsetTablet={1} style={{backgroundColor: getColorClass('grey', 100)}} >
                <List>
                    <ListItem>
                        <Textfield
                            onChange={() => props.onEmailChange()}
                            label="Email"
                            style={{width: '300px'}}
                        />
                    </ListItem>

                    <ListItem>
                        <Textfield
                            onChange={() => props.onPasswordChange()}
                            label="Password"
                            style={{width: '300px'}}
                        />
                    </ListItem>
                    <ListItem>
                        <Button onClick={props.onLoginClick} raised accent ripple>Login</Button>
                    </ListItem>
                </List>
            </Cell>
            <Cell col={4} >
                <Card shadow={0} >
                    <CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>Welcome</CardTitle>
                    <CardText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris sagittis pellentesque lacus eleifend lacinia...
                    </CardText>
                    <CardActions border>
                        <Button colored onClick={props.onOAuthClick}>
                            <img src="/assets/Sign-In-Small---Default.png" />
                        </Button>
                    </CardActions>
                    <CardMenu style={{color: '#fff'}}>
                        <IconButton name="share" />
                    </CardMenu>
                </Card>

            </Cell>
        </Grid>
    </div>
);

export default LogIn;
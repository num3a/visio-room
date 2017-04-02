import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import './PartnerCreation.html';

export default class AutoFormPartnerCreation extends Component {
    componentDidMount() {
        // Use Meteor Blaze to render login buttons
        this.view = Blaze.render(Template.insertRoomsForm,
            ReactDOM.findDOMNode(this.refs.container));
    }
    componentWillUnmount() {
        // Clean up Blaze view
        Blaze.remove(this.view);
    }
    render() {
        // Just render a placeholder container that will be filled in
        return <div ref="container" />;
    }
}
import React, { Component } from 'react';

class PartnerCreation extends Component {
    onSubmitForm(event){
        //TODO create partner
    }
    render(){
        return <div className="container">
            <div className="box">
                <div>
                    <h3 className="is-subtitle is-3">Partners creation</h3>
                </div>
                <form onSubmit={(event) => this.onSubmitForm()}>
                    <div className="field">
                        <label className="label">Name</label>
                        <p className="control">
                            <input name="name" className="input" type="text" placeholder="Partner name" required />
                        </p>
                    </div>
                    <div className="field">
                        <label className="label">Address</label>
                        <p className="control">
                            <textarea name="address" className="input" type="textarea" placeholder="Address" />
                        </p>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <p className="control">
                            <input name="email" className="input" type="email" placeholder="Email" />
                        </p>
                    </div>
                    <div className="field">
                        <label className="label">Phone</label>
                        <p className="control">
                            <input name="phone" className="input" type="text" placeholder="Phone" />
                        </p>
                    </div>
                    <hr />
                    <div className="field">
                        <button className="button is-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>;
    }
}

export default PartnerCreation;
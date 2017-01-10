Meteor.startup(() => {
    ServiceConfiguration.configurations.upsert(
        { service: "linkedin" },
        { $set: {    service: 'linkedin',
            clientId: '77cqf8fxrfhcg9',
            secret: 'kcwNe8jecD247S9j',
            loginStyle: 'redirect' } }
    );

    /*
    Accounts.loginServiceConfiguration.upsert({
        service: 'linkedin'
    }, {
        service: 'linkedin',
        clientId: '77cqf8fxrfhcg9',
        secret: 'kcwNe8jecD247S9j',
        loginStyle: 'redirect'
    });
    */
});
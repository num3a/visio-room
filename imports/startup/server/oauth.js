Meteor.startup(() => {
    

  ServiceConfiguration.configurations.remove({
    service: 'linkedin'
  });
  ServiceConfiguration.configurations.upsert(
    { service: "linkedin" },
    { $set: {    service: 'linkedin',
      clientId: '77cqf8fxrfhcg9',
      secret: 'kcwNe8jecD247S9j',
      scope: 'r_basicprofile',
      redirectUri: Meteor.settings.ROOT_URL,  
      loginStyle: 'redirect' } }
  );

  /*
   Accounts.loginServiceConfiguration.upsert({
   service: 'linkedin'
   }, {
   service: 'linkedin',
   clientId: '77cqf8fxrfhcg9',
   secret: 'kcwNe8jecD247S9j',
   scope: 'r_basicprofile',
   loginStyle: 'redirect'
   });
   */
});
if (Meteor.isServer) {
    Meteor.publish("allUsers", function () {
        return Meteor.users.find({});
    });
    Meteor.publish("allUserData", function () {
        return Meteor.users.find({}, {fields: {"emails.address": 1}});
    });
};

if (Meteor.isClient) {
    Meteor.subscribe("allUsers");
    Meteor.subscribe("allUserData");
};
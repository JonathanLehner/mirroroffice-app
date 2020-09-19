Meteor.methods({
    'addToChat': (args) => {
        ChatCollection.insert(
            {
                user: Meteor.userId(), 
                msg: args.msg
            }
        );
    }}
);

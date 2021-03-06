Channels = new Mongo.Collection('Channels');
Messages = new Mongo.Collection('Messages');

Meteor.publish("userChannels", function(){
	return Channels.find({members:  {$in : [this.userId]}});
});
//{members:  {$in : [this.userId]}}
Meteor.publish("userMessages", function(){
	return Messages.find({});
});
Meteor.publish("allUsers", function () {
	return Meteor.users.find({},
	{
     // specific fields to return
     '_id' : 1,
     'username': 1,
     'createdAt': 1
	}
 );
});
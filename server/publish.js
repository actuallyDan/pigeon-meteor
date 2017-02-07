Channels = new Mongo.Collection('Channels');
Messages = new Mongo.Collection('Messages');

Meteor.publish("userChannels", function(){
	return Channels.find();
});
//{members:  {$in : [this.userId]}}
Meteor.publish("userMessages", function(){
	return Messages.find();
});
Meteor.publish("allUsers", function () {
	return Meteor.users.find({},
	{
     // specific fields to return
     'profile.email': 1,
     'profile.name': 1,
     'profile.createdAt': 1
 }
 );
});
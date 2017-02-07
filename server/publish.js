Channels = new Mongo.Collection('Channels');
Messages = new Mongo.Collection('Messages');

Meteor.publish("userChannels", function(){
	return Channels.find({members:  {$in : [this.userId]}});
});
Meteor.publish("userTasks", function(){
	return Messages.find();
});

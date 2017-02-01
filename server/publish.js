Channels = new Mongo.Collection('Channels');
Messages = new Mongo.Collection('Messages');

Meteor.publish("userTasks", function(){
	return Channels.find({userId: this.userId});
});
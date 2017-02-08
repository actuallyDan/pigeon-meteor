Meteor.methods({
	// addTask(task){
	// 	if(!Meteor.userId()){
	// 		throw new Meteor.Error('not-authorized');
	// 	} 
	// 	Tasks.insert({
	// 		text: task.text,
	// 		dateStart: task.dateStart,
	// 		timeStart: task.timeStart,
	// 		priority: task.priority,
	// 		completed: false,
	// 		createdAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).getTime(),
	// 		user : Meteor.userId()
	// 	});
	// },
	// toggleTask(task){
	// 	if(Meteor.userId() !== task.user){
	// 		throw new Meteor.Error('not-authorized');
	// 	}
	// 	Tasks.update(task._id, {
	// 		$set: {completed: !task.completed }
	// 	})
	// },
	// deleteTask(task){
	// 	if(Meteor.userId() !== task.user){
	// 		throw new Meteor.Error('not-authorized');
	// 	}
	// 	Tasks.remove(task._id);
	// }, 
	// getTasks(){
	// 	return Tasks.find().fetch();
	// }
	checkIfChannel(username){
		let userToFind = Meteor.users.findOne({username : username})._id;

		let chanMembers = [this.userId, userToFind].sort();

		if(Channels.findOne({"members" : chanMembers}) == null){
			// Channel doesn't yet exist; create it
			console.log("Creating new channel");
			return Channels.insert({"members": chanMembers});
		} else {
			console.log("Opening existing channel");
			return Channels.findOne({"members" : chanMembers})._id;
		}
		console.log("Can't find user");
		return -1;
	},
	getChannels(){
		return Channels.find({}).fetch()
	},
	sendMessage(msg){
		Messages.insert({
			channel : msg.channel,
			userId : this.userId,
			username : msg.username,
			timestamp: msg.timestamp,
			message: msg.message
		});
	}	

	});

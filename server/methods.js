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
		console.log(username);
		let userToFind = Meteor.users.findOne({username : username});

		userToFind = userToFind._id;
		let chanMembers = [this.userId, userToFind].sort();

		if(Channels.findOne({"members" : chanMembers}) == null){
			// Channel doesn't yet exist; create it
			return Channels.insert({"members": chanMembers});
		} else {
			return Channels.findOne({"members" : chanMembers})._id;
		}
		return -1;
	},
	getChannels(){
		return Channels.find({}).fetch()
	}
		

	});

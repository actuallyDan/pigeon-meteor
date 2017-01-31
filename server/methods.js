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
});

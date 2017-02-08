import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Conversation extends TrackerReact(React.Component) {
	constructor(props){
		super(props);

		this.state = {
			messages : this.props.conversation
		};
	}
	sendMessage(e){
		if(this.refs.messageText.value.trim() !== ""){
			e.preventDefault();
			this.props.sendMessage(this.refs);
			this.forceUpdate();
		} 
	}

	render(){
		let messages = this.state.messages;
		let thisUser = Meteor.userId();
		let count = 0;
		return (<div className="animated fadeIn">
					<div id="messageList">
					{messages.map((msgObj)=>{
						++count;
						return(<div className='message-block animated fadeInUp' key={msgObj.timestamp + "-" + count}>
								<div className={"message " + (thisUser === msgObj.userId ? "user-message" : "other-message")}> 
								{ msgObj.message }
								<br/>
								</div>
								</div>)
					})}
					</div>
					<form id="conversation-box" onSubmit={this.sendMessage.bind(this)}>
						<input id="messageInput" placeholder="Enter message here" ref="messageText" autoComplete="off"/>
					</form>
				</div>
			)
	}
}

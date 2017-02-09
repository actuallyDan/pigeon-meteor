import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Conversation extends TrackerReact(React.Component) {
	constructor(props){
		super(props);

		this.state = {
			subscription:{
				"userMessages" : Meteor.subscribe("userMessages")
			}
		};
	}
	sendMessage(e){
		if (e.key === 'Enter') {
			if(this.refs.messageText.value.trim() !== ""){
				e.preventDefault();
				this.props.sendMessage(this.refs);
				this.forceUpdate();
			} 
		}
	}
	getMessages(){
		return Messages.find({channel: this.props.channelId}).fetch()
	}
	componentDidMount(){
		this.updateScroll();
	}
	componentDidUpdate(){
		this.updateScroll();
	}
	updateScroll(){
		let documentHeight = document.documentElement.offsetHeight;
		let viewportHeight = window.innerHeight;
		window.scrollTo(0, documentHeight - viewportHeight);
	}
	render(){
		let messages = this.getMessages();
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
			<form id="conversation-box" >

			<TextareaAutosize
			minRows={1}
			maxRows={6}
			id="messageInput" 
			placeholder="Enter message here" 
			ref="messageText" 
			autoComplete="off"
			onKeyPress={this.sendMessage.bind(this)}
			/>
			</form>
			</div>
			)
	}
}
//<input id="messageInput" placeholder="Enter message here" ref="messageText" autoComplete="off"/></form>
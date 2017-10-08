import React, { Component } from 'react';
import './../style/note.css';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton'

export default class Note extends Component {

	constructor(props){
		super(props)



	}

	deleteNote = () => {
		this.props.deleteNote(this.props.note)

	}

	editNote = () => {
		this.props.editNote(this.props.note)
		
	}


	render() {
		const {note} = this.props
		return (
			<div>
				<Card className="note">
					<div>
						<CardHeader title={note.title} />
						<CardText>{ note.text }</CardText>
						<CardActions className="noteButtons">
							<FlatButton onClick = {this.editNote}>done</FlatButton>
							<FlatButton onClick = {this.deleteNote}>delete</FlatButton>
						</CardActions>
					</div>
				</Card>
			</div>
			)

	}


}
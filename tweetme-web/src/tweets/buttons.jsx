import React from 'react';
import { apiTweetAction } from '../loookup';

export function ActionButton(props) {
	const {
		tweet,
		action: { type, display },
		didperformAction,
		className
	} = props;
	const likes = tweet.likes ? tweet.likes : 0;
	const style = className ? className : 'btn btn-primary btn-sm';
	const view = type === 'like' ? `${likes} ${display}` : display;
	const handleBackendActionEvent = (response, status) => {
		if ((status === 200 || status === 201) && didperformAction) {
			didperformAction(response, status);
		}
	};
	const handleClick = (event) => {
		event.preventDefault();
		apiTweetAction(tweet.id, type, handleBackendActionEvent);
	};
	return (
		<>
			<button className={style} onClick={handleClick}>
				{view}
			</button>
		</>
	);
}

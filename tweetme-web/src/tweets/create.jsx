import React from 'react';
import { apiTweetCreate } from '../loookup';

export function TweetCreate(props) {
	const textAreaRef = React.createRef();
	const { didTweet } = props;
	const handleBackendTweetCreate = (response, status) => {
		if (status === 201) {
			didTweet(response);
		} else {
			console.error(response);
			alert('Please try again');
		}
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		const newVal = textAreaRef.current.value;
		apiTweetCreate(newVal, handleBackendTweetCreate);
		textAreaRef.current.value = '';
	};
	return (
		<div className={props.className}>
			<form onSubmit={handleSubmit}>
				<textarea
					ref={textAreaRef}
					className='form-control'
					name='tweet'
					required={true}></textarea>
				<button type='submit' className='btn btn-primary my-3'>
					Tweet
				</button>
			</form>
		</div>
	);
}

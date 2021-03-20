import React, { useState, useEffect } from 'react';
import { apiTweetList } from '../loookup';
import { Tweet } from './detail';

export function TweetsList(props) {
	const [tweetsInit, setTweetsInit] = useState([]);
	const [tweets, setTweets] = useState([]);
	const [nextUrl, setNextUrl] = useState(null);
	const [tweetsDidSet, setTweetsDidset] = useState(false);
	useEffect(() => {
		let final = [...props.newTweets].concat(tweetsInit);
		if (final.length !== tweets.length) {
			setTweets(final);
		}
	}, [tweetsInit, props.newTweets, tweets]);
	useEffect(() => {
		if (tweetsDidSet === false) {
			const handleBackendTweetLoad = (response, status) => {
				if (status === 200) {
					setNextUrl(response.next);
					setTweetsInit(response.results);
					setTweetsDidset(true);
				}
			};
			apiTweetList(props.username, handleBackendTweetLoad);
		}
	}, [props.username, tweetsDidSet, setTweetsDidset, tweetsInit]);
	const handleDidRetweet = (newTweet) => {
		const updtaeTweetsInit = [...tweetsInit];
		updtaeTweetsInit.unshift(newTweet);
		setTweetsInit(updtaeTweetsInit);
		const updateFinalTweets = [...tweets];
		updateFinalTweets.unshift(tweets);
		setTweets(updtaeTweetsInit);
	};
	const handleLoadNext = (event) => {
		event.preventDefault();
		if (nextUrl !== null) {
			const handleLoadNextresponse = (response, status) => {
				if (status === 200) {
					setNextUrl(response.next);
					const newTweets = [...tweets].concat(response.results);
					setTweetsInit(newTweets);
					setTweets(newTweets);
				}
			};
			apiTweetList(props.username, handleLoadNextresponse, nextUrl);
		}
	};
	return (
		<React.Fragment>
			{tweets.map((item, index) => {
				return (
					<Tweet
						didRetweet={handleDidRetweet}
						tweet={item}
						className='my-5 mx-2 py-5 px-5 border bg-white text-dark'
						key={index}
					/>
				);
			})}
			{nextUrl && (
				<button
					onClick={handleLoadNext}
					className='btn btn-outline-primary m-2'>
					Load Next
				</button>
			)}
		</React.Fragment>
	);
}

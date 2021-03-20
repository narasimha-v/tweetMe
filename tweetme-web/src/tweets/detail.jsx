import React, { useState } from 'react';
import { ActionButton } from './buttons';
import { UserDisplay, UserPicture } from '../profiles';

export function ParentTweet(props) {
	const { tweet } = props;
	return tweet.parent ? (
		<Tweet
			isRetweet
			retweeter={props.retweeter}
			hideActions
			tweet={tweet.parent}
			className={' '}
		/>
	) : null;
}

export function Tweet(props) {
	const { tweet, didRetweet, hideActions, isRetweet, retweeter } = props;
	const [actionTweet, setActionTweet] = useState(tweet ? tweet : null);
	let className = props.className ? props.className : 'col-10 mx-auto col-md-6';
	className =
		isRetweet === true ? `${className} p-2 border rounded` : className;
	const handlePerformAction = (newActionTweet, status) => {
		if (status === 200) {
			setActionTweet(newActionTweet);
		} else if (status === 201) {
			if (didRetweet) {
				didRetweet(newActionTweet);
			}
		}
	};
	const path = window.location.pathname;
	const match = path.match(/(?<tweetId>\d+)/);
	const urlTweetId = match ? match.groups.tweetId : -1;
	const isDetail = `${tweet.id}` === `${urlTweetId}`;
	const handleLink = (event) => {
		event.preventDefault();
		window.location.href = `/${tweet.id}`;
	};
	return (
		<div className={className}>
			{isRetweet && (
				<div className='mb-2'>
					<span className='small text-muted'>
						Retweet via <UserDisplay user={retweeter} />
					</span>
				</div>
			)}
			<div className='d-flex'>
				<div className=''>
					<UserPicture user={tweet.user} />
				</div>
				<div className='col-11'>
					<div>
						<p>
							<UserDisplay user={tweet.user} includeFullName />
						</p>
						<p>{tweet.content}</p>
						<ParentTweet tweet={tweet} retweeter={tweet.user} />
					</div>
					<div className='btn btn-group px-0'>
						{actionTweet && hideActions !== true && (
							<React.Fragment>
								<ActionButton
									tweet={actionTweet}
									action={{ type: 'like', display: 'Likes' }}
									didperformAction={handlePerformAction}
								/>
								<ActionButton
									tweet={actionTweet}
									action={{ type: 'unlike', display: 'Unlike' }}
									didperformAction={handlePerformAction}
									className='btn btn-danger btn-sm'
								/>
								<ActionButton
									tweet={actionTweet}
									action={{ type: 'retweet', display: 'Retweet' }}
									didperformAction={handlePerformAction}
									className='btn btn-success btn-sm'
								/>
							</React.Fragment>
						)}
						{isDetail ? null : (
							<button
								className='btn btn-outline-primary btn-sm'
								onClick={handleLink}>
								View
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

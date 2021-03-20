import React, { useState, useEffect } from 'react';
import { apiProfileDetail, apiProfileFollowToggle } from '../loookup';
import { UserDisplay, UserPicture } from './index';
import numeral from 'numeral';

function DisplayCount(props) {
	return (
		<span className={props.className}>
			{numeral(props.children).format('0a')}
		</span>
	);
}

function ProfileBadge(props) {
	const { user, didFollowToggle, profileLoading } = props;
	let currentverb = user && user.is_following ? 'Unfollow' : 'Follow';
	currentverb = profileLoading ? 'Loading....' : currentverb;
	const handleFollowToggle = (event) => {
		event.preventDefault();
		// event.PreventDefault();
		if (didFollowToggle && !profileLoading) {
			didFollowToggle(currentverb);
		}
	};
	return user ? (
		<div className='container m-2'>
			<div className='row'>
				<div className='col-1'>
					<UserPicture user={user} hideLink />
				</div>
				<div className='col-11'>
					<p>
						<UserDisplay user={user} includeFullName hideLink />
					</p>
					<p>
						<DisplayCount>{user.follower_count}</DisplayCount>{' '}
						{user.follower_count === 1 ? `Follower` : `Followers`}
					</p>
					<p>
						<DisplayCount>{user.following_count}</DisplayCount> Following
					</p>
					{user.location && <p>{user.location}</p>}
					{user.bio && <p>{user.bio}</p>}
					<button
						onClick={handleFollowToggle}
						className='btn btn-primary btn-sm'>
						{currentverb}
					</button>
				</div>
			</div>
		</div>
	) : null;
}

export function ProfileBadgeComponent(props) {
	const { username } = props;
	const [didLookup, setDidLookup] = useState(false);
	const [profile, setProfile] = useState(null);
	const [profileLoading, setProfileLoading] = useState(false);
	const handleBackendLookup = (response, status) => {
		if (status === 200) {
			setProfile(response);
		}
	};
	useEffect(() => {
		apiProfileDetail(username, handleBackendLookup);
		setDidLookup(true);
	}, [username, didLookup, setDidLookup]);
	const handleNewFollow = (actionVerb) => {
		apiProfileFollowToggle(username, actionVerb, (response, status) => {
			if (status === 200) {
				setProfile(response);
			}
			setProfileLoading(false);
		});
		setProfileLoading(true);
	};

	return didLookup === false ? (
		'Loading......'
	) : profile ? (
		<ProfileBadge
			user={profile}
			didFollowToggle={handleNewFollow}
			profileLoading={profileLoading}
		/>
	) : null;
}

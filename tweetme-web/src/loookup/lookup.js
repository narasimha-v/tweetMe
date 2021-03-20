import { lookup } from './components';

export function apiTweetDetail(tweetId, callback) {
	lookup('GET', `/tweets/${tweetId}/`, callback);
}

export function apiTweetList(username, callback, nextUrl) {
	let endpoint = '/tweets/';
	if (username) endpoint = `/tweets/?username=${username}`;
	if (nextUrl !== null && nextUrl !== undefined) {
		endpoint = nextUrl.replace('http://localhost:8000/api', '');
	}
	lookup('GET', endpoint, callback);
}

export function apiTweetFeed(callback, nextUrl) {
	let endpoint = '/tweets/feed/';
	if (nextUrl !== null && nextUrl !== undefined) {
		endpoint = nextUrl.replace('http://localhost:8000/api', '');
	}
	lookup('GET', endpoint, callback);
}

export function apiTweetCreate(tweetData, callback) {
	lookup('POST', '/tweets/create/', callback, { content: tweetData });
}

export function apiTweetAction(tweetId, action, callback) {
	lookup('POST', '/tweets/action/', callback, { id: tweetId, action });
}

export function apiProfileDetail(username, callback) {
	lookup('GET', `/profiles/${username}/`, callback);
}

export function apiProfileFollowToggle(username, action, callback) {
	const data = { action: action.toLowerCase() };
	lookup('POSt', `/profiles/${username}/follow`, callback, data);
}

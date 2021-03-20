import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
	TweetsComponent,
	TweetDetailComponent,
	FeedComponent
} from '../src/tweets';
import { ProfileBadgeComponent } from '../src/profiles';

const appEle = document.getElementById('root');
const tweetEle = document.getElementById('tweetEle');
const tweetFeedEle = document.getElementById('tweetFeedEle');
const e = React.createElement;

if (appEle) {
	ReactDOM.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
		appEle
	);
}

if (tweetEle) {
	ReactDOM.render(e(TweetsComponent, tweetEle.dataset), tweetEle);
}

if (tweetFeedEle) {
	ReactDOM.render(e(FeedComponent, tweetFeedEle.dataset), tweetFeedEle);
}

const userProfileBadgeElements = document.querySelectorAll(
	'.tweetme-profile-badge'
);
userProfileBadgeElements.forEach((container) => {
	ReactDOM.render(e(ProfileBadgeComponent, container.dataset), container);
});

const tweetDetailElements = document.querySelectorAll('.tweetme-detail');
tweetDetailElements.forEach((container) => {
	ReactDOM.render(e(TweetDetailComponent, container.dataset), container);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

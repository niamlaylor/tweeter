/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const dateDifference = require('./helpers/dateDifference')

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1668362669772
}
$(document).ready( function() {
  const createTweetElement = function(tweetData) {
    let daysSinceCreated = dateDifference(tweetData.created_at);
    daysSinceCreated > 1 ? daysSinceCreated += ' days' : daysSinceCreated += ' day';

    const $tweet = `<article class="tweet-box">
    <header class="tweet-box-header">
      <div>
        <img alt="user-icon" src="${tweetData.user.avatars}" alt="user-icon">
        <h3 class="tweet-box-username">${tweetData.user.name}</h3>
      </div>
      <h3 class="tweet-box-header-handle">${tweetData.user.handle}</h3>
    </header>
    <p>${tweetData.content.text}</p>
    <footer class="tweet-box-footer">
      <div>
        <p class="tweet-box-footer-days">Created ${daysSinceCreated} ago</p>
        <div class="tweet-box-footer-icons">
          <a><i class="fa-solid fa-flag"></i></a>
          <a><i class="fa-solid fa-retweet"></i></a>
          <a><i class="fa-solid fa-heart"></i></a>
        </div>
      </div>
    </footer>
  </article>`;
    return $tweet;
  }
  const $tweet = createTweetElement(tweetData);
  $('container tweetsbody').append($tweet);
});
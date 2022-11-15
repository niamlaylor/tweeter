/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready( function() {
  // Dummy data for testing purposes until AJAX functionality added
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1668374968201
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1668374968201
    }
  ]
  // Returns the number of days ago that the tweet was created, rounded down to the nearest whole number
  const dateDifference = (createdDate) => {
    return Math.round((Date.now() - createdDate) / (1000 * 60 * 60 * 24));
  };

  const createTweetElement = function(tweet) {
    let daysSinceCreated = dateDifference(tweet.created_at);
    daysSinceCreated > 1 ? daysSinceCreated += ' days' : daysSinceCreated += ' day';

    const $tweet = `<article class="tweet-box">
    <header class="tweet-box-header">
      <div>
        <img alt="user-icon" src="${tweet.user.avatars}" alt="user-icon">
        <h3 class="tweet-box-username">${tweet.user.name}</h3>
      </div>
      <h3 class="tweet-box-header-handle">${tweet.user.handle}</h3>
    </header>
    <p>${tweet.content.text}</p>
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
  // after page load, we run this to loop through each tweet in our db and populate the tweets on the front-end
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $('.new-tweet').append(createTweetElement(tweet));
    };
  };
  renderTweets(data);
});
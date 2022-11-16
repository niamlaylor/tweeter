/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
      "created_at": 166881737999
    }
  ];

  // dateDifference is a helper that returns how many days ago a tweet was created, rounded to the lowest whole number
  const createTweetElement = function(tweet) {
    let daysSinceCreated = tweet.created_at;
    // Operator checks if days should be pluralized

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
        <p class="tweet-box-footer-days">${daysSinceCreated}</p>
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

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $('.new-tweet').append(createTweetElement(tweet));
    };
  };

  // Whenever we run any jQuery, we need it to be inside this function
$(document).ready( function() {
  // Ajax request for submitting a tweet
  $('#new-tweet-form').submit( function(event) {
    event.preventDefault();
    const tweetData = $(this).serialize();
    $.post('/tweets', tweetData);
  })

  // after page load, we run this to loop through each tweet in our db and populate the tweets on the front-end
  renderTweets(data);
});
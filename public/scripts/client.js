/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


  // dateDifference is a helper that returns how many days ago a tweet was created, rounded to the lowest whole number
  const maxTweetLength = 140;

  const createTweetElement = function(tweet) {
    const timeAgo = timeago.format(tweet.created_at);

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
        <p class="tweet-box-footer-days">From ${timeAgo}</p>
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
      $('#tweets-container').prepend(createTweetElement(tweet));
    };
  };

  // Whenever we run any jQuery, we need it to be inside .ready
$(document).ready( function() {
  // Ajax request for submitting the create tweet form
  $('#new-tweet-form').submit( function(event) {
    event.preventDefault();
    const tweetData = $(this).serialize();

    const tweetLength = $('#tweet-text').val().length;
    if (tweetLength <= maxTweetLength && tweetLength) {
      $.post('/tweets', tweetData)
      .then(() => {
        $.get('/tweets', function(data, status) {
          // renderTweets function accepts an array so we need to pass the newest tweet
          status !== 'success' ? console.log(status) : renderTweets([data[data.length - 1]]);
        });
      })
    } else {
      alert('Something is wrong!');
    }
  });
  // Dynamically load tweets on page load with an ajax GET request
  const loadTweets = function() {
    $.get('/tweets', function(data, status) {
      status !== 'success' ? console.log(status) : renderTweets(data);
    })
  }
  loadTweets();
});
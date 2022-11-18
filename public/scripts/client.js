/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

  const maxTweetLength = 140; // Characters
  const slideSpeed = 200; // Milliseconds - speed of slideUp/slideDown jquery animations

  // This function prevents malicious entries in the tweet textarea
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    const timeAgo = timeago.format(tweet.created_at);
    const safeHTML = `<p>${escape(tweet.content.text)}</p>`

    const $tweet = `<article class="tweet-box">
    <header class="tweet-box-header">
      <div>
        <img alt="user-icon" src="${tweet.user.avatars}" alt="user-icon">
        <h3 class="tweet-box-username">${tweet.user.name}</h3>
      </div>
      <h3 class="tweet-box-header-handle">${tweet.user.handle}</h3>
    </header>
    ${safeHTML}
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

  // This function returns an appropriate error string based on the error type
  const throwError = function(errorType) {
    const errors = {
      empty: `Tweet field cannot be empty.`,
      tooLong: `Tweet must be ${maxTweetLength} characters or less.`
    }
    const $errorMessage = `${errors[errorType]}`
    return $errorMessage;
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
        })
      .then(() => {
        $('#new-tweet-error').slideUp(slideSpeed);
      })
      })
    // Below are error checks for the compose tweet field
    } else if (tweetLength > maxTweetLength) {
      const errorType = 'tooLong';
      const $errorMessage = throwError(errorType);
      $('#new-tweet-error-text').text($errorMessage)
      $('#new-tweet-error').slideDown(slideSpeed);
    } else if (!tweetLength) {
      const errorType = 'empty';
      const $errorMessage = throwError(errorType);
      $('#new-tweet-error-text').text($errorMessage)
      $('#new-tweet-error').slideDown(slideSpeed);
    }
  });
  // Dynamically load tweets on page load with an ajax GET request
  const loadTweets = function() {
    $.get('/tweets', function(data, status) {
      status === 'success' ? renderTweets(data) : console.log(status);
    })
  }
  loadTweets();
});
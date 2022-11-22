$(document).ready(function() {
  $('#tweet-text').on('input', function(event) {
    const maxChars = 140;
    const textareaLength = $('#tweet-text').val().length;
    
    // subtract the length of the textarea from the maxChars amount (140)
    const tweetLength = maxChars - textareaLength;
    $("#tweet-counter").text(tweetLength);

    // set text colour depending on if the tweetLength is negative or positive
    tweetLength < 0 ? $('#tweet-counter').css('color', 'red') : $('#tweet-counter').css('color', '#545149');
  });
});
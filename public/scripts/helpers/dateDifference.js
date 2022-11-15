  // Returns the number of days ago that the tweet was created, rounded down to the nearest whole number
  const dateDifference = (createdDate) => {
    return Math.round((Date.now() - createdDate) / (1000 * 60 * 60 * 24));
  };
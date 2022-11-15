// this function returns the number of full days since the tweet was created
const dateDifference = (createdDate) => {
  return Math.round((Date.now() - createdDate) / (1000 * 60 * 60 * 24));
};

module.exports = dateDifference;
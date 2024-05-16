const tweet = document.getElementById("tweet");
const postBtn = document.getElementById("post");

postBtn.addEventListener("click", () => {
  const tweetVal = tweet.value;

  const newTweet = document.createElement("p");
  newTweet.textContent = tweetVal;

  document.body.append(newTweet);
  tweet.value = "";
});

var getUserRepos = function() {
    console.log("function was called");
    fetch ("http://api.github.com/users/octocat/repos");
  };
  
  getUserRepos();


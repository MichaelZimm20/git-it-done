// global variables 
var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");


// extract the query value from the query string 
var getRepoName = function () {
    // grab repo name from url query string
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];
    
    if(repoName) {
        // display repo name on the page
        repoNameEl.textContent = repoName;

        getRepoIssues(repoName);
    } else {
        // if no repo was given, redirect to the homepage 
        document.location.replace("./index.html");
    }

};

// fetch repos for issues 
var getRepoIssues = function (repo){
    // format the github api url
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    
    // make a get request to URL
    fetch(apiUrl).then(function(response) {
        //request was successful
        if(response.ok){
            response.json().then(function(data){
                // pass response data to DOM function
                displayIssues(data);
                

                // check if api has paginated issues 
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        } else {
            // if not successful, redirect to the homepage 
            document.location.replace("./index.html");
        }
    });
};




// convert fetched data into DOM elements 
var displayIssues = function(issues){
    
    // if statement if the user comes accross a page with NO issues 
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    // loop through issues and display elements 
    for (var i = 0; i < issues.length; i++){
        // create a link element to take users to the issue on github
        var issuesEl = document.createElement("a");
            issuesEl.classList = "list-item flex-row justify-space-between align-center";
            issuesEl.setAttribute("href", issues[i].html_url);
            issuesEl.setAttribute("target", "_blank");
        
        // create span to hold issue title 
        var titleEl = document.createElement("span");
            titleEl.textContent = issues[i].title;

            // append to container 
            issuesEl.appendChild(titleEl);

        //create a type element 
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or pull request 
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull Request)";            
        } else {
            typeEl.textContent = "(Issue)";
        }

        // append to container 
        issuesEl.appendChild(typeEl);

        //append links of issues from users to page  
        issueContainerEl.appendChild(issuesEl);
    }
};




var displayWarning = function(repo)  {
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit";
    
    // create a link element
    var linkEl = document.createElement("a");
        linkEl.textContent = "See More Issues on GitHub.com";
        linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
        linkEl.setAttribute("target", "_blank");

        // append to warning container 
        limitWarningEl.appendChild(linkEl);
};



getRepoName();
// global variables 
var issueContainerEl = document.querySelector("#issues-container");


// fetch repos for issues 
var getRepoIssues = function (repo){
    var apiUrl = "http://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response) {
        //request was successful
        if(response.ok){
            response.json().then(function(data){
                // pass response data to DOM function
                displayIssues(data);
            });
        } else {
            alert("There was a problem with your request!");
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
            issuesEl.setAttribute = ("href", issues[i].html_url);
            issuesEl.setAttribute = ("target", "_blank");
        
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


getRepoIssues("MichaelZimm20/git-it-done");
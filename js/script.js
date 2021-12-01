const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const repos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backToRepoGalleryBtn = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos")
const username = "wintert98";

/*-------- Async function to call API and get user data  -----------*/
const githubProfile = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    displayUser(data);
};

githubProfile();

/*--------  Function to display user data  -----------*/
const displayUser = function (data) {
   let div = document.createElement("div");
   div.classList.add("user-info");
   div.innerHTML = `   
<figure>
   <img alt="user avatar" src=${data.avatar_url} />
 </figure>
 <div>
   <p><strong>Name:</strong> ${data.name}</p>
   <p><strong>Bio:</strong> ${data.bio}</p>
   <p><strong>Location:</strong> ${data.location}</p>
   <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
 </div>`
 overview.append(div);
};

/*-------- Async function to call API and get repo list data  -----------*/
const githubRepo = async function () {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await res.json();
    //console.log(data);
    displayRepoList(data);
};
githubRepo();
/*--------  Function to display repo list data  -----------*/
const displayRepoList = function (data) {
    filterInput.classList.remove("hide");
    for(let i = 0; i < data.length; i++) {
        let li = document.createElement('li')
        li.classList.add("repo");
        li.innerHTML = `<h3>${data[i].name}</h3>`;
        repoList.append(li);

    }

};

/*--------  Event listener on repo list data  -----------*/
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText
        githubRepoInfo(repoName);
    }
});

/*-------- Async function to call API and get repo info and language data  -----------*/
const githubRepoInfo = async function (repoName) {
    const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await res.json();
    const fetchLanguages = await fetch(repoInfo.languages_url)
    const languageData = await fetchLanguages.json();
    let languages = [];
    for (let key in languageData) {
        languages.push(key);
      }

    displayRepoInfo(repoInfo, languages);
};

/*--------  Function to display repo info and language data  -----------*/
const displayRepoInfo = function (repoInfo, languages) {

    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.classList.add("repo-data");
    repoData.classList.remove("hide")
    repos.classList.add("hide");
    div.innerHTML = `
    <div>
      <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    </div>
    ` 
    repoData.append(div);
    backToRepoGalleryBtn.classList.remove("hide");
  
};

/*--------  Event listener for back to repo gallery button -----------*/
backToRepoGalleryBtn.addEventListener("click", function() {
   repos.classList.remove("hide");
   repoData.classList.add("hide");
   backToRepoGalleryBtn.classList.add("hide");
});

/*--------  Event listener for search input-----------*/
filterInput.addEventListener("input", function(e) {
    const input = e.target.value;
    const search = input.toLowerCase();
    let repoLower = "";
    const allRepos = document.querySelectorAll(".repo");
    
    for(var i = 0, repo; repo = allRepos[i]; i++) {
       repoLower = repo.innerText.toLowerCase();

       if(repoLower.includes(search) ) {

           repo.classList.remove("hide");
       } else {
           repo.classList.add("hide");
       } 
       
    }
 
 });
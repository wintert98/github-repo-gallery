const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list")
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

/*-------- Async function to call API and get repo data  -----------*/
const githubRepo = async function () {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await res.json();
    displayRepo(data);
};
githubRepo();
/*--------  Function to display repo data  -----------*/
const displayRepo = function (data) {

    for(let i = 0; i < data.length; i++) {
        let li = document.createElement('li')
        li.classList.add("repo");
        li.innerHTML = `<h3>${data[i].name}</h3>`;
        repoList.append(li);

    }

};
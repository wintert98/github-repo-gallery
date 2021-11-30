const overview = document.querySelector(".overview");
const username = "wintert98";

const githubProfile = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    displayUser(data);
    console.log(data);
};

githubProfile();

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
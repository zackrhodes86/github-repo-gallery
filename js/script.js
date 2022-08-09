const overview = document.querySelector('.overview');

const listDisplay = document.querySelector('.repo-list');
const allRepos = document.querySelector('.repos');
const repoData = document.querySelector('.repo-data');

const username = 'zackrhodes86';

//console.log(listDisplay);

//console.log(overview);
//console.log(username);

const getData = async function() {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  //    console.log(data);
  displayUserData(data);
}

//shows user data at top of the page
const displayUserData = function(data) {
  const div = document.createElement('div');
  div.innerHTML = `<figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> `
  //console.log(div.innerHTML);
  overview.append(div);
  getRepos();
}

const getRepos = async function() {
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const data = await response.json();
  console.log(data);
  displayRepos(data);
}

//take a list of repos and display them with names
const displayRepos = function(repos) {
  for (let repo of repos) {
    let li = document.createElement('li');
    li.classList.add('repo');
    li.innerHTML = `<h3>${repo.name}</h3>`
    listDisplay.append(li);
  }
}

//event listener for click on a specific repo
listDisplay.addEventListener('click', function(e){
  //console.log(e.target.value);
  if (e.target.matches("h3")){
    const repoName = e.target.innerText;
    //console.log(repoName);
    getRepoInfo(repoName);
  }

});

const getRepoInfo = async function(repoName) {

  const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`)
  const repoInfo = await response.json();
  console.log(repoInfo);

  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  console.log(languageData);
  //list of languages used in the project
  const languages = [];
  for(let language in languageData){
    languages.push(language);
  }
  console.log(languages);
  displayRepoInfo(repoInfo, languages);

}

const displayRepoInfo = function(repoInfo, languages){
  //set repo data to be empty
  repoData.innerHTML= "";
  //remove hide from repoData
  repoData.classList.remove("hide");
  allRepos.classList.add("hide");

  const div = document.createElement('div');
  div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
repoData.append(div);
}





getData();

const overview = document.querySelector('.overview');
const username = 'zackrhodes86';

console.log(overview);
console.log(username);

const getData = async function(){
  const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    console.log(data);
    displayUserData(data);
}

const displayUserData = function (data) {
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
console.log(div.innerHTML);
overview.append(div);
}
getData();

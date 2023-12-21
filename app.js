const span = document.querySelector('span');
const ul = document.querySelector('ul');
let players = [];

window.addEventListener('hashchange', function(){
    render();
});

function render(){
    span.innerHTML = players.length;
    const hash = window.location.hash;
    const id = hash.slice(1)*1;
    let filtered = players;
    if(id){
        filtered = players.filter(function(player){
            return player.id === id;
        });
    }
    const html = filtered.map(function(player){
        return`
            <li>
             <h4><a href='#${player.id}'>${player.name}</a></h4>
             <em>${player.breed}</em>
            </li>
        `;
    }).join('');
    ul.innerHTML = html;
}

render();

async function fetchPlayers(){
    const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2309-ftb-et-am/players');
    const json = await response.json();
    players = json.data.players;
    render();
}

fetchPlayers();
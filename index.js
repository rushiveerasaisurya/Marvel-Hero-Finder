const image=document.getElementById("image");
const charName=document.getElementById("name");
let description=document.getElementById("character-description");
let characterName=document.getElementById("character-name");
const characterDetails=document.getElementById("character-details");
let Name="thor";
let listContainer=document.querySelector(".list");
let showContainer=document.getElementById("show-container");

function displayWords(value){
    charName.value=value;
    removeElements();
}
function removeElements(){
    listContainer.innerHTML="";
}
charName.addEventListener("keyup",async()=>{
    removeElements();
    if(charName.value.length<3){
        return false;
    }
    const url=`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=f474a772d7b516149928118935e6e976&hash=c7e2b57c2dacb37c7eac706cf40bdddf&nameStartsWith=${charName.value}`;

    const response=await fetch(url);
    const json=await response.json();
    json.data["results"].forEach((result)=> {
        let name=result.name;
        let div=document.createElement("div");
        div.style.cursor="pointer";
        div.classList.add("autocomplete");
        div.setAttribute("onclick","displayWords('" + name + "')");
        let word="<b>"+name.substr(0, charName.value.length)+"</b>";
        word+=name.substr(charName.value.length);
        div.innerHTML =`<p class="item">${word}</p>`
        listContainer.appendChild(div);
        listContainer.style.display="inline-block"
    });
});
async function fetchdata(Name){
    if (!Name) {
        Name = charName.value.trim().toUpperCase();
        listContainer.style.display="none"
    }
    try{

        const response=await fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=f474a772d7b516149928118935e6e976&hash=c7e2b57c2dacb37c7eac706cf40bdddf&name=${Name}`)
        const json=await response.json();
        console.log(json.data.results)
        if (json.data.results.length > 0) {
            const character = json.data.results[0];
            const thumbnail = character.thumbnail;
            image.src = `${thumbnail.path}.${thumbnail.extension}`;
            characterName.textContent = character.name; 
            description.textContent = character.description || `${character.name} is introduced in films in ${character.series.items[character.series.items.length-1].name}` || "character has no description"; 
            
        } else {
            characterName.textContent = "Character not found.";
            description.textContent = "";
            image.src = " "; 
        }
    }
    catch(error){
        error=>console.log(error);
    }
}
fetchdata("thor");
document.getElementById("search").onclick = function() {
    fetchdata(); 
};

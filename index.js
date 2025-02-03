var rankUpXP = 1000;
var rankColors = ["saddlebrown", "silver", "orange", "skyblue", "turquoise","purple", "red"];
var ranks = ["Bronze Beater", "Silver Stroker", "Gold Gooner", "Diamond Diddy", "Platinum Pumper", "Obsidian Overloader", "Supreme Stroke Lord"];

var xp = localStorage.getItem("xp");
if(xp == null){
    xp = 0;
    localStorage.setItem("xp", 0);
}
var rank = Math.floor(xp / rankUpXP);
document.getElementById("xpBarRank").innerHTML = ranks[rank] + " [" + xp + "elo]";
document.getElementById("xpBarRank").style.color = rankColors[rank];
document.getElementById("xpBar").style.backgroundColor = rankColors[rank];
document.getElementById("xpBarBorder").style.border = "2px solid " + rankColors[rank];
document.getElementById("xpBar").style.width = (40 * ((xp % rankUpXP) / rankUpXP)) + "%";
function queue(){
    window.location.href = "game.html";
}
var yname = localStorage.getItem("youName");
if(yname == null){
    yname = "Enter a Name";
    localStorage.setItem("youName", "Placeholder");
}
document.getElementById("yourName").value = yname;
function newName(){
    localStorage.setItem("youName", document.getElementById("yourName").value);
}
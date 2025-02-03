import * as cb from "https://platinumblock.github.io/chillbase/chillbase.js";
const firebaseConfig = {
  apiKey: "AIzaSyDqx1O2fpIxTTBq0iFtHLElsNIMwObHzcs",
  authDomain: "rankedj.firebaseapp.com",
  projectId: "rankedj",
  storageBucket: "rankedj.firebasestorage.app",
  messagingSenderId: "582871999286",
  appId: "1:582871999286:web:7279fbe12288952f7b8997",
  measurementId: "G-10JDVFEQRN"
};
await cb.start(firebaseConfig);
var moveBank = [
["Firm Grip", "A big edge with no extra effects.", 200, 0, 0, 0, 0, 0, 1, 0], 
["Rhythmic Reset", "An edge with a bit of added streak and locked in.", 100, 0.5, 30, 0, 0, 0, 1, 0], 
["Testicle Tickle", "An edge with a bit of streak while reducing the enemy's edge.", 100, 0.7, 0, -30, 0, 0, 1, 0],
["Desperation Drive", "A large edge which locks in, but also increases enemy's edge.", 200, 0, 30, 150, 0, 0, 1, 0],
["Slippery Stroke", "A small edge which decreases enemy's streak and locked in.", 70, 0, 0, 0, -0.5, -30, 1, 0], 

["Ball Buster", "A massive edge which reduces streak and locked in.", 400, -1, -50, 0, 0, 0, 1, 1], 
["Lube Load", "Massive increase in streak and locked in.", 0, 3, 50, 0, 0, 0, 1, 1],  

["Cock Block", "Huge reduction of the enemy's edge and streak.", 0, 0, 0, -150, -1, 0, 1, 2], 
["Climax Control", "A big edge which decreases your locked in and streak, while decreasing enemy's locked in and streak.", 200, -0.6, -30, 0, -1, -40, 1, 2],

["Tip Twist", "A big edge with a reduction in streak but an increase in locked in.", 300, -1, 40, 0, 0, 0, 1, 3],
["Pleasure Precision", "An edge which locks in and increases streak, while decreasing enemy's edge.", 100, 1.5, 40, -100, 0, 0, 1, 3],

["Teasing Tactic", "A big edge while locking in and decreasing the enemy's edge.", 200, 0, 30, -150, 0, 0, 1, 4],
["Bring-A-Child", "A giant increase in both your edge and the enemy's edge, while reducing your locked in.", 800, 0, -50, 500, 0, 0, 1, 4],

["Moan Manipulator", "Consume all of your streak to gain a massive edge and lock in.", 800, -999, 80, 0, 0, 0, 1, 5],
["Friction Frenzy", "A significant edge with added streak and locked in, while decreasing enemy edge, streak, and locked in.", 150, 0.5, 50, -150, -0.5, -30, 1, 5],

["Handiwork Hero", "Gain a massive streak and lock in.", 0, 5, 200, 0, 0, 0, 1, 6],
["Vein Vortex", "A powerful edge, sacrificing your streak and locked in.", 1000, -3, -100, 0, 0, 0, 1, 6]
];
var enemies = ["The Finisher", "Stroker Ace", "Grip Master", "Throttle King", "Tugboat Captain"];
var rankColors = ["saddlebrown", "silver", "orange", "skyblue", "turquoise","purple", "red"];
var ranks = ["Bronze Beater", "Silver Stroker", "Gold Gooner", "Diamond Diddy", "Platinum Pumper", "Obsidian Overloader", "Supreme Stroke Lord"];

var edgeToWin = 1000;
var rankUpXP = 1000;

var me = 1;
var notMe = 2;

var youName = "placeholder";
var youRank = 0;
var youEdge = 0;
var youMultiplier = 1;
var youLuck = 0;
var youXP = localStorage.getItem("xp");
if(youXP == null){
  youXP = 0;
}
youXP = parseInt(youXP);
var enemyName = "placeholder";
var enemyRank = rInt(0, ranks.length);
var enemyEdge = 0;
var enemyMultiplier = 1;
var enemyLuck = 0;
var enemyXP = 0;

var currentMoves = [];
var gameOver = false;

function rInt(lower, upper){
    return Math.round(Math.floor(Math.random() * (upper - lower)) + lower);
}
function rFloat(lower, upper){
    return parseFloat((Math.random() * (upper - lower)).toFixed(1)) + lower;
}
function wN(n){
    return Math.round(n);
}
function dN(n){
    return parseFloat(n.toFixed(1));
}

function deal(){
    var cardsChosen = [];
    currentMoves = [];
    var cards = document.getElementsByClassName("card");
    for(let i = 0; i < 3; i++){
        var choice = rInt(0, moveBank.length);
        while(cardsChosen.includes(choice) || youRank < moveBank[choice][9] || rInt(0, moveBank[choice][8]) != 0){
            choice = rInt(0, moveBank.length);
        }
        var move = moveBank[choice];
        cards[i].getElementsByClassName("cardTitle")[0].innerHTML = move[0];
        cards[i].getElementsByClassName("cardDescription")[0].innerHTML = move[1];
        cards[i].getElementsByClassName("cardTitle")[0].style.color = rankColors[move[9]];
        cardsChosen.push(choice);
        currentMoves.push(move);
    }
    var cards = document.getElementsByClassName("card");
    for(let i = 0; i < cards.length; i++){
        cards[i].style.top = "75%";
    }
}
function win(){
    gameOver = true;
    document.getElementById("game").style.opacity = 0;
    setTimeout(() => {
        document.getElementById("game").style.display = "none";
    }, 1000);
    setTimeout(async() =>{
        await reset();
    }, 1000);
    var xpGain = Math.round(Math.pow(1.5, (enemyRank - youRank)) * rInt(150, 250));
    localStorage.setItem("xp", youXP + Math.min(rankUpXP * ranks.length, xpGain));
    document.getElementById("youWin").innerHTML = "You won and BUSTED!!!<br><span style = 'font-size:1.47vw;font-weight:400'>Elo Gain: " + xpGain + "</span>";
}
function lose(){
    gameOver = true;
    setTimeout(() => {
        document.getElementById("lost").style.opacity = 1;
    }, 100);
    document.getElementById("lost").style.display = "block";
    setTimeout(async() =>{
        await reset();
    }, 1000);
    var xpLoss = Math.round(Math.pow(1.5, (youRank - enemyRank)) * rInt(150, 250));
    localStorage.setItem("xp", Math.max(0, youXP - xpLoss));
    document.getElementById("youLost").innerHTML = "You lost :(<br><span style = 'font-size:1.47vw;font-weight:400'>Elo Loss: -" + xpLoss + "</span>";
}
async function move(index){
    var cards = document.getElementsByClassName("card");
    for(let i = 0; i < cards.length; i++){
        cards[i].style.top = "110%";
    }
    if(document.getElementById("move") != null){
        document.getElementById("move").remove();
    }

    var moveUsed = currentMoves[index];
    await cb.setProperty("movePlayed", moveUsed[0], "player" + me, "match");

    var changeStrings = [["Your Edge", ""], ["Your Streak", ""], ["Your Locked In", "%"], ["Enemy's Edge", ""], ["Enemy's Streak", ""], ["Enemy's Locked In", "%"]];
    var changes = [
        rInt((youLuck / 100) * moveUsed[2], moveUsed[2]) * youMultiplier,
        rFloat((youLuck / 100) * moveUsed[3], moveUsed[3]),
        rInt(0, moveUsed[4]),
        rInt((youLuck / 100) * moveUsed[5], moveUsed[5]) * youMultiplier,
        rFloat((youLuck / 100) * moveUsed[6], moveUsed[6]),
        rInt(0, moveUsed[7])
    ];
    for(let i = 0; i < changes.length; i++){
        if(i == 1 || i == 4){
            changes[i] = dN(changes[i]);
        }else{
            changes[i] = wN(changes[i]);
        }
    }

    

    await cb.setProperty("edge", Math.max(0, wN(youEdge + changes[0])), "player" + me, "match");
    await cb.setProperty("streak", Math.max(0, dN(youMultiplier + changes[1])), "player" + me, "match");
    await cb.setProperty("lockedin", Math.max(0, wN(youLuck + changes[2])), "player" + me, "match");
    await cb.setProperty("edge", Math.max(0, wN(enemyEdge + changes[3])), "player" + notMe, "match");
    await cb.setProperty("streak", Math.max(0, dN(enemyMultiplier + changes[4])), "player" + notMe, "match");
    await cb.setProperty("lockedin", Math.max(0, wN(enemyLuck + changes[5])), "player" + notMe, "match");
    await pullDB();
    await cb.setProperty("justPlayed", true, "player" + me, "match");
    if(gameOver){
      return;
    }
    updateText();

    var moveText = document.createElement("div");
    moveText.id = "move";

    var updateString = "<span style = 'font-size:1.76vw'>You used " + moveUsed[0] + "!</span><br>";
    for(let i = 0; i < changes.length; i++){
        if(changes[i] != 0){
            updateString += "<br>" + changeStrings[i][0] + ": " + (changes[i] > 0 ? "+" : "") + changes[i] + changeStrings[i][1];
        }
    }

    moveText.innerHTML = updateString;
    document.body.appendChild(moveText);


    setTimeout(() => {
      document.getElementById("enemyThinking").style.opacity = "1";
    }, 3000);

    await waitForEnemy();
}
async function pullDB(){
    youEdge = await cb.getProperty("edge", "player" + me, "match");
    if(youEdge >= edgeToWin){
        win();
        return;
    }
    youMultiplier = await cb.getProperty("streak", "player" + me, "match");
    youLuck = await cb.getProperty("lockedin", "player" + me, "match");
    enemyEdge = await cb.getProperty("edge", "player" + notMe, "match");
    if(enemyEdge >= edgeToWin){
        lose();
        return;
    }
    enemyMultiplier = await cb.getProperty("streak", "player" + notMe, "match");
    enemyLuck = await cb.getProperty("lockedin", "player" + notMe, "match");
}
var oldStats = [];
async function waitForEnemy(){
    oldStats = [youEdge, youMultiplier, youLuck, enemyEdge, enemyMultiplier, enemyLuck];
    var justPlayed = await cb.getProperty("justPlayed", "player" + notMe, "match");
    if(justPlayed){
      await cb.setProperty("justPlayed", false, "player" + notMe, "match");
      await pullDB();
      if(gameOver){
        return;
      }
      await enemyMove();
    }else{
      setTimeout(() => {
          waitForEnemy();
      }, 300)
    }
}
async function enemyMove(){
    if(document.getElementById("move") != null){
        document.getElementById("move").remove();
    }
    document.getElementById("enemyThinking").style.opacity = "0";
    var newStats = [youEdge, youMultiplier, youLuck, enemyEdge, enemyMultiplier, enemyLuck];
    var changeStrings = [["Your Edge", ""], ["Your Streak", ""], ["Your Locked In", "%"], ["Enemy's Edge", ""], ["Enemy's Streak", ""], ["Enemy's Locked In", "%"]];
    var changes = [];
    for(let i = 0; i < newStats.length; i++){
      changes.push(newStats[i] - oldStats[i]);
    }
    for(let i = 0; i < changes.length; i++){
        if(i == 1 || i == 4){
            changes[i] = dN(changes[i]);
        }else{
            changes[i] = wN(changes[i]);
        }
    }

    updateText();

    var moveText = document.createElement("div");
    moveText.id = "move";
    var movePlayed = await cb.getProperty("movePlayed", "player" + notMe, "match")
    var updateString = "<span style = 'font-size:1.76vw'>" + enemyName + " used " + movePlayed + "!</span><br>";
    for(let i = 0; i < changes.length; i++){
        if(changes[i] != 0){
            updateString += "<br>" + changeStrings[i][0] + ": " + (changes[i] > 0 ? "+" : "") + changes[i] + changeStrings[i][1];
        }
    }

    moveText.innerHTML = updateString;
    document.body.appendChild(moveText);

    setTimeout(() => {
        deal();
    }, 3000);
}

function updateText(){
    document.getElementById("youHP").style.width = (youEdge < 0 ? 0 : (20 * (youEdge / edgeToWin))) + "%";
    document.getElementById("enemyHP").style.width = (enemyEdge < 0 ? 0 : (20 * (enemyEdge / edgeToWin))) + "%";
    document.getElementById("youEdge").innerHTML = youEdge;
    document.getElementById("enemyEdge").innerHTML = enemyEdge;
    document.getElementById("youMultiplier").innerHTML = "Edging Streak: " + youMultiplier + "x";
    document.getElementById("enemyMultiplier").innerHTML = "Edging Streak: " + enemyMultiplier + "x";
    document.getElementById("youLuck").innerHTML = "Locked in: " + youLuck + "%";
    document.getElementById("enemyLuck").innerHTML = "Locked in: " + enemyLuck + "%";
    document.getElementById("youName").innerHTML = youName + " <span id = 'youRank'>[" + ranks[youRank] + " <span style = 'font-size:0.94vw'>" + youXP + "elo</span>]</span>";
    document.getElementById("youRank").style.color = rankColors[youRank];
    document.getElementById("enemyName").innerHTML = "<span id = 'enemyRank'>[" + ranks[enemyRank] + " <span style = 'font-size:0.94vw'>" + enemyXP + "elo</span>]</span> " + enemyName;
    document.getElementById("enemyRank").style.color = rankColors[enemyRank];
    document.getElementById("enemyThinking").innerHTML = enemyName + " is thinking...";
}

async function reset(){
    youEdge = 0;
    youMultiplier = 1;
    youRank = Math.floor(youXP / rankUpXP);
    youLuck = 0;
    enemyEdge = 0;
    enemyMultiplier = 1;
    enemyXP = await cb.getProperty("xp", "player" + notMe, "match");
    enemyRank = Math.floor(enemyXP / rankUpXP);
    enemyLuck = 0;
    updateText();
}

function play(){
    document.getElementById("game").style.display = "block";
    document.getElementById("lost").style.opacity = 0;
    
    setTimeout(() => {
        document.getElementById("game").style.opacity = 1;
    }, 100);
    setTimeout(() => {
        document.getElementById("lost").style.display = "none";
    }, 1000)
}
var here = await cb.getProperty("here", "player1", "match");
if(here){ //I AM PLAYER 2
  me = 2;
  notMe = 1;
  await cb.setProperty("here", true, "player2", "match");
  await cb.setProperty("name", localStorage.getItem("youName"), "player2", "match");
  await cb.setProperty("xp", youXP, "player2", "match");
  youName = await cb.getProperty("name", "player2", "match");
  enemyName = await cb.getProperty("name", "player1", "match");
  await cb.setProperty("edge", 0, "player1", "match");
  await cb.setProperty("streak", 0, "player1", "match");
  await cb.setProperty("lockedin", 0, "player1", "match");
  await cb.setProperty("edge", 0, "player2", "match");
  await cb.setProperty("streak", 0, "player2", "match");
  await cb.setProperty("lockedin", 0, "player2", "match");
  await reset();
  play();
  await waitForEnemy();
}else{ //I AM PLAYER 1
  me = 1;
  notMe = 2;
  await cb.setProperty("here", true, "player1", "match");
  await cb.setProperty("name", localStorage.getItem("youName"), "player1", "match");
  await cb.setProperty("xp", youXP, "player1", "match");
  waitForPlayer2();
}
async function waitForPlayer2(){
    here = await cb.getProperty("here", "player2", "match");
    if(here){
      youName = await cb.getProperty("name", "player1", "match");
      enemyName = await cb.getProperty("name", "player2", "match");
      await cb.setProperty("here", false, "player1", "match");
      await cb.setProperty("here", false, "player2", "match");
      await reset();
      play();
      deal();
    }else{
      setTimeout(() => {
        waitForPlayer2();
      }, 1000)
    }
}

document.addEventListener('keydown', async function(event) {
  if (event.key === 'Enter' && gameOver) {
      await cb.setProperty("here", "player1", false);
      await cb.setProperty("here", "player2", false);
      window.location.href = "index.html";
  }
});
var cardsHTML = document.getElementsByClassName("card");
for(let i = 0; i < 3; i++){
  cardsHTML[i].onclick= async() => {
    await move(i);
  };
}





var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};

var isMouseDown = false;

window.addEventListener("mousemove", function(event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

window.addEventListener("resize", function() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  initializeVariables();
});


window.addEventListener("mousedown", function() {
  isMouseDown = true;
});

window.addEventListener("mouseup", function() {
  isMouseDown = false;
});

canvas.addEventListener("touchstart", function() {
  isMouseDown = true;
});

canvas.addEventListener("touchmove", function(event) {
  event.preventDefault();
  mouse.x = event.touches[0].pageX;
  mouse.y = event.touches[0].pageY;
});

canvas.addEventListener("touchend", function() {
  isMouseDown = false;
});


function Cannon(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.angle = 0;
  this.color = color;

  this.update = function() {
    desiredAngle = Math.atan2(mouse.y - this.y, mouse.x - this.x);
    this.angle = desiredAngle;
    this.draw();  
  };

  this.draw = function() {
    c.save();
    c.translate(this.x, this.y);
    c.rotate(this.angle);
    c.beginPath();
    c.fillStyle = this.color;
    c.shadowColor = this.color;
    c.shadowBlur = 3;
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    c.fillRect(0, -this.height / 2, this.width, height);
    c.closePath();
    c.restore();
  };
}

function Cannonball(x, y, dx, dy, radius, color, cannon, particleColors) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = -dy;
  this.radius = radius;
  this.color = color;
  this.particleColors = particleColors;
  this.source = cannon;
  this.timeToLive = canvas.height / (canvas.height + 400);

  this.init = function() {
    // Initialize the cannonballs start coordinates (from muzzle of cannon)
    this.x = Math.cos(this.source.angle) * this.source.width;
    this.y = Math.sin(this.source.angle) * this.source.width;

    // Translate relative to canvas positioning
    this.x = this.x + (canvas.width / 2);
    this.y = this.y + (canvas.height);  

    // Determine whether the cannonball should be 
    // fired to the left or right of the cannon
    if (mouse.x - canvas.width / 2 < 0) {
      this.dx = -this.dx;
    }

    this.dy = Math.sin(this.source.angle) * 8;
    this.dx = Math.cos(this.source.angle) * 8;
  };

  this.update = function() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy;
    } else {
      this.dy += gravity;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();  

    this.timeToLive -= 0.01;
  };

  this.draw = function() {
    c.save();
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.shadowColor = this.color;
    c.shadowBlur = 5;
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
  };

  this.init();
}

function Particle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = -dy;
  this.radius = 5;
  this.color = color;
  this.timeToLive = 1;
  // this.mass = 0.2;

  this.update = function() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy;
    }

    if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius + this.dx < 0) {
      this.dx = -this.dx;
    }
    // this.dy += gravity * this.mass;
    this.x += this.dx;
    this.y += this.dy;
    this.draw();

    this.timeToLive -= 0.01;
  };

  this.draw = function() {
    c.save();
    c.beginPath();
    c.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
    c.shadowColor = this.color;
    c.shadowBlur = 10;
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    c.fillStyle = this.color;
    c.fill();

    c.closePath();

    c.restore();
  };
}


function Explosion(cannonball) {
  this.particles = [];  
  this.rings = [];
  this.source = cannonball;

  this.init = function() {
    for (var i = 0; i < 10; i++) {

      var dx = (Math.random() * 6) - 3;
      var dy = (Math.random() * 6) - 3;

      // var hue = (255 / 5) * i;
      // var color = "hsl(" + hue + ", 100%, 50%)";
      var randomColorIndex = Math.floor(Math.random() * this.source.particleColors.length);
      var randomParticleColor = this.source.particleColors[randomColorIndex];


        this.particles.push(new Particle(this.source.x, this.source.y, dx, dy, 1, randomParticleColor));
    }

    // Create ring once explosion is instantiated
      // this.rings.push(new Ring(this.source, "blue"));
  };

  this.init();

  this.update = function() {
    for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].update();

        // Remove particles from scene one time to live is up
        if (this.particles[i].timeToLive < 0) {
          this.particles.splice(i, 1);
        }
    }

    // Render rings
    for (var j = 0; j < this.rings.length; j++) {
      this.rings[j].update();

      // Remove rings from scene one time to live is up
        if (this.rings[j].timeToLive < 0) {
          this.rings.splice(i, 1);
        }
    }
  };
}

var gravity = 0.04;
var desiredAngle = 0;
var cannon, cannonballs, explosions, colors;

function initializeVariables() {
  cannon = new Cannon(canvas.width / 2, canvas.height, 120, 40, "white");
  cannonballs = [];
  explosions = [];
  colors = [
    {
      cannonballColor: "#fff",
      particleColors: [
        "#fff",
      ]
    }
  ];
}

initializeVariables();

var timer = 0;


function animate() {
  window.requestAnimationFrame(animate);

  c.fillStyle = "rgba(18, 18, 18, 0.2)";
  c.fillRect(0, 0, canvas.width, canvas.height);      
  cannon.update();

  // Render cannonballs
  for (var i = 0; i < cannonballs.length; i++) {
      cannonballs[i].update();

      if (cannonballs[i].timeToLive <= 0) {

        // Create particle explosion after time to live expires
        explosions.push(new Explosion(cannonballs[i]));

        cannonballs.splice(i, 1);

      }
  }

  // Render explosions
  for (var j = 0; j < explosions.length; j++) {
        //Do something
        explosions[j].update();

      // Remove explosions from scene once all associated particles are removed
      if (explosions[j].particles.length <= 0) {
        explosions.splice(j, 1);
      }
  } 


  if (isMouseDown === true) {
    timer += 1;
    if (timer % 3 === 0) {
      var randomParticleColorIndex = Math.floor(Math.random() * colors.length);
      var randomColors = colors[randomParticleColorIndex];

      cannonballs.push(new Cannonball(mouse.x, mouse.y, 2, 2, 4, randomColors.cannonballColor, cannon, randomColors.particleColors));
    }
  }
}

animate();
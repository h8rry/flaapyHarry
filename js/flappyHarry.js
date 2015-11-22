// Global variables
$(document).ready(function(){
  var timer;
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var w=$('#canvas').width();
  var h=$('#canvas').height();
  var harryX = (w/2)-10;
  var harryPosition = {x: harryX, y: h/3};
  var harryVelocity = {y: 0};
  var harrySize = {x: 20, y: 50};
  var acceleration = 5;
  var timeInterval = 10; //ms
  var timer;
  var asteroids = [];
  var harryImage = new Image();
  var asteroidImage = new Image();
  var score = 0;
  var highScore = 0;
  harryImage.src = "images/Harrynaut.png"
  asteroidImage.src = "images/asteroid.png"

  function initHarry () {
    ctx.fillStyle = "white";
    ctx.drawImage(harryImage,harryPosition.x,harryPosition.y,harrySize.x,harrySize.y);
  };

  function moveHarry () {
    // if ((harryPosition.y + harrySize.y) > h ) {
    //   clearInterval(timer);
    // };
    ctx.clearRect(harryPosition.x,harryPosition.y-1,harrySize.x,harrySize.y+2);
    harryVelocity.y += acceleration * timeInterval / 1000;
    harryPosition.y += harryVelocity.y;
    if (harryPosition.y < 0) {
      harryPosition.y = 0;
      harryVelocity.y = 0;
    } else if ((harryPosition.y + harrySize.y) > h) {
      harryPosition.y = h - harrySize.y;
    }
    ctx.drawImage(harryImage,harryPosition.x,harryPosition.y,harrySize.x,harrySize.y);
    // console.log(harryVelocity.y);
  };

  function makeAsteroid () {
    var asteroid = {
      "position": {},
      "velocity": {}
    };
    asteroid["size"] = 30;
    asteroid["position"]["y"] = Math.floor(Math.random() * (h - asteroid.size));
    asteroid["position"]["x"] = w;
    asteroid["velocity"]["x"] = -(Math.random()) * 2;
    if (asteroid.velocity.x > -0.6) {
      asteroid.velocity.x = -0.6;
    };
    asteroids.push(asteroid);
  };

  function moveAsteroids () {
    for (i=0; i<asteroids.length; i++) {
      if (asteroids[i].position.x < harryPosition.x + harrySize.x) {
        if (asteroids[i].position.x + asteroids[i].size > harryPosition.x) {
          console.log("crossing harry x");
          if (asteroids[i].position.y < harryPosition.y + harrySize.y) {
            if (asteroids[i].position.y + asteroids[i].size > harryPosition.y) {
              console.log("collision");
              clearInterval(timer);
              if (score > highScore) {
                highScore = score;
                $("#highScore").text(Math.floor(highScore));
              }
            }
          }
        }
      }
      ctx.clearRect(asteroids[i].position.x,asteroids[i].position.y,asteroids[i].size+1,asteroids[i].size);
      asteroids[i].position.x += asteroids[i].velocity.x;
      if (asteroids[i].position.x + asteroids[i].size < 0) {
        asteroids.splice(i,1);
        i--;
      } else {
        ctx.drawImage(asteroidImage,asteroids[i].position.x,asteroids[i].position.y,asteroids[i].size,asteroids[i].size);
      };
    };
  };

  function increaseScore() {
    score += 0.1;
    $("#score").text(Math.floor(score));
  }

  initHarry();

  $(document).keyup(function(e){
    if (e.keyCode == 32) {
      harryVelocity.y = -3;
    }
  });

  $(document).on("click touchstart","#canvas", function() {
    harryVelocity.y = -3;
  });

  timer = setInterval(function(){
    increaseScore();
    if (asteroids.length === 0) {
      makeAsteroid();
    } else if (asteroids.length < 7) {
      if (Math.random()<0.01) {
        makeAsteroid();
      }
    }
    moveAsteroids();
    moveHarry();
  }, timeInterval);

});

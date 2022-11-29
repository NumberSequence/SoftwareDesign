//retrypush

//console.log('here')

//object.onclick = function(){myScript};
sendalert = true;
//document.addEventListener("DOMContentLoaded", function () {
let tileDivs = document.querySelectorAll(".TVtile");
let thumbs = document.querySelectorAll(".preview .pic");
let vids = document.querySelectorAll("video");

tileDivs.forEach((group) => {
  group.addEventListener("click", function () {
    // let thumbnails = document.querySelectorAll(".doclist");
    //  alert(thumbnails);
    console.log("is this workin");
    //generates random number between 0 and 4
    //let randomColorIndex = Math.floor(Math.random() * colors.length);
    //let randomColor = colors[randomColorIndex];
    //group.style.display = block;
    //group.querySelectorAll("div").classList.remove("hidethis");
    //group.querySelectorAll("div").classList.add("showthis");
    // group.firstElementChild.style.display = "block";
    group.firstElementChild.classList.remove("hidethis");
    group.firstElementChild.classList.add("showthis");
    group.firstElementChild.classList.add("more");
  });
});

let homeButton = document.getElementById("homeIcon");
homeButton.addEventListener("click", function () {
  tileDivs.forEach((group) => {
    group.firstElementChild.classList.remove("showthis");
    group.firstElementChild.classList.remove("more");
    group.firstElementChild.classList.add("hidethis");
  });
  thumbs.forEach((thing) => {
    //    thing.firstElementChild.classList.remove("showthis");
    //    thing.firstElementChild.classList.add("hidethis");
    thing.nextElementSibling.classList.remove("showthis");
    thing.nextElementSibling.classList.add("hidethis");
    thing.nextElementSibling.pause();
  });
});

homeButton.addEventListener("mouseover", function () {
  if (sendalert && document.querySelector(".showthis #music") !== null) {
    alert(
      "Just an FYI that music will continue to play if it's not stopped.\n\n" +
        "I'm all for the background music but don't want you to get annoyed with it.\n\n" +
        "Alerts can also be annoying, so I promise not to mention it again... unless you refresh."
    );

    sendalert = false;
  }
});

thumbs.forEach((thing) => {
  thing.addEventListener("click", function () {
    console.log("is this workin");
    // alert("x");
    changeit = thing.nextElementSibling;
    changeit.classList.remove("hidethis");
    changeit.classList.add("showthis");
    changeit.play();
    //alert("x");
    //thing.firstElementChild.classList.add("more");
  });
});

vids.forEach((vid) => {
  vid.addEventListener("click", function () {
    if (!vid.paused) {
      vid.pause();
    } else {
      vid.play();
    }
  });
});

//});
/*
function setup(){
    createCanvas(400, 400);
    background(240, 240, 240);
    console.log('it worked');
    circle(width/2, height/2, 40);
}

function draw(){
  //  console.log('this is another one');
  noStroke();
  fill('blue');
  circle(mouseX, mouseY, 40);
  fill('red');
  circle(width/2, height/2, 40);
    //noLoop();
}
*/
/* function setup() {
    createCanvas(720, 400);
    background(230);
    strokeWeight(2);
  }
  
  function draw() {
    background(230);
    if (mouseIsPressed) {
      stroke(255);
    } else {
      stroke(237, 34, 93);
    }
     line(mouseX - 66, mouseY, mouseX + 66, mouseY);
    // line(mouseX, mouseY - 66, mouseX, mouseY + 66);
  } */
/* 
let colorlist = ["gold", "yellow", "turquoise", "red"];

function setup() {
    //this function runs once when the webpage is loaded
    //within this function, you can use p5
    createCanvas(windowWidth * 0.8, windowHeight * 0.8);
    background(255);
}

function draw() {
    //this functions runs many times every second!
    //within this function, you can use p5 syntax
    noStroke();
    fill(random(colorlist));
    ellipse(mouseX, mouseY, 25, 25);
}
 */

//outside of the setup and draw functions (which are automatically called) - the rest of your code here is plain old javascript

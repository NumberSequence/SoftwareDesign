history.scrollRestoration = "manual";
var track = document.querySelector("audio");
console.log(track);

var lyrics = document.querySelectorAll(".line");
console.log(lyrics);
lyrics.forEach((group) => {
  group.addEventListener("click", function () {
    track.currentTime = group.getAttribute("marker");
    console.log(group.getAttribute("marker"));
    track.play();
  });
});

console.log("ready");

colors = ["azure", "red", "blue", "lightgray", "yellow"];

var leftBack = document.querySelector("#leftside");
var rightBack = document.querySelector("#rightside");

colorChange = function () {
  color1 = colors[Math.floor(Math.random() * colors.length)];
  color2 = colors.filter((color) => color != color1)[
    Math.floor(Math.random() * (colors.length - 1))
  ];
  document.querySelector("#leftside").style["background-image"] =
    "linear-gradient(to right, " + color1 + ", " + color2 + ")";

  document.querySelector("#rightside").style["background-color"] = color2;
};

leftBack.addEventListener("click", colorChange);
rightBack.addEventListener("click", colorChange);

firstscroll = true;

window.addEventListener("scroll", () => {
  if (firstscroll) {
    alert(
      "Thanks for exploring!" +
        "\n...well technically you only scrolled but still..." +
        "\nFeel free to click around and 'explore' some more!"
    );
  }
  // console.log("Scroll count " + firstscroll);
  firstscroll = false;
});

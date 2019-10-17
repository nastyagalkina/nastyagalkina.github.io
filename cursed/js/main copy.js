$(document).ready(function() {
  $("button[filter]").click(function() {
    if ($(this).attr("filter") != "all") {
      $(".filter>div[filter != '" + $(this).attr("filter") + "']").hide(350);
      $(".filter>div[filter = '" + $(this).attr("filter") + "']").show(350);
    } else {
      $(".filter>div").show(350);
    }
  });
  $("#navigation").on("click", "a", function(event) {
    event.preventDefault();
    var id = $(this).attr("href"),
      top = $(id).offset().top;
    $("body,html").animate({ scrollTop: top }, 800);
  });
});

function tick() {
  let curTime = new Date();
  let hours = 23 - curTime.getHours();
  if (hours < 10) hours = "0" + hours;
  let minutes = 59 - curTime.getMinutes();
  if (minutes < 10) minutes = "0" + minutes;
  let seconds = 59 - curTime.getSeconds();
  if (seconds < 10) seconds = "0" + seconds;
  document.getElementById("h").innerHTML = hours + " : ";
  document.getElementById("m").innerHTML = minutes + " : ";
  document.getElementById("s").innerHTML = seconds;
}

setInterval(tick, 1000);

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("topButton").style.display = "block";
  } else {
    document.getElementById("topButton").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

new WOW().init();

raveAudio = document.getElementById("audioRave");
raveAudio.volume = 0.0;

// raveDistance = document.getElementById("team").getBoundingClientRect().top; //расстояние до рейва в момент обновления (расстояние от верха viewport до рейва)

function startTheRave() {
  raveDistanceZero = (
    document.getElementById("team").getBoundingClientRect().y + //расстрояние от верха документа до рейва (расстояние от верха viewport до рейва + сдвиг от верха страницы)
    window.pageYOffset
  ).toFixed(2);
  console.log("RaveDZ :" + raveDistanceZero);
}

setTimeout(startTheRave, 2000);

function changeAudioVolume() {
  raveDistance = document
    .getElementById("team")
    .getBoundingClientRect()
    .top.toFixed(2); //новое расстояние от верха viewport до рейва
  relativeDistance = (raveDistance / raveDistanceZero).toFixed(2);
  console.log("RaveD: " + raveDistance + "; RelD: " + relativeDistance);
  console.log(raveAudio.volume);
  if (relativeDistance > 1 && raveDistance > 1) {
    relativeDistance = 1;
  }
  if (relativeDistance > 0 && relativeDistance < 1) {
    raveAudio.volume = 1 - relativeDistance;
  } else if (relativeDistance == 1.0) {
    raveAudio.volume = 0.0;
  } else if (relativeDistance == 0) {
    raveAudio.volume = 1.0;
  } else if (relativeDistance < 0) {
    raveAudio.volume = 1 - -relativeDistance;
  }
  raveDistance = document.getElementById("team").getBoundingClientRect().top; //новое расстояние до рейва
  relativeDistance = (raveDistance / raveDistanceZero).toFixed(2); //новое относительное расстояние
}
setInterval(changeAudioVolume, 125);

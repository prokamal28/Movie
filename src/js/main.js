// let movie = `https://api.themoviedb.org/3/${term}?api_key=accd0de83c32f42bb60222a8a8d8a6b7&language=en-US&include_adult=false`;
let passw;
getMovie();

async function getMovie() {
  document.getElementById("load").classList.replace("hidden", "block");

  let myHttp = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=ee955fa6b3cce9e4c4676324361e17f0`
  );
  let data = await myHttp.json();
  let x = data.results;
  document.getElementById("load").classList.replace("block", "hidden");
  displayData(x);
}

async function getPopularMovie() {
  document.getElementById("load").classList.replace("hidden", "block");

  let myHttp = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=ee955fa6b3cce9e4c4676324361e17f0`
  );
  let data = await myHttp.json();
  let x = data.results;
  document.getElementById("load").classList.replace("block", "hidden");

  displayData(x);
}

async function getTopMovie() {
  document.getElementById("load").classList.replace("hidden", "block");

  let myHttp = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=ee955fa6b3cce9e4c4676324361e17f0`
  );
  let data = await myHttp.json();
  let x = data.results;
  document.getElementById("load").classList.replace("block", "hidden");

  displayData(x);
}

async function getTrendMovie() {
  document.getElementById("load").classList.replace("hidden", "block");

  let myHttp = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=ee955fa6b3cce9e4c4676324361e17f0`
  );
  let data = await myHttp.json();
  let x = data.results;
  document.getElementById("load").classList.replace("block", "hidden");

  displayData(x);
}

async function getUpcomingMovie() {
  document.getElementById("load").classList.replace("hidden", "block");

  let myHttp = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=ee955fa6b3cce9e4c4676324361e17f0`
  );
  let data = await myHttp.json();
  let x = data.results;
  document.getElementById("load").classList.replace("block", "hidden");

  displayData(x);
}

function displayData(x) {
  let box = "";
  for (let i = 0; i < x.length; i++) {
    box += `
        <div class="card w-full md:w-1/2 lg:w-1/3 relative group p-3">
          <figure class="overflow-hidden">
            <img src="https://image.tmdb.org/t/p/w500/${x[i].poster_path}" alt="" class="w-full transition-all duration-500 group-hover:rotate-12 group-hover:scale-125" />
          </figure>

          <figcaption class="bg-black bg-opacity-50 absolute top-0 bottom-0 left-3 right-0 hidden flex-col  justify-around p-3 group-hover:flex">
            <h2 class="self-center capitalize animate__animated animate__fadeInDown">${x[i].original_title}</h2>
            <p class="animate__animated animate__flipInX  whitespace-nowrap overflow-ellipsis overflow-hidden">
                ${x[i].overview}
            </p>
            <p class="capitalize animate__animated animate__fadeInUp">relese date : <span>${x[i].release_date}</span></p>
            <div class="is animate__animated animate__fadeInUp text-rose-600">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
            <h3 class="animate__animated animate__fadeInUp border-2 border-green-600 w-12 h-12 flex items-center justify-center rounded-full">
            ${x[i].vote_average}
            </h3>
          </figcaption>
        </div>
        `;
  }
  //   $(".cards").html(box);
  document.getElementById("cards").innerHTML = box;
}

$(".now").click(() => {
  getMovie();
});

$(".pop").click(() => {
  getPopularMovie();
});

$(".top").click(() => {
  getTopMovie();
});

$(".trend").click(() => {
  getTrendMovie();
});

$(".upcome").click(() => {
  getUpcomingMovie();
});

$(window).scroll(() => {
  if ($(window).scrollTop() > 200) {
    $(".backTop").fadeIn(500).css("display", "flex");
  } else {
    $(".backTop").fadeOut(500);
  }
});

$(".backTop").click(() => {
  $(window).scrollTop(0);
});

$("#close").click(() => {
  $("#sideHide").toggle(500);
});

async function getSearchMovie(name) {
  let myHttp = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${name}&api_key=ee955fa6b3cce9e4c4676324361e17f0`
  );
  let data = await myHttp.json();
  let x = data.results;
  displayData(x);
}

document.getElementById("search").addEventListener("input", (e) => {
  getSearchMovie(e.data);
});

document.getElementById("nameUser").addEventListener("change", (e) => {
  validFormInp(e.target);
});

document.getElementById("emal").addEventListener("change", (e) => {
  validFormInp(e.target);
});

document.getElementById("phon").addEventListener("change", (e) => {
  validFormInp(e.target);
});

document.getElementById("age").addEventListener("change", (e) => {
  validFormInp(e.target);
});

document.getElementById("pass").addEventListener("change", (e) => {
  validFormInp(e.target);
  passw = e.target.value;
});

document.getElementById("rePass").addEventListener("change", (e) => {
  if (e.target.value == passw) {
    $(`#${e.target.id}`).next().toggleClass("text-green-400");
    $(`#${e.target.id}`).next().removeClass("text-red-400");
  } else {
    $(`#${e.target.id}`).next().toggleClass("text-red-400");
    $(`#${e.target.id}`).next().removeClass("text-green-400");
  }
});

function validFormInp(ele) {
  let regex = {
    nameUser: /^[A-Z][a-z]{2,10}/,
    emal: /^[a-zA-Z0-9]{2,25}@[a-zA-Z]{3,10}(.com)$/gm,
    phon: /^[0-9]{11}/gm,
    age: /^\d{1,2}$/gm,
    pass: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    rePass: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  };

  let isVAlid = regex[ele.id].test(ele.value);

  if (isVAlid) {
    $(`#${ele.id}`).next().toggleClass("text-green-400");
    $(`#${ele.id}`).next().removeClass("text-red-400");
    return true;
  } else {
    $(`#${ele.id}`).next().toggleClass("text-red-400");
    $(`#${ele.id}`).next().removeClass("text-green-400");
    return false;
  }
}

document.getElementById("btn").addEventListener("click", () => {
  if (validFormInp == true) {
    $(`#btn`).mouseenter(stopMove);
  } else {
    $(`#btn`).mouseenter(mouseMove);

  }
});

function mouseMove() {
  let btnLocat = $(`#btn`).css("marginLeft");
  if (btnLocat == "250px") {
    $(`#btn`).css({ marginLeft: "0px" });
  } else {
    $(`#btn`).css({ marginLeft: "250px" });
  }
}
function stopMove() {
  $("#btn").off("mouseenter", mouseMove);
  $(`#btn`).css({ marginLeft: "0px" });
}

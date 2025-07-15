const button = document.querySelector("#button");

button.addEventListener("click", function () {
  const input = document.querySelector("#input");
  const temp = getAnime(input.value);
});

let temp = getAnime("anime");
function getAnime(temp) {
  fetch("https://api.jikan.moe/v4/anime?q=" + temp)
    .then((resolve) => resolve.json())
    .then((resolve) => {
      const hasil = resolve.data;
      let html = "";
      hasil.forEach((m) => {
        html += card(m);
      });
      const list = document.querySelector(".list");
      list.innerHTML = html;
    });
}

function card(m) {
  return `<div class="card mt-10 bg-base-100 w-96 shadow-sm">
    <figure>
        <img
        src="${m.images.jpg.image_url}"
        alt="Anime" />
        </figure>
        <div class="card-body">
        <h2 class="card-title"  maxlength="10">
        <span class="text-2xl">${
            m.titles[0].title.length > 30
            ? m.titles[0].title.slice(0, 30) + "..."
            : m.titles[0].title
        } </span>
        <div class="badge badge-secondary">${m.type}</div>
        </h2>
        <h3>${m.titles[1].title}</h3></h3>
        <p class="text-gray-800 text-xl">Episode : ${m.episodes}</p>
        <div class="flex">
        <p>⭐ ${m.score}, Date : ${m.year}</p>
        </div>
        <div class="card-actions justify-end">
        <button onclick='wistlist(${JSON.stringify(
            m.titles[0].title
        )})' class="btn btn-outline btn-error">Add +</button>
        </div>
        </div>
        </div>`;
}

function wistlist(i) {
  let title = i;
  let trash = localStorage.getItem("key");
  const listArr = trash ? trash.split(",") : [];

  if (listArr.includes(title)) {
    alert("anime sudah di tambahkan");
  } else {
    listArr.push(title);
    localStorage.setItem("key", listArr.join(","));
    console.log(listArr);
  }
}

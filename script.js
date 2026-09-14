const artistCards = document.querySelectorAll(".artist-card");
const hero = document.getElementById("hero");
const artists = document.getElementById("artists");
const artistDetail = document.getElementById("artist-detail");
const backButton = document.getElementById("back-button");

const detailName = document.getElementById("detail-name");
const detailGenre = document.getElementById("detail-genre");
const detailOrigin = document.getElementById("detail-origin");
const detailFormed = document.getElementById("detail-formed");
const detailBio = document.getElementById("detail-bio");
const detailImage = document.getElementById("detail-image");
const detailFounding = document.getElementById("detail-founding");
const detailCurrent = document.getElementById("detail-current");
const detailFormer = document.getElementById("detail-former");
const detailStatus = document.getElementById("detail-status");
const detailWebsite = document.getElementById("detail-website");

artistCards.forEach((card) => {
  card.addEventListener("click", async () => {
    const artistName = card.dataset.artist;

    const url =
      "https://student-data-api.mwwainwright1014-9d9.workers.dev/api/v1/datasets/pulse-artists/records?search=" +
      encodeURIComponent(artistName);

    const response = await fetch(url);
    const data = await response.json();
    const artist = data.records[0];

    detailName.textContent = artist.artist_name;
    detailGenre.textContent = "Genre: " + artist.genre;
    detailOrigin.textContent = "Origin: " + artist.origin;
    detailFormed.textContent = "Formed: " + artist.formed_year;
    detailFounding.textContent = "Founding members: " + artist.founding_members;
    detailCurrent.textContent = "Current members: " + artist.current_members;
    detailFormer.textContent = "Notable former members: " + artist.notable_former_members;
    detailStatus.textContent = "Status: " + artist.status;
    detailImage.src = artist.image_url;
    detailImage.alt = artist.artist_name + " image";
    detailWebsite.href = artist.official_url;
    detailBio.textContent = "Bio: " + artist.bio;

    hero.hidden = true;
    artists.hidden = true;
    artistDetail.hidden = false;
  });
});

backButton.addEventListener("click", () => {
  artistDetail.hidden = true;
  hero.hidden = false;
  artists.hidden = false;
});
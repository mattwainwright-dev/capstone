// Select the artist cards and main page sections so JavaScript can control the user interaction.
const artistCards = document.querySelectorAll(".artist-card");
const hero = document.getElementById("hero");
const artists = document.getElementById("artists");
const artistDetail = document.getElementById("artist-detail");
const backButton = document.getElementById("back-button");

// Select each artist-detail element that will be filled with data returned from the API.
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

// Track the currently playing audio so it can be stopped before another song starts.
let currentAudio = null;

// Add a click event listener to every artist card and run the data-loading process when one is selected.
artistCards.forEach((card) => {
  card.addEventListener("click", async () => {

// Read the selected artist name from the card's data-artist attribute.
    const artistName = card.dataset.artist;

// Clone the selected card and record its position to create the flying-card transition.
    const cardRect = card.getBoundingClientRect();
    const flyingCard = card.cloneNode(true);

    flyingCard.classList.add("flying-card");

    flyingCard.style.left = cardRect.left + "px";
    flyingCard.style.top = cardRect.top + "px";
    flyingCard.style.width = cardRect.width + "px";
    flyingCard.style.height = cardRect.height + "px";

document.body.appendChild(flyingCard);

// Build the API request URL using the selected artist name as the search value.
    const url =
      "https://student-data-api.mwwainwright1014-9d9.workers.dev/api/v1/datasets/pulse-artists/records?search=" +
      encodeURIComponent(artistName);

// Fetch the artist record from the API and convert the JSON response into JavaScript data.
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

// Use the first matching record returned by the API as the selected artist.
    const artist = data.records[0];

    console.log(artist);

// Stop the function if the API does not return a matching artist record.
    if (!artist) {
      console.log("No artist found.");
      return;
    }

// Stop and reset any audio that is already playing before starting the selected artist's clip.
  if (currentAudio) {
   currentAudio.pause();
   currentAudio.currentTime = 0;
}

// Create and play the selected artist's audio clip from the URL stored in the dataset.
  currentAudio = new Audio(artist.audio_url);
  currentAudio.volume = 0.50;
  currentAudio.play();

// Render the selected artist's API data into the profile elements on the page.
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

// Hide the hero and artist cards, then reveal the completed artist profile.
  hero.hidden = true;
  artists.hidden = true;
  artistDetail.hidden = false;

  artistDetail.scrollIntoView({
  behavior: "smooth",
  block: "start"
});

// Trigger the profile entrance and flying-card CSS animations.
  artistDetail.classList.add("profile-enter");
  flyingCard.classList.add("fly-away");

// Remove the temporary animation classes and cloned card after the transition finishes.
  setTimeout(() => {
  flyingCard.remove();
  artistDetail.classList.remove("profile-enter");
  }, 700);  
  });
});

// Return to the artist selection screen and stop any audio when the Back button is clicked.
backButton.addEventListener("click", () => {
  if (currentAudio) {
  currentAudio.pause();
  currentAudio.currentTime = 0;
}
  artistCards.forEach((card) => card.classList.remove("is-flipping"));
  artistDetail.hidden = true;
  hero.hidden = false;
  artists.hidden = false;
});
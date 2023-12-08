// Banner

async function fetchBannerData() {
  try {
    const response = await fetch(
      "http://ec2-13-233-129-161.ap-south-1.compute.amazonaws.com:8080/v1/banner/getall"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching banner data:", error);
    return [];
  }
}

async function createBannerSlides() {
  const slider = document.querySelector(".slider");
  const bannerData = await fetchBannerData();

  bannerData.forEach((banner) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    const image = document.createElement("img");
    image.src = banner.Banner_location;
    image.alt = banner.bannerKey;
    slide.appendChild(image);
    slider.appendChild(slide);
  });
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.style.width = sidebar.style.width === "250px" ? "0" : "250px";
}

document.addEventListener("DOMContentLoaded", async function () {
  await createBannerSlides();

  const slider = document.querySelector(".slider");
  let isTransitioning = false;

  function nextSlide() {
    if (!isTransitioning) {
      isTransitioning = true;
      const currentSlide = document.querySelector(".slide:first-child");
      slider.style.transition = "transform 0.5s ease-in-out";
      slider.style.transform = "translateX(-100%)";

      setTimeout(() => {
        slider.style.transition = "none";
        slider.appendChild(currentSlide);
        slider.style.transform = "translateX(0)";
        isTransitioning = false;
      }, 500);
    }
  }

  setInterval(nextSlide, 3000); // Change slide every 3 seconds (adjust as needed)
});

// Audio

document.addEventListener("DOMContentLoaded", function () {
  // Fetch data from the API using HTTPS
  fetch("http://ec2-13-233-129-161.ap-south-1.compute.amazonaws.com:8080/v1/audio/allsongs")
      .then((response) => response.json())
      .then((data) => {
          // Process the data and create music cards
          const musicRow = document.getElementById("musicRow");

          data.getallsongs.forEach((song) => {
              const musicCard = document.createElement("div");
              musicCard.className = "music-card col-4";
              musicCard.innerHTML = `
                  <img src="${song.Banner_location}" alt="${song.Musictitle}" onclick="playSong('${song.Audio_location}')"/>
                  <h5>${song.Musictitle}</h5>
                  <p>${song.artist}</p>
              `;
              musicRow.appendChild(musicCard);
          });
      })
      .catch((error) => console.error("Error fetching music data:", error));
});

function playSong(audioUrl) {
  // Open the music player page and pass the audio URL
  window.location.href = `music-player.html?audioUrl=${encodeURIComponent(audioUrl)}`;
}


// Articles

document.addEventListener("DOMContentLoaded", function () {
  const articleContainer = document.getElementById("articleContainer");

  async function fetchArticles() {
    try {
      const response = await fetch(
        "http://ec2-13-233-129-161.ap-south-1.compute.amazonaws.com:8080/v1/article/getall"
      );
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        renderArticles(data);
      } else {
        console.error("No articles found.");
      }
    } catch (error) {
      console.error("Error fetching article data:", error);
    }
  }

  function renderArticles(articles) {
    articleContainer.innerHTML = ""; // Clear previous content

    articles.forEach((article, index) => {
      const bannerImage = document.createElement("img");
      bannerImage.src = article.Banner_location;
      bannerImage.alt = article.ArticleTitle;

      const titleElement = document.createElement("h2");
      titleElement.textContent = article.ArticleTitle;

      const articleDiv = document.createElement("div");
      articleDiv.classList.add("article");

      const contentElement = document.createElement("p");
      contentElement.textContent = article.content;

      articleDiv.appendChild(titleElement);
      articleDiv.appendChild(bannerImage);
      articleDiv.appendChild(contentElement);

      // Add click event listener to redirect to the full article
      articleDiv.addEventListener("click", function () {
        redirectToFullArticle(article._id);
      });

      articleContainer.appendChild(articleDiv);
    });
  }

  function redirectToFullArticle(articleId) {
    // Redirect to the full article view
    window.location.href = `full_article.html?id=${articleId}`;
  }

  // Fetch articles from the API and render them
  fetchArticles();
});

// Magazines

document.addEventListener("DOMContentLoaded", function () {
  const magazineContainer = document.getElementById("magazineContainer");

  async function fetchMagazines() {
      try {
          const response = await fetch("http://ec2-13-233-129-161.ap-south-1.compute.amazonaws.com:8080/v1/magazine/getall");
          const data = await response.json();

          if (Array.isArray(data) && data.length > 0) {
              renderMagazines(data);
          } else {
              console.error("No magazines found.");
          }
      } catch (error) {
          console.error("Error fetching magazine data:", error);
      }
  }

  function renderMagazines(magazines) {
      magazineContainer.innerHTML = ""; // Clear previous content

      magazines.forEach((magazine, index) => {
          const magazineDiv = document.createElement("div");
          magazineDiv.classList.add("magazine");

          const titleElement = document.createElement("h2");
          titleElement.textContent = magazine.MagazineTitle;

          const descriptionElement = document.createElement("p");
          descriptionElement.textContent = magazine.description;

          const bannerImage = document.createElement("img");
          bannerImage.src = magazine.Banner_location;
          bannerImage.alt = magazine.MagazineTitle;

          magazineDiv.appendChild(titleElement);
          magazineDiv.appendChild(bannerImage);
          magazineDiv.appendChild(descriptionElement);

          // Add click event listener to redirect to the magazine details
          magazineDiv.addEventListener("click", function () {
              redirectToMagazineDetails(magazine._id);
          });

          magazineContainer.appendChild(magazineDiv);
      });
  }

  function redirectToMagazineDetails(magazineId) {
      // Redirect to the magazine details view
      window.location.href = `magazine_details.html?id=${magazineId}`;
  }

  // Fetch magazines from the API and render them
  fetchMagazines();
});

// Videos

document.addEventListener("DOMContentLoaded", function () {
  // Fetch data from the API using HTTPS
  fetch(
    "http://ec2-13-233-129-161.ap-south-1.compute.amazonaws.com:8080/v1/video/getall"
  )
    .then((response) => response.json())
    .then((data) => {
      // Process the data and create music cards
      const musicContainer = document.getElementById("videoContainer");

      data.forEach((video) => {
        const videoCard = document.createElement("div");
        videoCard.className = "music-card col-4";
        videoCard.innerHTML = `
        <div class="articles-card col-6">
      <img src="#" alt="">
      <h5>${video.VideoTitle} </h5>
      <p>${video.description}  </p>
  </div>
      `;
        videoContainer.appendChild(videoCard);
      });
    })
    .catch((error) => console.error("Error fetching music data:", error));
});
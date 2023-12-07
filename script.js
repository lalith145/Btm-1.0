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
  fetch(
    "http://ec2-13-233-129-161.ap-south-1.compute.amazonaws.com:8080/v1/audio/getall"
  )
    .then((response) => response.json())
    .then((data) => {
      // Process the data and create music cards
      const musicRow = document.getElementById("musicRow");

      data.getallsongs.forEach((song) => {
        const musicCard = document.createElement("div");
        musicCard.className = "music-card col-4";
        musicCard.innerHTML = `
            <img src="${song.Banner_location}" alt="${song.Musictitle}" />
            <h5>${song.Musictitle}</h5>
            <p>${song.artist}</p>
          `;
        musicRow.appendChild(musicCard);
      });
    })
    .catch((error) => console.error("Error fetching music data:", error));
});

// Articles

document.addEventListener("DOMContentLoaded", function () {
  // Fetch data from the API using HTTPS
  fetch(
    "http://ec2-13-233-129-161.ap-south-1.compute.amazonaws.com:8080/v1/article/getall"
  )
    .then((response) => response.json())
    .then((data) => {
      // Process the data and create article cards
      const articleContainer =
        document.getElementById("articleContainer");

      data.forEach((article) => {
        const articleCard = document.createElement("div");
        articleCard.className = "articles-card col-6";
        articleCard.innerHTML = `
        <img src="${article.Banner_location}" alt="${article.ArticleTitle}" />
        <h5>${article.ArticleTitle}</h5>
        <p>${article.content}</p>
      `;
        articleContainer.appendChild(articleCard);
      });
    })
    .catch((error) =>
      console.error("Error fetching article data:", error)
    );
});

// Magazines

document.addEventListener("DOMContentLoaded", function () {
  // Fetch data from the API using HTTPS
  fetch(
    "http://ec2-13-233-129-161.ap-south-1.compute.amazonaws.com:8080/v1/magazine/getall"
  )
    .then((response) => response.json())
    .then((data) => {
      // Process the data and create magazine cards
      const magazineContainer =
        document.getElementById("magazineContainer");

      data.forEach((magazine) => {
        const magazineCard = document.createElement("div");
        magazineCard.className = "magazines-wrapper mb-3";
        magazineCard.innerHTML = `
        <img src="${magazine.Banner_location}" alt="${magazine.MagazineTitle}" />
        <div>
          <h5>${magazine.MagazineTitle}</h5>
          <p>Open in PDF</p>
        </div>
      `;
        magazineContainer.appendChild(magazineCard);
      });
    })
    .catch((error) =>
      console.error("Error fetching magazine data:", error)
    );
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
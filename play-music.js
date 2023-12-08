// Global variables
let now_playing, track_art, track_name, track_artist, playpause_btn, next_btn, prev_btn, seek_slider, volume_slider, curr_time, total_duration, wave, randomIcon, curr_track;
let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

// Function to reset the music player state
function reset() {
    // Logic to reset the music player state
    curr_track.pause();
    curr_track.currentTime = 0;
    // Additional reset logic if needed
}

// Fetch songs from the API
async function fetchSongs() {
    try {
        const response = await fetch('http://ec2-13-233-129-161.ap-south-1.compute.amazonaws.com:8080/v1/audio/allsongs');
        const data = await response.json();

        if (data.success === 'Fetched songs') {
            return data.getallsongs;
        } else {
            console.error('Failed to fetch songs:', data.error);
            return [];
        }
    } catch (error) {
        console.error('Error fetching songs:', error);
        return [];
    }
}

// Function to initialize the music player with fetched songs
async function initMusicPlayer() {
    // Assign elements to global variables
    now_playing = document.querySelector('.now-playing');
    track_art = document.querySelector('.track-art');
    track_name = document.querySelector('.track-name');
    track_artist = document.querySelector('.track-artist');
    playpause_btn = document.querySelector('.playpause-track');
    next_btn = document.querySelector('.next-track');
    prev_btn = document.querySelector('.prev-track');
    seek_slider = document.querySelector('.seek_slider');
    volume_slider = document.querySelector('.volume_slider');
    curr_time = document.querySelector('.current-time');
    total_duration = document.querySelector('.total-duration');
    wave = document.getElementById('wave');
    randomIcon = document.querySelector('.fa-random');
    curr_track = document.createElement('audio');

    // Fetch and load songs
    const songs = await fetchSongs();

    if (songs.length > 0) {
        const music_list = songs.map(song => ({
            img: song.Banner_location,
            name: song.Musictitle,
            artist: song.artist,
            music: song.Audio_location,
        }));

        loadTrack(track_index, music_list);
    } else {
        console.error('No songs available.');
    }
}

// Load track function
function loadTrack(index, music_list) {
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[index].music;

    // Wait for the audio to be loaded
    curr_track.addEventListener('loadedmetadata', function () {
        track_art.style.backgroundImage = `url(${music_list[index].img})`;
        track_name.textContent = music_list[index].name;
        track_artist.textContent = music_list[index].artist;
        now_playing.textContent = `Playing music ${index + 1} of ${music_list.length}`;

        updateTimer = setInterval(setUpdate, 1000);

        curr_track.addEventListener('ended', () => nextTrack(music_list));
        randomIcon.addEventListener('click', () => randomTrack(music_list)); // Added event listener for random button
        playTrack(); // Play the track after it's loaded
    });

    curr_track.load();
}

// Function to play or pause the track
function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

// Function to play the track
function playTrack() {
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

// Function to pause the track
function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

// Function to load and play the next track
function nextTrack(music_list) {
    if (track_index < music_list.length - 1 && !isRandom) {
        track_index += 1;
    } else if (isRandom) {
        let random_index = Math.floor(Math.random() * music_list.length);
        track_index = random_index;
    } else {
        track_index = 0;
    }
    loadTrack(track_index, music_list);
    playTrack();
}

// Function to load and play the previous track
function prevTrack(music_list) {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = music_list.length - 1;
    }
    loadTrack(track_index, music_list);
    playTrack();
}

// Function to handle random track button click
function randomTrack(music_list) {
    // Generate a random index
    let randomIndex = Math.floor(Math.random() * music_list.length);


    // Load and play the random track
    loadTrack(randomIndex, music_list);
    playTrack();
}

// Function to update the seek slider, current time, and total duration
function setUpdate() {
    let seekPosition = (curr_track.currentTime / curr_track.duration) * 100;
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    currentSeconds = currentSeconds < 10 ? "0" + currentSeconds : currentSeconds;
    durationSeconds = durationSeconds < 10 ? "0" + durationSeconds : durationSeconds;
    currentMinutes = currentMinutes < 10 ? "0" + currentMinutes : currentMinutes;
    durationMinutes = durationMinutes < 10 ? "0" + durationMinutes : durationMinutes;

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
}

// Call the initialization function
initMusicPlayer();

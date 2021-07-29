// Select all the elements in the HTML page
// and assign them to a variable
export class Music {



    now_playing: HTMLElement = document.querySelector(".now-playing");
    track_art: HTMLElement = document.querySelector(".track-art");
    track_name: HTMLElement = document.querySelector(".track-name");
    track_artist: HTMLElement = document.querySelector(".track-artist");

    playpause_btn: HTMLElement = document.querySelector(".playpause-track");
    next_btn: HTMLElement = document.querySelector(".next-track");
    prev_btn: HTMLElement = document.querySelector(".prev-track");

    name: string = "eded"
    seek_slider: HTMLInputElement = document.querySelector(".seek_slider");
    volume_slider: HTMLInputElement = document.querySelector(".volume_slider");
    curr_time: HTMLElement = document.querySelector(".current-time");
    total_duration: HTMLElement = document.querySelector(".total-duration");

    // Specify globally used values
    track_index = 0;
    isPlaying = false;
    updateTimer;

    // Create the audio element for the player
    curr_track: HTMLAudioElement = document.createElement('audio');
    // auda:HTMLElement=document.getElementById("audi").appendChild(this.curr_track)





    // Define the list of tracks that have to be played
    track_list = [
        {
            name: "ghungroo",
            artist: "",
            image: "Image URL",

            path: "Ghungroo Song _ War _ Hrithik Roshan_ Vaani Kapoor(MP3_160K).mp3",
        },
        {
            name: "o baby girl",
            artist: "",
            image: "Image URL",
            path: "Oh-Baby-Girl-MassTamilan.com.mp3",

        },
        {
            name: "Cruel summer",
            artist: "Taylor swift",
            image: "Image URL",

            path: "Taylor Swift - Cruel Summer (Official Audio)(MP3_160K).mp3"
        },
    ];


    constructor() {
        this.loadTrack(0);

       
        // this.curr_track = this.curr_track
        // console.log(this.curr_track)
    }





    loadTrack(track_index: number) {
        // Clear the previous seek timer
        clearInterval(this.updateTimer);
        this.resetValues();

        // Load a new track
        this.curr_track.src = this.track_list[track_index].path;

        this.curr_track.load();


        this.curr_track.preload = "metadata"

        this.curr_track.onloadedmetadata = () => {
            console.log(this.curr_track.duration)
        };


        console.log(this.curr_track, this.name)




        // Update details of the track
        this.track_art.style.backgroundImage =
            "url(" + this.track_list[track_index].image + ")";
        this.track_name.textContent = this.track_list[track_index].name;
        this.track_artist.textContent = this.track_list[track_index].artist;
        this.now_playing.textContent =
            "PLAYING " + (track_index + 1) + " OF " + this.track_list.length;

        // Set an interval of 1000 milliseconds
        // for updating the seek slider
        // this.updateTimer = setInterval(this.seekUpdate, 1000);

        this.seekUpdate()

        // Move to the next track if the current finishes playing
        // using the 'ended' event
        this.curr_track.addEventListener("ended", this.nextTrack);

    }

    seekUpdate() {
        let seekPosition = 0;

        console.log(this.name)

        console.log(this.curr_track)

        console.log(this.curr_track.duration && this.curr_track.src, "ji")
        // Check if the current track duration is a legible number
        if (!isNaN(this.curr_track.duration)) {
            seekPosition = this.curr_track.currentTime * (100 / this.curr_track.duration);
            this.seek_slider.value = `${seekPosition}`;

            // Calculate the time left and the total duration
            let currentMinutes = Math.floor(this.curr_track.currentTime / 60);
            let currentSeconds = Math.floor(this.curr_track.currentTime - currentMinutes * 60);
            let durationMinutes = Math.floor(this.curr_track.duration / 60);
            let durationSeconds = Math.floor(this.curr_track.duration - durationMinutes * 60);

            // Add a zero to the single digit time values
            if (currentSeconds < 10) { currentSeconds = 0 + currentSeconds; }
            if (durationSeconds < 10) { durationSeconds = 0 + durationSeconds; }
            if (currentMinutes < 10) { currentMinutes = 0 + currentMinutes; }
            if (durationMinutes < 10) { durationMinutes = 0 + durationMinutes; }

            // Display the updated duration
            this.curr_time.textContent = currentMinutes + ":" + currentSeconds;
            this.total_duration.textContent = durationMinutes + ":" + durationSeconds;
        }
    }

    // to reset all values to their default
    resetValues() {
        this.curr_time.textContent = "00:00";
        this.total_duration.textContent = "00:00";
        this.seek_slider.value = "0";
    }


    playpauseTrack() {
        // Switch between playing and pausing
        // depending on the current state
        if (!this.isPlaying) this.playTrack();
        else this.pauseTrack();
    }

    playTrack() {
        // Play the loaded track
        this.curr_track.play();
        this.isPlaying = true;

        // Replace icon with the pause icon
        this.playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    }

    pauseTrack() {
        // Pause the loaded track
        this.curr_track.pause();
        this.isPlaying = false;

        // Replace icon with the play icon
        this.playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    }

    nextTrack() {
        // Go back to the first track if the
        // current one is the last in the track list
        if (this.track_index < this.track_list.length - 1)
            this.track_index += 1;
        else this.track_index = 0;

        // Load and play the new track
        this.loadTrack(this.track_index);
        this.playTrack();
    }

    prevTrack() {
        // Go back to the last track if the
        // current one is the first in the track list
        if (this.track_index > 0)
            this.track_index -= 1;
        else this.track_index = this.track_list.length - 1;

        // Load and play the new track
        this.loadTrack(this.track_index);
        this.playTrack();
    }


    seekTo() {
        // Calculate the seek position by the``
        // percentage of the seek slider
        // and get the relative duration to the track



        let seekto = this.curr_track.duration * ((parseInt(this.seek_slider.value)) / 100);

        // Set the current track position to the calculated seek position
        this.curr_track.currentTime = seekto;
    }

    setVolume() {
        // Set the volume according to the
        // percentage of the volume slider set
        this.curr_track.volume = parseInt(this.volume_slider.value) / 100;
    }




    // Load the first track in the tracklist




}


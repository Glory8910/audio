
export class Music{



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

    track_index = 0;
    isPlaying = false;
    updateTimer;

    
    curr_track: HTMLAudioElement = document.createElement('audio');
   





  
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
          
        
        this.loadTrack(0)

       
       
    }

    



    loadTrack=(track_index: number)=>{
   
        clearInterval(this.updateTimer);
        this.resetValues();

       
        this.curr_track.src = this.track_list[track_index].path;

        this.curr_track.load();


        this.curr_track.preload = "metadata"

        this.curr_track.onloadedmetadata = () => {
            console.log(this.curr_track.duration)
        };





        this.track_art.style.backgroundImage =
            "url(" + this.track_list[track_index].image + ")";

        this.track_name.textContent = this.track_list[track_index].name;
        this.track_artist.textContent = this.track_list[track_index].artist;
        this.now_playing.textContent =
            "PLAYING " + (track_index + 1) + " OF " + this.track_list.length;

     
        this.updateTimer = setInterval(this.seekUpdate, 1000);

       

       
        this.curr_track.addEventListener("ended",this.nextTrack);

    }

    seekUpdate=()=> {
        let seekPosition = 0;

     
      
        if (!isNaN(this.curr_track.duration)) {
            seekPosition = this.curr_track.currentTime * (100 / this.curr_track.duration);
            this.seek_slider.value = `${seekPosition}`;


            let currentMinutes = Math.floor(this.curr_track.currentTime / 60);
            let currentSeconds = Math.floor(this.curr_track.currentTime - currentMinutes * 60);
            let durationMinutes = Math.floor(this.curr_track.duration / 60);
            let durationSeconds = Math.floor(this.curr_track.duration - durationMinutes * 60);

       
            if (currentSeconds < 10) { currentSeconds = 0 + currentSeconds; }
            if (durationSeconds < 10) { durationSeconds = 0 + durationSeconds; }
            if (currentMinutes < 10) { currentMinutes = 0 + currentMinutes; }
            if (durationMinutes < 10) { durationMinutes = 0 + durationMinutes; }

            
            this.curr_time.textContent = currentMinutes + ":" + currentSeconds;
            this.total_duration.textContent = durationMinutes + ":" + durationSeconds;
        }
    }


    resetValues=()=>{
        this.curr_time.textContent = "00:00";
        this.total_duration.textContent = "00:00";
        this.seek_slider.value = "0";
    }


    playpauseTrack=()=> {

        if (!this.isPlaying) this.playTrack();
        else this.pauseTrack();
    }



    playTrack=()=> {
  
        this.curr_track.play();
        this.isPlaying = true;

        this.playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    }

    pauseTrack=()=> {

        this.curr_track.pause();
        this.isPlaying = false;

  
        this.playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    }

    nextTrack=()=> {
     
        if (this.track_index < this.track_list.length - 1)
            this.track_index += 1;
        else this.track_index = 0;

 
        this.loadTrack(this.track_index);
        this.playTrack();
    }

    prevTrack=()=> {

        if (this.track_index > 0)
            this.track_index -= 1;
        else this.track_index = this.track_list.length - 1;

   
        this.loadTrack(this.track_index);
        this.playTrack();
    }


    seekTo=()=> {




        let seekto = this.curr_track.duration * ((parseInt(this.seek_slider.value)) / 100);


        this.curr_track.currentTime = seekto;
    }

    setVolume=()=> {

        this.curr_track.volume = parseInt(this.volume_slider.value) / 100;
    }


    playpausetrack=document.getElementById("playpause-track").addEventListener("click",this.playpauseTrack)
    nexttrack=document.getElementById("next-track").addEventListener("click",this.nextTrack)

    prevtrack=document.getElementById("prev-track").addEventListener('click',this.prevTrack)
    playnslider=document.getElementById("playslider").addEventListener('change',this.seekTo)
    volumenslider=document.getElementById("volslider").addEventListener('change',this.setVolume)

  

}


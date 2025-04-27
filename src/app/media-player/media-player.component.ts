import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements AfterViewInit{

  public audioSource = 'assets/audio/sample.mp3';
  public videoSource = 'assets/video/sample.mp4';

  @ViewChild('audioRef') audioRef!: ElementRef<HTMLAudioElement>;
  @ViewChild('videoRef') videoRef!: ElementRef<HTMLVideoElement>;

  public isAudioPlaying = false;
  public isVideoPlaying = false;
  public audioProgress = 0;
  public videoProgress = 0;

  ngAfterViewInit() {
    this.audioRef.nativeElement.addEventListener('timeupdate', () => {
      this.audioProgress = this.audioRef.nativeElement.currentTime;
    });

    this.videoRef.nativeElement.addEventListener('timeupdate', () => {
      this.videoProgress = this.videoRef.nativeElement.currentTime;
    });
  }

  public toggleAudio(): void {
    const audio = this.audioRef.nativeElement;
    this.isAudioPlaying ? audio.pause() : audio.play();
    this.isAudioPlaying = !this.isAudioPlaying;
  }

  public toggleVideo(): void {
    const video = this.videoRef.nativeElement;
    this.isVideoPlaying ? video.pause() : video.play();
    this.isVideoPlaying = !this.isVideoPlaying;
  }

  public seekAudio(event: any): void {
    const time = event.target.value;
    this.audioRef.nativeElement.currentTime = time;
  }

  public seekVideo(event: any): void {
    const time = event.target.value;
    this.videoRef.nativeElement.currentTime = time;
  }

  public changeAudioVolume(event: any): void {
    this.audioRef.nativeElement.volume = event.target.value;
  }

  public changeVideoVolume(event: any): void {
    this.videoRef.nativeElement.volume = event.target.value;
  }

  public toggleFullscreen(): void {
    const video = this.videoRef.nativeElement;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if ((video as any).webkitRequestFullscreen) {
      (video as any).webkitRequestFullscreen(); // Safari
    } else if ((video as any).msRequestFullscreen) {
      (video as any).msRequestFullscreen(); // IE11
    }
  }

  get audioDuration(): number {
    return this.audioRef?.nativeElement?.duration || 0;
  }

  get videoDuration(): number {
    return this.videoRef?.nativeElement?.duration || 0;
  }

}

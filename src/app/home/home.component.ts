import { Component, OnInit } from '@angular/core';
import AgoraRTC, { IAgoraRTCClient } from 'agora-rtc-sdk-ng';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  async ngOnInit(): Promise<void> {
    // await this.startBasicCall();
  }

  async startBasicCall() {
    const rtc = {
      // For the local client.
      client: AgoraRTC.createClient({ mode: 'rtc', codec: 'h264' }),
      // For the local audio and video tracks.
      localAudioTrack: await AgoraRTC.createMicrophoneAudioTrack(),
      localVideoTrack: await AgoraRTC.createCameraVideoTrack(),
    };

    const options = {
      // Pass your app ID here.
      appId: '7fa92eee2da449609dedec22a8dcb25d',
      // Set the channel name.
      channel: 'gringo-channel',
      // Pass a token if your project enables the App Certificate.
      token: "0067fa92eee2da449609dedec22a8dcb25dIAC5gmv/GAfVMGYYs5DWIbRr1YG7ZmPIPXzB3XADD3NnLYQJXbgAAAAAEACDmVGZRFTwYQEAAQBEVPBh",
    };

    const uid = await rtc.client.join(
      options.appId,
      options.channel,
      options.token,
      null
    );

    // Create an audio track from the audio sampled by a microphone.
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // Create a video track from the video captured by a camera.
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    // Publish the local audio and video tracks to the channel.
    await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);

    console.log('publish success!');

    
  }
}

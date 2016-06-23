import { createRecorder } from './recorder';

navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

navigator.getUserMedia(
  { audio: true },
  (stream) => {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const recorder = createRecorder(source);
    console.log(recorder);
    recorder.record(
      (a) => {
        console.log(a);
      },
      (err) => {
        console.log(err);
      }
    );
    setTimeout(() => {
      recorder.stop();
      console.log('STOP');
    }, 5000);
  },
  (error) => {
    console.log(error);
  }
)

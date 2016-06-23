import Recorder from 'recorderjs';

const workerPath = 'javascripts/recorderWorker.js';


export function createRecorder(source, completion) {
  const config = {
    workerPath
  };

  return new Recorder(source, config);
}

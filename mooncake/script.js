// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);

const div = document.createElement('div');
div.id = 'playerContainer';

const audioEl = document.createElement('audio');
audioEl.controls = true;
audioEl.id = 'player';
audioEl.src = 'recording.m4a';
div.appendChild(audioEl);

const captions = document.createElement('div');
captions.id = 'captions';

const trackEl = document.createElement('track');
trackEl.default = true;
trackEl.kind = 'captions';
trackEl.src = 'recording.vtt';
trackEl.addEventListener('cuechange', function (event) {
  const text = event.target?.track?.activeCues?.[0]?.text;
  captions.innerText = text ?? '';
});
audioEl.appendChild(trackEl);

document.querySelector('body').appendChild(div);
document.querySelector('body').appendChild(captions);

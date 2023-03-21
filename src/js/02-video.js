import Player from '@vimeo/player';

const throttle = require('lodash.throttle');
const iframePlayer = document.querySelector('#vimeo-player');
const player = new Player(iframePlayer);
const STORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(saveTime, 1000));

function saveTime(data) {
  localStorage.setItem(STORAGE_KEY, data.seconds);
}

player.setCurrentTime(localStorage.getItem(STORAGE_KEY) || 0);

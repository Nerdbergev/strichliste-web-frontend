import { Howl } from 'howler';
import { CreateTransactionParams } from '../store/reducers';

const soundsPath = 'sounds/';
const loadedDispenseSounds: Object = {};
const loadedDepositSounds: Object = {};
const playedSounds: Howl[] = [];

export function initializeSounds(depositSounds: string[], dispenseSounds: string[]) {
  loadSounds(depositSounds, loadedDepositSounds);
  loadSounds(dispenseSounds, loadedDispenseSounds);
}

function loadSounds(sounds: string[], dst: Object) {
  for (const sound of sounds) {
    if (Object.keys(dst).includes(sound)) {
      continue;
    }
    const h = new Howl({
      src: [soundsPath + sound],
      onload: function() {
        dst[sound] = h;
      }
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function playCashSound(_params?: CreateTransactionParams): void {
  if (!_params) return;
  const sounds: Howl[] = Object.values((_params.amount || 0) >= 0 ? loadedDepositSounds : loadedDispenseSounds);
  if (sounds.length === playedSounds.length) {
      // clear array
      playedSounds.splice(0, playedSounds.length);
  }
  const sound = sounds.filter(s => !playedSounds.includes(s))[Math.floor(Math.random() * (sounds.length-playedSounds.length))];
  if (sound) {
      sound.play();
      playedSounds.push(sound);
  }
}

import { ISound } from '@models/sound.model';

export type Sound = 'ring' | 'alarm' | 'beep' | 'chime' | 'horn' | 'siren';

export const SOUNDS: ISound[] = [
  { name: 'Arabian Mystery', file: 'arabian-mystery.wav' },
  { name: 'Bell', file: 'bell.wav' },
  { name: 'Announce Tones', file: 'announce-tones.wav' },
  { name: 'Reward', file: 'reward.wav' },
  { name: 'Happy Bells', file: 'happy-bells.wav' },
  { name: 'Reveal', file: 'reveal.wav' },
  { name: 'Positive', file: 'positive.wav' },
];

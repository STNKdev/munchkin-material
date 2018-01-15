import createPlayer from 'munchkin-core/es/utils/createPlayer';
import { FEMALE } from 'munchkin-core/es/utils/gender';

export default {
  en: [
    {
      player: createPlayer({
        color: '#607D8B',
        gear: 13,
        level: 3,
        name: 'Barack Obama',
      }),
    },
    {
      player: createPlayer({
        color: '#FFC107',
        gear: 20,
        level: 5,
        name: 'Donald Trump',
      }),
    },
    {
      player: createPlayer({
        color: '#03A9F4',
        gear: 10,
        gender: FEMALE,
        level: 7,
        name: 'Hillary Clinton',
      }),
    },
  ],

  ru: [
    {
      player: createPlayer({
        color: '#F44336',
        gear: 30,
        level: 3,
        name: 'Илья Муромец',
      }),
    },
    {
      player: createPlayer({
        color: '#009688',
        gear: 13,
        level: 6,
        name: 'Соловей Разбойник',
      }),
    },
    {
      player: createPlayer({
        color: '#E91E63',
        gear: 7,
        gender: FEMALE,
        level: 8,
        name: 'Василиса Премудрая',
      }),
    },
  ],
};

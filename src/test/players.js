import Player from 'munchkin-core/es/classes/Player';
import { FEMALE } from 'munchkin-core/es/constants/gender';

export default {
  en: [
    {
      color: '#607D8B',
      player: new Player({
        gear: 13,
        level: 3,
        name: 'Barack Obama',
      }),
    },
    {
      color: '#FFC107',
      player: new Player({
        gear: 20,
        level: 5,
        name: 'Donald Trump',
      }),
    },
    {
      color: '#03A9F4',
      player: new Player({
        gear: 10,
        gender: FEMALE,
        level: 7,
        name: 'Hillary Clinton',
      }),
    },
  ],

  ru: [
    {
      color: '#F44336',
      player: new Player({
        gear: 30,
        level: 3,
        name: 'Илья Муромец',
      }),
    },
    {
      color: '#009688',
      player: new Player({
        gear: 13,
        level: 6,
        name: 'Соловей Разбойник',
      }),
    },
    {
      color: '#E91E63',
      player: new Player({
        gear: 7,
        gender: FEMALE,
        level: 8,
        name: 'Василиса Премудрая',
      }),
    },
  ],
};

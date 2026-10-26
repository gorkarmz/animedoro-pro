export interface AnimeLegend {
  id: string;
  anilistId: number;
  character: string;
  anime: string;
  mantra: string;
  accentColor: string;
  coverImage: string;
  bannerImage: string;
  animedatosQuery: string;
}

export const ANIME_LEGENDS: AnimeLegend[] = [
  {
    id: 'luffy',
    anilistId: 21,
    character: 'Monkey D. Luffy',
    anime: 'One Piece',
    mantra: 'El futuro Rey de los Piratas. Determinación inquebrantable hasta alcanzar tu meta.',
    accentColor: 'from-red-600 to-amber-600',
    coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-ELSYx3yMPcKM.jpg',
    bannerImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg',
    animedatosQuery: 'One Piece'
  },
  {
    id: 'asta',
    anilistId: 97940,
    character: 'Asta',
    anime: 'Black Clover',
    mantra: '¡Mi magia es no rendirme jamás! Supera tus propios límites en cada minuto.',
    accentColor: 'from-orange-600 to-zinc-800',
    coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx97940-fyh8o7gNbha0.png',
    bannerImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/97940-1URQdQ4U1a0b.jpg',
    animedatosQuery: 'Black Clover'
  },
  {
    id: 'naruto',
    anilistId: 1735,
    character: 'Naruto Uzumaki',
    anime: 'Naruto Shippuden',
    mantra: '¡Este es mi camino ninja! Jamás retroceder a mi palabra ni a mi esfuerzo.',
    accentColor: 'from-amber-500 to-orange-600',
    coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1735-kGfVm0YqCPcu.png',
    bannerImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/1735.jpg',
    animedatosQuery: 'Naruto Shippuden'
  },
  {
    id: 'meliodas',
    anilistId: 20789,
    character: 'Meliodas',
    anime: 'Nanatsu no Taizai',
    mantra: 'Capitán de los Siete Pecados Capitales. Contraataque total frente a las distracciones.',
    accentColor: 'from-emerald-600 to-lime-600',
    coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20789-Ma5ouSYPkru9.jpg',
    bannerImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/20789-qwG9GcxIrmVE.jpg',
    animedatosQuery: 'Nanatsu no Taizai'
  },
  {
    id: 'ippo',
    anilistId: 263,
    character: 'Ippo Makunouchi',
    anime: 'Hajime no Ippo',
    mantra: 'La disciplina del cuadrilátero. Golpe a golpe, el verdadero poder nace de la constancia diaria.',
    accentColor: 'from-blue-600 to-cyan-600',
    coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx263-ivVyn9xAgwSZ.png',
    bannerImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/263-8Zejtdb3r2bI.jpg',
    animedatosQuery: 'Hajime no Ippo'
  }
];

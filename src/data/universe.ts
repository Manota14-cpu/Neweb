export interface UniverseTopic {
  id: string
  title: string
  subtitle: string
  description: string
  gradient: string
  icon: string
  color: string
  facts: string[]
}

export const universeTopics: UniverseTopic[] = [
  {
    id: 'black-holes',
    title: 'Black Holes',
    subtitle: 'Gravity\'s Ultimate Triumph',
    description: 'Regions of spacetime where gravity is so intense that nothing — not even light — can escape. From stellar-mass black holes to supermassive giants at galactic centers, these cosmic enigmas challenge our understanding of physics.',
    gradient: 'from-black via-purple-950 to-black',
    icon: '🌀',
    color: '#9C7BFF',
    facts: [
      'The first image of a black hole (M87*) was captured in 2019',
      'Sagittarius A* at our galaxy\'s center has 4.3 million solar masses',
      'Time dilation near a black hole slows time dramatically',
      'Black holes can merge, creating gravitational waves',
    ],
  },
  {
    id: 'nebulae',
    title: 'Nebulae',
    subtitle: 'Cosmic Nurseries of Stars',
    description: 'Vast clouds of dust and gas where stars are born and die. These ethereal cosmic landscapes — from the iconic Pillars of Creation to the swirling Cat\'s Eye — paint the galaxy in brilliant colors.',
    gradient: 'from-pink-950 via-purple-900 to-blue-950',
    icon: '🌌',
    color: '#7AD7FF',
    facts: [
      'The Orion Nebula is the closest star-forming region to Earth',
      'Planetary nebulae have nothing to do with planets — early astronomers were misled',
      'Nebulae can span hundreds of light-years across',
      'Our Sun formed from a nebula 4.6 billion years ago',
    ],
  },
  {
    id: 'exoplanets',
    title: 'Exoplanets',
    subtitle: 'Worlds Beyond Our Sun',
    description: 'Thousands of planets discovered orbiting distant stars — from scorching hot Jupiters to super-Earths in the habitable zone. Each discovery brings us closer to answering: are we alone?',
    gradient: 'from-emerald-950 via-teal-900 to-cyan-950',
    icon: '🪐',
    color: '#4F8FFF',
    facts: [
      'Over 5,500 exoplanets have been confirmed since 1992',
      'TRAPPIST-1 has seven Earth-sized planets, three in the habitable zone',
      'Some exoplanets have clouds of sand or titanium dioxide',
      'Kepler-452b is often called "Earth\'s older cousin"',
    ],
  },
  {
    id: 'galaxies',
    title: 'Galaxies',
    subtitle: 'Islands of Stars in the Cosmos',
    description: 'Vast collections of stars, gas, dust, and dark matter bound together by gravity. From majestic spirals like our Milky Way to chaotic mergers, galaxies are the building blocks of the universe.',
    gradient: 'from-indigo-950 via-blue-900 to-purple-950',
    icon: '✨',
    color: '#DCE7FF',
    facts: [
      'There are an estimated 2 trillion galaxies in the observable universe',
      'The Andromeda Galaxy will collide with the Milky Way in 4.5 billion years',
      'The largest known galaxy, IC 1101, spans 6 million light-years',
      'Galaxies can merge, triggering massive bursts of star formation',
    ],
  },
  {
    id: 'dark-matter',
    title: 'Dark Matter',
    subtitle: 'The Invisible Universe',
    description: 'An invisible substance that makes up 85% of all matter in the universe. Though we cannot see it directly, its gravitational pull shapes galaxies, bends light, and holds the cosmos together.',
    gradient: 'from-slate-950 via-gray-900 to-zinc-950',
    icon: '⚡',
    color: '#ffffff',
    facts: [
      'Dark matter was first theorized by Fritz Zwicky in 1933',
      'It doesn\'t emit, absorb, or reflect light',
      'Galaxy rotation curves provide the strongest evidence',
      'Multiple experiments are searching for dark matter particles',
    ],
  },
]

export interface SpaceMetric {
  label: string
  value: string
  description: string
  trend: string
}

export const spaceMetrics: SpaceMetric[] = [
  { label: 'Known Universe Age', value: '13.8 BYR', description: 'Time since the Big Bang', trend: 'stable' },
  { label: 'Observable Galaxies', value: '2 Trillion', description: 'Estimated count', trend: 'up' },
  { label: 'Confirmed Exoplanets', value: '5,592', description: 'And counting', trend: 'up' },
  { label: 'Active Satellites', value: '9,900+', description: 'Orbiting Earth', trend: 'up' },
  { label: 'Humans in Space', value: '19', description: 'Current ISS crew + others', trend: 'stable' },
  { label: 'Light Speed', value: '299,792 km/s', description: 'Cosmic speed limit', trend: 'constant' },
  { label: 'Stars in Milky Way', value: '100–400B', description: 'Billions of suns', trend: 'stable' },
  { label: 'Known Asteroids', value: '1.3M+', description: 'In our solar system', trend: 'up' },
  { label: 'Space Agencies', value: '77', description: 'Active worldwide', trend: 'up' },
]

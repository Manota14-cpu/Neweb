export interface DiscoveryData {
  id: string
  title: string
  date: string
  description: string
  significance: string
  keyFigure: string
  imageUrl: string
  gradient: string
  stats: { label: string; value: string }[]
}

export const discoveries: DiscoveryData[] = [
  {
    id: 'moon-landing',
    title: 'Apollo 11 — Moon Landing',
    date: 'July 20, 1969',
    description: 'Humanity took its first steps on another world as Neil Armstrong and Buzz Aldrin landed the Lunar Module Eagle on the Sea of Tranquility. "That\'s one small step for man, one giant leap for mankind."',
    significance: 'First human footsteps on another celestial body — the greatest technological achievement of the 20th century.',
    keyFigure: 'Neil Armstrong, Buzz Aldrin, Michael Collins',
    imageUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&q=80',
    gradient: 'from-gray-800 via-blue-900 to-gray-900',
    stats: [
      { label: 'Mission Duration', value: '8 days, 3 hours' },
      { label: 'Distance Traveled', value: '953,054 km' },
      { label: 'Moonwalk Duration', value: '2h 31min' },
      { label: 'Samples Returned', value: '21.5 kg' },
    ],
  },
  {
    id: 'voyager',
    title: 'Voyager — Grand Tour',
    date: 'Launched 1977',
    description: 'Voyager 1 and 2 embarked on an epic journey through the outer solar system, sending back humanity\'s first close-up images of Jupiter, Saturn, Uranus, and Neptune. They now carry the Golden Record into interstellar space.',
    significance: 'First spacecraft to reach interstellar space — humanity\'s farthest ambassadors.',
    keyFigure: 'Carl Sagan, NASA JPL team',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
    gradient: 'from-indigo-900 via-blue-800 to-cyan-900',
    stats: [
      { label: 'Current Distance', value: '24+ billion km' },
      { label: 'Years Operating', value: '47+ years' },
      { label: 'Images Returned', value: '100,000+' },
      { label: 'Moons Discovered', value: '24' },
    ],
  },
  {
    id: 'hubble',
    title: 'Hubble Space Telescope',
    date: 'Launched April 24, 1990',
    description: 'Orbiting above Earth\'s distorting atmosphere, Hubble has captured the universe in unprecedented detail. From the Pillars of Creation to the deepest field images, it revolutionized modern astronomy.',
    significance: 'Revealed the age of the universe (13.8 billion years) and proved its accelerating expansion.',
    keyFigure: 'Edwin Hubble (namesake), NASA/ESA',
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80',
    gradient: 'from-blue-950 via-purple-900 to-indigo-950',
    stats: [
      { label: 'Orbit Altitude', value: '547 km' },
      { label: 'Observations', value: '1.5+ million' },
      { label: 'Scientific Papers', value: '19,000+' },
      { label: 'Deepest Image', value: '13.4 billion yrs' },
    ],
  },
  {
    id: 'mars-missions',
    title: 'Mars Exploration Rovers',
    date: '2004 — Present',
    description: 'A fleet of robotic explorers — Spirit, Opportunity, Curiosity, and Perseverance — have transformed Mars from a distant red dot into a world with ancient river deltas, organic molecules, and flying helicopters.',
    significance: 'Confirmed liquid water once flowed on Mars — paving the way for human exploration.',
    keyFigure: 'NASA JPL, international partners',
    imageUrl: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&q=80',
    gradient: 'from-orange-950 via-red-900 to-amber-950',
    stats: [
      { label: 'Rovers Landed', value: '4 successful' },
      { label: 'Total Kilometers', value: '75+ km' },
      { label: 'Helicopter Flights', value: '70+' },
      { label: 'Samples Collected', value: '30+' },
    ],
  },
  {
    id: 'james-webb',
    title: 'James Webb Space Telescope',
    date: 'Launched December 25, 2021',
    description: 'The most powerful telescope ever built — orbiting the Sun at L2, Webb peers through cosmic dust to reveal the first galaxies, exoplanet atmospheres, and the birth of stars in infrared light.',
    significance: 'Seeing the first stars and galaxies that formed after the Big Bang — rewriting cosmic history.',
    keyFigure: 'NASA/ESA/CSA, thousands of scientists',
    imageUrl: 'https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=800&q=80',
    gradient: 'from-gray-900 via-gold-700 to-amber-900',
    stats: [
      { label: 'Mirror Diameter', value: '6.5 meters' },
      { label: 'Wavelength Range', value: '0.6-28 μm' },
      { label: 'Operating Temp', value: '-233°C' },
      { label: 'Mission Duration', value: '20+ years' },
    ],
  },
]

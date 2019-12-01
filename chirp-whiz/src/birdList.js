var birdList = [
    {
        name: 'Evening grosbeak',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/120746601-720px.jpg', 
            'https://www.allaboutbirds.org/guide/assets/photo/67271841-720px.jpg', 
            'https://www.allaboutbirds.org/guide/assets/photo/67271871-720px.jpg', 
            'https://www.allaboutbirds.org/guide/assets/photo/67271851-720px.jpg', 
            'https://www.allaboutbirds.org/guide/assets/photo/67271821-720px.jpg', 
            'https://www.allaboutbirds.org/guide/assets/photo/67271831-720px.jpg',
            'https://www.allaboutbirds.org/guide/assets/photo/67271881-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h5140so.mp3',
        habitat: 'Forests',
        birdType: 'Grosbeak',
        scientificName: 'Coccothraustes vespertinus'
    },
    {
        name: 'American goldfinch',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/124706471-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h5290so.mp3',
        habitat: 'Open Woodlands',
        birdType: 'Finch',
        scientificName: 'Carduelis tristis'        
    },
    {
        name: 'Baltimore oriole',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/63734201-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h5070so.mp3',
        habitat: 'Open Woodlands',
        birdType: 'Oriole',
        scientificName: 'Icterus galbula'
    },
    {
        name: 'Orchard oriole',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/67361081-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h5060so.mp3',
        habitat: 'Open Woodlands',
        birdType: 'Oriole',
        scientificName: 'Icterus spurius'
    },
    {
        name: 'Common Grackle',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/67364561-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h5110so.mp3',
        habitat: 'Open Woodlands',
        birdType: 'Blackbird',
        scientificName: 'Quiscalus quiscula'
    },
    {
        name: 'Wood Duck',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/65533521-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h1440so.mp3',
        habitat: 'Lakes and Ponds',
        birdType: 'Duck',
        scientificName: 'Aix sponsa'
    },
    {
        name: 'Double-Crested Cormorant',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/66027281-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h1200so.mp3',
        habitat: 'Lakes and Ponds',
        birdType: 'Cormorant',
        scientificName: 'Phalacrocorax auritus'
    },
    {
        name: 'Common Loon',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/63918061-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h0070so.mp3',
        habitat: 'Lakes and Ponds',
        birdType: 'Loon',
        scientificName: 'Gavia immer'
    },
    {
        name: 'Common Merganser',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/63910971-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h1290so.mp3',
        habitat: 'Lakes and Ponds',
        birdType: 'Duck',
        scientificName: 'Mergus merganser'
    },
    {
        name: 'Osprey',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/60320581-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h3640so.mp3',
        habitat: 'Lakes and Ponds',
        birdType: 'Osprey',
        scientificName: 'Pandion haliaetus'
    },
    {
        name: 'Belted Kingfisher',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/65764731-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h3900so.mp3',
        habitat: 'Lakes and Ponds',
        birdType: 'Kingfisher',
        scientificName: 'Ceryle alcyon'
    },
    {
        name: 'Purple Martin',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/68280401-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h6110so.mp3',
        habitat: 'Lakes and Ponds',
        birdType: 'Swallow',
        scientificName: 'Progne subis'
    },
    {
        name: 'Northern Bobwhite',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/65614911-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h2890so.mp3',
        habitat: 'Grasslands',
        birdType: 'Game Bird',
        scientificName: 'Colinus virginianus'
    },
    {
        name: 'Killdeer',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/64809651-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h2730so.mp3',
        habitat: 'Grasslands',
        birdType: 'Plover',
        scientificName: 'Charadrius vociferus'
    },
    {
        name: 'Eastern Kingbird',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/65684501-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h4440so.mp3',
        habitat: 'Grasslands',
        birdType: 'Flycatcher',
        scientificName: 'Tyrannus tyrannus'
    },
    {
        name: 'Barn Swallow',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/68123101-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h6130so.mp3',
        habitat: 'Grasslands',
        birdType: 'Swallow',
        scientificName: 'Hirundo rustica'
    },
    {
        name: 'Eastern Bluebird',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/63740061-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h7660so.mp3',
        habitat: 'Grasslands',
        birdType: 'Thrush',
        scientificName: 'Sialia sialis'
    },
    {
        name: 'Grasshopper Sparrow',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/39344721-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h5460so.mp3',
        habitat: 'Grasslands',
        birdType: 'Sparrow',
        scientificName: 'Ammodramus savannarum'
    },
    {
        name: 'Mourning Dove',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/60386921-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h3160so.mp3',
        habitat: 'Open Woodlands',
        birdType: 'Dove',
        scientificName: 'Zenaida macroura'
    },
    {
        name: 'Yellow-Billed Cuckoo',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/66038331-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h3870so.mp3',
        habitat: 'Open Woodlands',
        birdType: 'Cuckoo',
        scientificName: 'Coccyzus americanus'
    },
    {
        name: 'Chuck-Will`s-Widow',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/32803711-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h4160so.mp3',
        habitat: 'Open Woodlands',
        birdType: 'Nightjar',
        scientificName: 'Caprimulgus carolinensis'
    },
    {
        name: 'Ruby-Throated Hummingbird',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/60395561-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h4280so.mp3',
        habitat: 'Open Woodlands',
        birdType: 'Hummingbird',
        scientificName: 'Archilochus colubris'
    },
    {
        name: 'Ruffed Grouse',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/65615501-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h3000so.mp3',
        habitat: 'Forests',
        birdType: 'Game Bird',
        scientificName: 'Bonasa umbellus'
    },
    {
        name: 'Barred Owl',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/60394861-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h3680so.mp3',
        habitat: 'Forests',
        birdType: 'Owl',
        scientificName: 'Strix varia'
    },
    {
        name: 'Red-Bellied Woodpecker',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/64995071-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h4090so.mp3',
        habitat: 'Forests',
        birdType: 'Woodpecker',
        scientificName: 'Melanerpes carolinus'
    },
    {
        name: 'Eastern Wood-Pewee',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/65617351-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h4610so.mp3',
        habitat: 'Forests',
        birdType: 'Flycatcher',
        scientificName: 'Contopus virens'
    },
    {
        name: 'Blue Jay',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/59859171-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h4770so.mp3',
        habitat: 'Forests',
        birdType: 'Jay',
        scientificName: 'Cyanocitta cristata'
    },
    {
        name: 'Black-Capped Chickadee',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/60411301-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h7350so.mp3',
        habitat: 'Forests',
        birdType: 'Chickadee',
        scientificName: 'Parus atricapillus'
    },
    {
        name: 'Tufted Titmouse',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/63745741-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h7310so.mp3',
        habitat: 'Forests',
        birdType: 'Titmouse',
        scientificName: 'Parus bicolor'
    },
    {
        name: 'Red-Breasted Nuthatch',
        image: ['https://www.allaboutbirds.org/guide/assets/photo/68040881-720px.jpg'],
        sound: 'https://www.mbr-pwrc.usgs.gov/id/htmwav/h7280so.mp3',
        habitat: 'Forests',
        birdType: 'Nuthatch',
        scientificName: 'Sitta canadensis'
    }
];

export default birdList;
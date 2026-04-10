import petsData from '../data/pets.json'

const BUFFER_SIZE = 3
const imageCache = new Map()

async function fetchDogImage() {
  const res = await fetch('https://dog.ceo/api/breeds/image/random')
  if (!res.ok) throw new Error(`Dog API error: ${res.status}`)
  const data = await res.json()
  return data.message
}

async function fetchCatImage() {
  const res = await fetch('https://api.thecatapi.com/v1/images/search')
  if (!res.ok) throw new Error(`Cat API error: ${res.status}`)
  const data = await res.json()
  return data[0].url
}

function preloadInBrowser(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(url)
    img.onerror = () => resolve(url)
    img.src = url
  })
}

async function getImageForPet(pet) {
  if (imageCache.has(pet.id)) {
    return imageCache.get(pet.id)
  }

  let url = pet.imagen
  try {
    url =
      pet.tipo === 'perro' ? await fetchDogImage() : await fetchCatImage()
  } catch {
    // fallback to original placeholder
  }

  imageCache.set(pet.id, url)
  await preloadInBrowser(url)
  return url
}

function prefetchPets(pets, startIndex) {
  const end = Math.min(startIndex + BUFFER_SIZE, pets.length)
  for (let i = startIndex; i < end; i++) {
    if (!imageCache.has(pets[i].id)) {
      getImageForPet(pets[i])
    }
  }
}

function getPets() {
  return petsData
}

export { getImageForPet, prefetchPets, getPets }

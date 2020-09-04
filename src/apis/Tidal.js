const { APIWrapper } = require('../')
const fetch = require('node-fetch')

const API_URL = 'https://listen.tidal.com/v1'
const RESOURCES_URL = 'https://resources.tidal.com'
const BASE_URL = 'https://www.tidal.com'

module.exports = class TidalAPI extends APIWrapper {
  constructor () {
    super({
      name: 'tidal',
      envVars: [ 'TIDAL_TOKEN' ]
    })
  }

  search (query, types = 'ARTISTS,ALBUMS,TRACKS,VIDEOS,PLAYLISTS', limit = 10, countryCode = 'US') {
    return this.request('/search', {
      query, types, limit, countryCode
    })
  }

  getImage (resourceId, size = 640) {
    return `${RESOURCES_URL}/images/${resourceId.replace(/-/g, '/')}/${size}x${size}.jpg`
  }

  getAlbumUrl (id) {
    return `${BASE_URL}/album/${id}`
  }

  getArtistUrl (id) {
    return `${BASE_URL}/artist/${id}`
  }

  async request (endpoint, query = {}) {
    const queryParameters = new URLSearchParams(query)
    return fetch(API_URL + endpoint + `?${queryParameters.toString()}`, {
      headers: {
        'x-tidal-token': process.env.TIDAL_TOKEN
      }
    }).then(res => res.json())
  }
}
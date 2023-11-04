import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import axios from 'axios'

export function cn (...inputs) {
  return twMerge(clsx(inputs))
}

export function capitalise (text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
};

class APIClass {
  #baseUrl = process.env.REACT_APP_API_BASE_URL // Private field

  // Helper method to construct full URLs
  _constructUrl (endpoint) {
    return `${this.#baseUrl}${endpoint}`
  }

  // User Projects related methods

  getAllUserProjects () {
    return axios.get(this._constructUrl('/api/user_projects/'))
  }

  getUserProject (userProjectId) {
    return axios.get(this._constructUrl(`/api/user_projects/${userProjectId}`))
  }

  updateUserProject (userProjectId, data) {
    return axios.put(this._constructUrl(`/api/user_projects/${userProjectId}`), data)
  }

  deleteUserProject (userProjectId) {
    return axios.delete(this._constructUrl(`/api/user_projects/${userProjectId}`))
  }

  createUserProject (projectId, data) {
    return axios.post(this._constructUrl(`/api/user_projects/${projectId}`), data)
  }

  createDynamicUserProject (projectId) {
    return axios.post(this._constructUrl(`/api/user_projects/dynamic/${projectId}`))
  }

  // Chats related methods

  getAllChats () {
    return axios.get(this._constructUrl('/api/chats/'))
  }

  createChat (data) {
    return axios.post(this._constructUrl('/api/chats/'), data)
  }

  getChat (chatId) {
    return axios.get(this._constructUrl(`/api/chats/${chatId}`))
  }

  chatbotQueryHandler (chatId, data) {
    return axios.put(this._constructUrl(`/api/chats/${chatId}`), data)
  }

  deleteChat (chatId) {
    return axios.delete(this._constructUrl(`/api/chats/${chatId}`))
  }

  chatbotAudioQueryHandler (chatId, iterationIndex, audioBlob) {
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    const formData = new FormData()
    formData.append('audio', audioBlob)
    return axios.put(this._constructUrl(`/api/discovery_chats/${chatId}/speech/${iterationIndex}`), formData, config)
  }
  // Projects related methods

  getProject (projectId) {
    return axios.get(this._constructUrl(`/api/projects/${projectId}`))
  }

  getAllProjects () {
    return axios.get(this._constructUrl('/api/projects'))
  }

  updateProject (projectId, data) {
    return axios.put(this._constructUrl(`/api/projects/${projectId}`), data)
  }

  deleteProject (projectId) {
    return axios.delete(this._constructUrl(`/api/projects/${projectId}`))
  }

  createDynamicProject (discoveryChatId) {
    return axios.post(this._constructUrl(`/api/chats/dynamic/${discoveryChatId}`))
  }

  // Discovery Chat related methods

  createDiscoveryChat () {
    return axios.post(this._constructUrl('/api/discovery_chats'))
  }

  getDiscoveryChat (id) {
    return axios.get(this._constructUrl(`/api/discovery_chats/${id}`))
  }

  getRecommendedStaticProjects (discoveryChatId, iterationIndex, offset = 0, limit = 5) {
    return axios.get(this._constructUrl('/api/projects/recommended/static'), { params: { chat_id: discoveryChatId, section_index: iterationIndex, offset, limit } })
  }

  getRecommendedDynamicProjects (discoveryChatId, iterationIndex, offset = 0, limit = 5) {
    return axios.get(this._constructUrl('/api/projects/recommended/dynamic'), { params: { chat_id: discoveryChatId, section_index: iterationIndex, offset, limit } })
  }

  getFilledDynamicProject (metadataId) {
    return axios.post(this._constructUrl(`/api/projects/dynamic/${metadataId}`))
  }

  navigateToBreadcrumb (discoveryChatId, iterationIndex) {
    return axios.post(this._constructUrl(`/api/discovery_chats/${discoveryChatId}/sections/${iterationIndex}`))
  }

  getDiscoveryChatSuggestionsAndBreadCrumb (discoveryChatId, iterationIndex) {
    return axios.get(this._constructUrl(`/api/discovery_chats/${discoveryChatId}/suggestions_breadcrumbs/${iterationIndex}`))
  }
}

export const API = new APIClass()

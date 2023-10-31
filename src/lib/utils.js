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

  chatbotAudioQueryHandler (chatId, formData) {
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return axios.put(this._constructUrl(`/api/chats/audio/${chatId}`), formData, config)
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

  sendDiscoverageChatMessage (id, message) {
    return axios.post(this._constructUrl(`/api/discovery_chats/${id}/messages`), { message })
  }

  getRecommendedStaticProjects (discoveryChatId, offset = 0, limit = 5) {
    return axios.get(this._constructUrl(`/api/projects/recommended/${discoveryChatId}`), { params: { offset, limit } })
  }

  getRecommendedDynamicProjects (discoveryChatId, count = 4) {
    return axios.post(this._constructUrl('/api/projects/dynamic/metadata'), { chat_id: discoveryChatId, count })
  }
}

export const API = new APIClass()

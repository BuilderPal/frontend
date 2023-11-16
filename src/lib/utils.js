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

  updateCurrentInstructionIndex (userProjectId, currentInstructionIndex) {
    return axios.put(this._constructUrl(`/api/user_projects/${userProjectId}/current_instruction`), { current_instruction_index: currentInstructionIndex })
  }

  // Guidance Chat related methods
  createGuidanceChat (userProjectId) {
    return axios.post(this._constructUrl(`/api/guidance_chats/${userProjectId}`))
  }

  getGuidanceChat (id) {
    return axios.get(this._constructUrl(`/api/guidance_chats/${id}`))
  }

  getGuidanceResponse (guidanceChatId, iterationIndex, message) {
    console.log('Guidance Message', { guidanceChatId, iterationIndex, message })
    return fetch(this._constructUrl(`/api/guidance_chats/${guidanceChatId}/messages/${iterationIndex}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    })
  }

  getGuidanceSpeechResponse (guidanceChatId, iterationIndex, blob) {
    console.log('Guidance Speech', { guidanceChatId, iterationIndex })

    const formData = new FormData()
    formData.append('chat_id', guidanceChatId)
    formData.append('audio', blob)
    return fetch(API._constructUrl(`/api/guidance_chats/${guidanceChatId}/speech/${iterationIndex}`), {
      method: 'POST',
      body: formData
    })
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

  getDiscoveryChatMetadata (discoveryChatId, iterationIndex) {
    return axios.put(this._constructUrl(`/api/discovery_chats/${discoveryChatId}/suggestions_and_projects_flag/${iterationIndex}`))
  }

  getDiscoveryStandardResponse (discoveryChatId, iterationIndex, message) {
    console.log('Standard Discovery Message', { discoveryChatId, iterationIndex, message })
    return fetch(this._constructUrl(`/api/discovery_chats/${discoveryChatId}/messages/standard/${iterationIndex}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    })
  }

  getDiscoveryGuidingResponse (discoveryChatId, iterationIndex, message) {
    console.log('Guiding Discovery Message', { discoveryChatId, iterationIndex, message })

    return fetch(this._constructUrl(`/api/discovery_chats/${discoveryChatId}/messages/guiding/${iterationIndex}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    })
  }

  getDiscoveryConversationalResponse (discoveryChatId, iterationIndex, message) {
    console.log('Conversational Discovery Message', { discoveryChatId, iterationIndex, message })
    return fetch(this._constructUrl(`/api/discovery_chats/${discoveryChatId}/messages/conversational/${iterationIndex}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    })
  }

  async getDiscoverySpeechStandardResponse (discoveryChatId, iterationIndex, blob) {
    console.log('Standard Discovery Speech', { discoveryChatId, iterationIndex })

    const formData = new FormData()
    formData.append('chat_id', discoveryChatId)
    formData.append('audio', blob)
    return fetch(API._constructUrl(`/api/discovery_chats/${discoveryChatId}/speech/standard/${iterationIndex}`), {
      method: 'POST',
      body: formData
    })
  }

  async getDiscoverySpeechGuidingResponse (discoveryChatId, iterationIndex, blob) {
    console.log('Guiding Discovery Speech', { discoveryChatId, iterationIndex })

    const formData = new FormData()
    formData.append('chat_id', discoveryChatId)
    formData.append('audio', blob)
    return fetch(API._constructUrl(`/api/discovery_chats/${discoveryChatId}/speech/guiding/${iterationIndex}`), {
      method: 'POST',
      body: formData
    })
  }

  async getDiscoverySpeechConversationalResponse (discoveryChatId, iterationIndex, blob) {
    console.log('Conversational Discovery Speech', { discoveryChatId, iterationIndex })

    const formData = new FormData()
    formData.append('chat_id', discoveryChatId)
    formData.append('audio', blob)
    return fetch(API._constructUrl(`/api/discovery_chats/${discoveryChatId}/speech/conversational/${iterationIndex}`), {
      method: 'POST',
      body: formData
    })
  }
}

export const API = new APIClass()

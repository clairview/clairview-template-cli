import {readMe} from '@clairview/sdk'
import {ux} from '@oclif/core'

import {api} from '../sdk'
import validateUrl from './validate-url'

export async function getClairviewUrl() {
  const clairviewUrl = await ux.prompt('What is your Clairview URL?', {default: 'http://localhost:8055'})

  // Validate URL
  if (!validateUrl(clairviewUrl)) {
    ux.warn('Invalid URL')
    return getClairviewUrl()
  }

  api.initialize(clairviewUrl)

  return clairviewUrl
}

export async function getClairviewToken(clairviewUrl: string) {
  const clairviewToken = await ux.prompt('What is your Clairview Admin Token?')

  // Validate token
  try {
    api.setAuthToken(clairviewToken)
    const response = await api.client.request(readMe())
    ux.log(`Logged in as ${response.first_name} ${response.last_name}`)
    return clairviewToken
  } catch (error) {
    console.log(error)
    ux.warn('Invalid token. Please try again.')
    return getClairviewToken(clairviewUrl)
  }
}

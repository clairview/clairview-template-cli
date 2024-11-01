import {readRoles} from '@clairview/sdk'
import {ux} from '@oclif/core'

import {api} from '../sdk'
import filterFields from '../utils/filter-fields'
import {clairviewRoleFields} from '../utils/system-fields'
import writeToFile from '../utils/write-to-file'

/**
 * Extract roles from the API
 */

export default async function extractRoles(dir: string) {
  try {
    const response = await api.client.request(readRoles({limit: -1}))

    const roles = filterFields(response, clairviewRoleFields)

    await writeToFile('roles', roles, dir)
    ux.log('Extracted roles')
  } catch (error) {
    ux.warn('Error extracting Roles:')
    ux.warn(error.message)
  }
}

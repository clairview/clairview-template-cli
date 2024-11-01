import {readUsers} from '@clairview/sdk'
import {ux} from '@oclif/core'

import {api} from '../sdk'
import filterFields from '../utils/filter-fields'
import {clairviewUserFields} from '../utils/system-fields'
import writeToFile from '../utils/write-to-file'

/**
 * Extract users from the Clairview instance
 */

export default async function extractUsers(dir: string) {
  try {
    const response = await api.client.request(readUsers({
      limit: -1,
    }),
    )

    const users = filterFields(response, clairviewUserFields)

    await writeToFile('users', users, dir)
    ux.log('Extracted users')
  } catch (error) {
    ux.warn('Error extracting Users:')
    ux.warn(error.message)
  }
}

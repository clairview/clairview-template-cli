import {readFiles} from '@clairview/sdk'
import {ux} from '@oclif/core'

import {api} from '../sdk'
import filterFields from '../utils/filter-fields'
import {clairviewFileFields} from '../utils/system-fields'
import writeToFile from '../utils/write-to-file'

/**
 * Extract files from the API
 */

export default async function extractFiles(dir: string) {
  try {
    const response = await api.client.request(readFiles({limit: -1}))

    const files = filterFields(response, clairviewFileFields)

    await writeToFile('files', files, dir)
    ux.log('Extracted files')
  } catch (error) {
    ux.warn('Error extracting Files:')
    ux.warn(error.message)
  }
}

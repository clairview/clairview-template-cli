import {readFolders} from '@clairview/sdk'
import {ux} from '@oclif/core'

import {api} from '../sdk'
import filterFields from '../utils/filter-fields'
import {clairviewFolderFields} from '../utils/system-fields'
import writeToFile from '../utils/write-to-file'

/**
 * Extract folders from the Clairview instance
 */

export default async function extractFolders(dir: string) {
  try {
    const response = await api.client.request(readFolders(
      {limit: -1},
    ))

    const folders = filterFields(response, clairviewFolderFields)

    await writeToFile('folders', folders, dir)
    ux.log('Extracted folders')
  } catch (error) {
    ux.warn('Error extracting Folders:')
    ux.warn(error.message)
  }
}

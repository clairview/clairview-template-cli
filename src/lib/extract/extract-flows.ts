import {readFlows, readOperations} from '@clairview/sdk'
import {ux} from '@oclif/core'

import {api} from '../sdk'
import filterFields from '../utils/filter-fields'
import {clairviewFlowFields, clairviewOperationFields} from '../utils/system-fields'
import writeToFile from '../utils/write-to-file'

/**
 * Extract flows from the Clairview instance
 */

export async function extractFlows(dir: string) {
  try {
    const response = await api.client.request(readFlows(
      {limit: -1},
    ))

    const flows = filterFields(response, clairviewFlowFields)

    await writeToFile('flows', flows, dir)
    ux.log('Extracted flows')
  } catch (error) {
    ux.warn('Error extracting Flows:')
    ux.warn(error.message)
  }
}

/**
 * Extract operations from the Clairview instance
 */

export async function extractOperations(dir: string) {
  try {
    const response = await api.client.request(readOperations(
      {limit: -1},
    ))

    const operations = filterFields(response, clairviewOperationFields)

    await writeToFile('operations', operations, dir)
    ux.log('Extracted operations')
  } catch (error) {
    ux.warn('Error extracting Operations:')
    ux.warn(error.message)
  }
}

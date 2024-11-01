import type {AuthenticationClient, RestClient} from '@clairview/sdk'

export interface Schema{
    any
}

import {authentication, createClairview, rest} from '@clairview/sdk'
import Bottleneck from 'bottleneck'

class Api {
  public client: RestClient<Schema> & AuthenticationClient<Schema> | undefined
  private limiter: Bottleneck

  constructor() {
    this.limiter = new Bottleneck({
      minTime: 100, // Set min time between tasks here (1000 ms = 1 second)
      // You can set other options here as well.
    })
  }

  public initialize(url: string) {
    this.client = createClairview(url, {
      globals: {
        fetch: (...args) => this.limiter.schedule(() => fetch(...args)),
      },
    }).with(rest()).with(authentication())
  }

  public setAuthToken(token: string): void {
    this.client.setToken(token)
  }
}

const api = new Api()

export {api}

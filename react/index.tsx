import { canUseDOM } from 'vtex.render-runtime'
import type { DefaultPrivacyLevel } from '@datadog/browser-rum'

import type { PixelMessage } from './typings/events'

const datadogRum = import('@datadog/browser-rum')

// no-op for extension point
export default function () {
  return null
}

export function handleEvents(e: PixelMessage) {
  datadogRum.then(dd => {
    switch (e.data.eventName) {
      case 'vtex:userData': {
        const { data } = e

        if (!data.isAuthenticated) {
          break
        }

        dd.datadogRum.setUser({
          id: data.id,
          email: data.email,
          name: data.firstName
            ? `${data.firstName} ${data.lastName}`
            : undefined,
        })

        break
      }

      case 'vtex:cartId': {
        dd.datadogRum.setGlobalContextProperty('cart', {
          cartId: e.data.cartId,
        })

        break
      }

      case 'vtex:orderPlaced': {
        const order = e.data

        dd.datadogRum.setGlobalContextProperty('order', {
          ...order,
        })

        break
      }

      default: {
        break
      }
    }
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function init(settings: DatadogRumSettings, runtime: any) {
  if (!settings) {
    console.error('Datadog RUM Pixel: Missing settings')

    return
  }

  const {
    applicationId,
    clientToken,
    site,
    service,
    version,
    sessionSampleRate,
    sessionReplaySampleRate,
    trackUserInteractions,
    trackResources,
    trackLongTasks,
    defaultPrivacyLevel,
    activateInDev,
  } = settings

  const env = runtime.workspace === 'master' ? 'production' : 'development'

  if (!applicationId || !clientToken || !site || !service) {
    console.error('Datadog RUM Pixel: Missing required settings')

    return
  }

  if (env === 'development' && activateInDev === 'false') {
    console.info('Datadog RUM Pixel: Not activating in development environment')

    return
  }

  datadogRum.then(dd => {
    if (dd.datadogRum.getInternalContext()?.session_id) return

    dd.datadogRum.init({
      applicationId,
      clientToken,
      site,
      service,
      env: runtime.workspace,
      version,
      sessionSampleRate: Number(sessionSampleRate),
      sessionReplaySampleRate: Number(sessionReplaySampleRate),
      trackUserInteractions: trackUserInteractions === 'true',
      trackResources: trackResources === 'true',
      trackLongTasks: trackLongTasks === 'true',
      defaultPrivacyLevel: defaultPrivacyLevel as DefaultPrivacyLevel,
    })

    dd.datadogRum.startSessionReplayRecording()

    window.addEventListener('message', handleEvents)
  })
}

if (canUseDOM && window.__DD_RUM_PIXEL__) {
  init(window.__DD_RUM_PIXEL__, window.__RUNTIME__)
}

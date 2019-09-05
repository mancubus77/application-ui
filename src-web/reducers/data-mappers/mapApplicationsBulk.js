/*******************************************************************************
 * Licensed Materials - Property of IBM
 * 5737-E67
 * (c) Copyright IBM Corporation 2016, 2019. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *******************************************************************************/

import {
  filterRemoteClusterSubscriptions,
  getRemoteClusterSubscriptions
} from './utils'

// @flow
export const mapBulkApplications = applications => {
  if (applications) {
    const mappedApplications = applications.map(application => {
      if (application && application.items && application.related) {
        //keep remote cluster subscriptions in a separate list
        //we need that to find the remote clusters an app is deployed onto
        //there is no other way to get this info if we filter remote subscription
        const remoteSubscriptionsList = getRemoteClusterSubscriptions(
          application.related
        )
        application.related.push({
          kind: 'remoteSubscriptions',
          items: remoteSubscriptionsList
        })
        //now filter out remote cluster subscriptions from the subscriptions rel
        filterRemoteClusterSubscriptions(application.related)

        const items = application.items[0]

        return {
          name: items.name || '',
          namespace: items.namespace || '',
          dashboard: items.dashboard || '',
          selfLink: items.selfLink || '',
          _uid: items._uid || '',
          created: items.created || '',
          apigroup: items.apigroup || '',
          cluster: items.cluster || '',
          kind: items.kind || '',
          label: items.label || '',
          _hubClusterResource: items._hubClusterResource || '',
          _rbac: items._rbac || '',
          related: application.related || []
        }
      }
    })
    return mappedApplications || [{}]
  }
  return [
    {
      name: '',
      namespace: '',
      dashboard: '',
      selfLink: '',
      _uid: '',
      created: '',
      apigroup: '',
      cluster: '',
      kind: '',
      label: '',
      _hubClusterResource: '',
      _rbac: '',
      related: []
    }
  ]
}

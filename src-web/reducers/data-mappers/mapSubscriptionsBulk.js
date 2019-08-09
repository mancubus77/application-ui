/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2016, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

// @flow
export const mapBulkSubscriptions = subscriptions => {
  if (subscriptions) {
    const mappedSubscriptions = subscriptions.map(subscription => {
      if (subscription.items && subscription.related) {
        const items = subscription.items[0]
        return {
          name: items.name || '',
          namespace: items.namespace || '',
          selfLink: items.selfLink || '',
          _uid: items.uid || '',
          created: items.created || '',
          pathname: items.pathname || '',
          apigroup: items.apigroup || '',
          cluster: items.cluster || '',
          kind: items.kind || '',
          label: items.label || '',
          type: items.type || '',
          _hubClusterResource: items._hubClusterResource || '',
          _rbac: items._rbac || '',
          related: subscription.related || []
        }
      }
    })
    return mappedSubscriptions || [{}]
  }
  return [
    {
      name: '',
      namespace: '',
      selfLink: '',
      _uid: '',
      created: '',
      pathname: '',
      apigroup: '',
      cluster: '',
      kind: '',
      label: '',
      type: '',
      _hubClusterResource: '',
      _rbac: '',
      related: []
    }
  ]
}

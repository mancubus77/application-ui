/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017, 2019. All Rights Reserved.
 * Copyright (c) 2020 Red Hat, Inc.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *******************************************************************************/
'use strict'

import lodash from 'lodash'

import { RESOURCE_TYPES } from '../../lib/shared/constants'

import hcmapplications from './hcm-applications'
import hcmchannels from './hcm-channel'
import hcmsubscriptions from './hcm-subscription'
import hcmplacementrules from './hcm-placementrule'

const resourceData = {
  [RESOURCE_TYPES.HCM_APPLICATIONS.name]: hcmapplications,
  [RESOURCE_TYPES.HCM_CHANNELS.name]: hcmchannels,
  [RESOURCE_TYPES.HCM_SUBSCRIPTIONS.name]: hcmsubscriptions,
  [RESOURCE_TYPES.HCM_PLACEMENT_RULES.name]: hcmplacementrules,
  [RESOURCE_TYPES.QUERY_APPLICATIONS.name]: hcmapplications
}

function getResourceData(resourceType) {
  const def = resourceData[resourceType.name]
  if (!def) {
    //eslint-disable-next-line no-console
    console.error(`No resource data found for '${resourceType}'`)
  }
  return def
}

export default getResourceData

export function getPrimaryKey(resourceType) {
  const def = getResourceData(resourceType)
  let pk = def.primaryKey

  if (!pk) {
    pk = 'metadata.uid'
  }

  return pk
}

export function getSecondaryKey(resourceType) {
  const def = getResourceData(resourceType)
  let sk = def.secondaryKey

  if (!sk) {
    sk = 'cluster'
  }

  return sk
}

export function getURIKey(resourceType) {
  const def = getResourceData(resourceType)
  let uriKey = def.uriKey

  if (!uriKey) {
    uriKey = 'metadata.name'
  }

  return uriKey
}

export function getDefaultSearchField(resourceType) {
  var def = getResourceData(resourceType)
  let sf = def && def.defaultSearchField
  if (!def || !def.tableKeys || (def && def.tableKeys.length < 1)) {
    //eslint-disable-next-line no-console
    console.error(`No table keys found in ${resourceType} resource definition`)
  }
  if (!sf) {
    sf =
      def && def.tableKeys && def.tableKeys[0] && def.tableKeys[0].resourceKey
  }
  return sf
}

export function getDefaultSortField(resourceType) {
  var def = getResourceData(resourceType)
  let sf = def && def.defaultSortField
  if (!def || !def.tableKeys || (def && def.tableKeys.length < 1)) {
    //eslint-disable-next-line no-console
    console.error(`No table keys found in ${resourceType} resource definition`)
  }
  if (!sf) {
    sf =
      def && def.tableKeys && def.tableKeys[0] && def.tableKeys[0].resourceKey
  }
  if (!sf) {
    //eslint-disable-next-line no-console
    console.error(
      `No sortable fields defined for '${resourceType}' resource definition`
    )
  }
  return sf
}

export function getTableKeys(resourceType) {
  var def = getResourceData(resourceType)
  return def.tableKeys
}

export function getLink(link, resource) {
  if (typeof link === 'boolean') {
    return `/${resource.metadata.namespace}/${resource.metadata.name}`
  } else if (typeof link === 'function') {
    return link(resource)
  } else {
    const parts = link.split('/')
    let path = ''
    parts.forEach(part => {
      const value = lodash.get(resource, part)
      path += `/${encodeURIComponent(value)}`
    })
    return path
  }
}

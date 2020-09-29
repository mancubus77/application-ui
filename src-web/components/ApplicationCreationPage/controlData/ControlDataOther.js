/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 *******************************************************************************/
'use strict'

import placementData from './ControlDataPlacement'
import prePostTasks from './ControlDataPrePostTasks'

const otherChannelData = [

  ////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////  clusters  /////////////////////////////////////
  {
    id: 'channelName',
    type: 'hidden',
    active: 'resource'
  },
  {
    id: 'channelNamespace',
    type: 'hidden',
    active: ''
  },
  {
    name: 'creation.app.namespace.name',
    tooltip: 'tooltip.creation.app.namespace.name',
    id: 'namespaceChannelName',
    type: 'text',
    active: '',
    placeholder: 'app.enter.select.namespace.name',
    available: [],
    reverse: 'Channel[0].spec.pathname'
  },
  ...prePostTasks,
  ...placementData
]

export default otherChannelData
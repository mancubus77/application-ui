/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
'use strict'

import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import ClustersTopologyDiagram from '../../../src-web/components/ClustersTopologyDiagram'
import * as Actions from '../../../src-web/actions'

describe('ClustersTopologyDiagram component 1', () => {
  const mockData = {
    activeFilters: {},
    clusters: [],
    nodes:[],
    links:[],
    onSelectedNodeChange: jest.fn()
  }
  it('renders as expected', () => {
    const component = renderer.create(
      <ClustersTopologyDiagram
        clusters={mockData.clusters}
        nodes={mockData.nodes}
        links={mockData.links}
        activeFilters={mockData.activeFilters}
        onSelectedNodeChange={mockData.onSelectedNodeChange}
        selectedNodeId={mockData.selectedNodeId}
        status={Actions.REQUEST_STATUS.DONE}
      />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

const mockData = {
  'clusters':[
    {
      'id':'5b57cb37d7f883001b15d7f9',
      'index':0,
      'name':'crucial-owl'
    },
    {
      'id':'5b57cbb101ce3f001b7018f0',
      'index':1,
      'name':'myminikube'
    }
  ],
  'nodes':[
    {
      'id':'5b57cb3825f660891c811e11',
      'uid':'b5c462ec-8389-11e8-bdf2-005056a0d11b',
      'name':'reeling-lemur-hcm-demoaccessories-templatedb',
      'cluster':'5b57cb37d7f883001b15d7f9',
      'type':'service',
      'namespace':'default',
      'topology':'services',
      '__typename':'Resource'
    },
    {
      'id':'5b57cb3825f660891c811e20',
      'uid':'792aab50-7a1b-11e8-bdf2-005056a0d11b',
      'name':'etcd-service',
      'cluster':'5b57cb37d7f883001b15d7f9',
      'type':'service',
      'namespace':'default',
      'topology':'services',
      '__typename':'Resource'
    },
    {
      'id':'5b57cb3825f660891c811e32',
      'uid':'8c479bdd-8ed6-11e8-bdf2-005056a0d11b',
      'name':'justin-testing-jenkinsch',
      'cluster':'5b57cb37d7f883001b15d7f9',
      'type':'service',
      'namespace':'default',
      'topology':'services',
      '__typename':'Resource'
    },
    {
      'id':'5b57cb3825f660891c811e36',
      'uid':'b5c0611e-8389-11e8-bdf2-005056a0d11b',
      'name':'reeling-lemur-hcm-demoaccessories-instancedb',
      'cluster':'5b57cb37d7f883001b15d7f9',
      'type':'service',
      'namespace':'default',
      'topology':'services',
      '__typename':'Resource'
    },
    {
      'id':'5b57cb3825f660891c811e37',
      'uid':'4545958f-5545-11e8-bdf2-005056a0d11b',
      'name':'kubernetes',
      'cluster':'5b57cb37d7f883001b15d7f9',
      'type':'service',
      'namespace':'default',
      'topology':'services',
      '__typename':'Resource'
    },
    {
      'id':'5b57cb3825f660891c811e3c',
      'uid':'545cb76d-7a1b-11e8-bdf2-005056a0d11b',
      'name':'proxy-etcd-storage',
      'cluster':'5b57cb37d7f883001b15d7f9',
      'type':'service',
      'namespace':'default',
      'topology':'services',
      '__typename':'Resource'
    },
    {
      'id':'5b57cb3825f660891c811e50',
      'uid':'b5c61ea0-8389-11e8-bdf2-005056a0d11b',
      'name':'reeling-lemur-hcm-demoaccessories-templatedb',
      'cluster':'5b57cb37d7f883001b15d7f9',
      'type':'deployment',
      'namespace':'default',
      'topology':'kube-controllers',
      '__typename':'Resource'
    },
    {
      'id':'5b57cb3825f660891c811e57',
      'uid':'8c486643-8ed6-11e8-bdf2-005056a0d11b',
      'name':'justin-testing-jenkinsch',
      'cluster':'5b57cb37d7f883001b15d7f9',
      'type':'deployment',
      'namespace':'default',
      'topology':'kube-controllers',
      '__typename':'Resource'
    },
    {
      'id':'5b57cb3825f660891c811e69',
      'uid':'85621f1f-7a1b-11e8-bdf2-005056a0d11b',
      'name':'etcd-operator',
      'cluster':'5b57cb37d7f883001b15d7f9',
      'type':'deployment',
      'namespace':'default',
      'topology':'kube-controllers',
      '__typename':'Resource'
    },
    {
      'id':'5b57cb3825f660891c811e6e',
      'uid':'7936fc03-7a1b-11e8-bdf2-005056a0d11b',
      'name':'etcd-v1',
      'cluster':'5b57cb37d7f883001b15d7f9',
      'type':'deployment',
      'namespace':'default',
      'topology':'kube-controllers',
      '__typename':'Resource'
    },
    {
      'id':'5b57cb3825f660891c811e71',
      'uid':'b5c52eb4-8389-11e8-bdf2-005056a0d11b',
      'name':'reeling-lemur-hcm-demoaccessories-instancedb',
      'cluster':'5b57cb37d7f883001b15d7f9',
      'type':'deployment',
      'namespace':'default',
      'topology':'kube-controllers',
      '__typename':'Resource'
    },
    {
      'id':'5b57cb3825f660891c811e73',
      'uid':'54672c64-7a1b-11e8-bdf2-005056a0d11b',
      'name':'proxy-etcd-storage-v1',
      'cluster':'5b57cb37d7f883001b15d7f9',
      'type':'deployment',
      'namespace':'default',
      'topology':'kube-controllers',
      '__typename':'Resource'
    },
    {
      'id':'5b57cb3825f660891c811ea0',
      'uid':'00018318-7bfe-11e8-bdf2-005056a0d11b',
      'name':'selenium-acs-1530319117885-hcm-allinone-hcmm-9d478cff-8h4dj',
      'cluster':'5b57cb37d7f883001b15d7f9',
      'type':'pod',
      'namespace':'default',
      'topology':'pods',
      '__typename':'Resource'
    },
    {
      'id':'5b57cb3825f660891c811ea5',
      'uid':'64c68f10-7c08-11e8-bdf2-005056a0d11b',
      'name':'selenium-acs-1530323581078-hcm-allinone-hcmm-855cd86c9-2knmn',
      'cluster':'5b57cb37d7f883001b15d7f9',
      'type':'pod',
      'namespace':'default',
      'topology':'pods',
      '__typename':'Resource'
    },
    {
      'id':'5b57cb3825f660891c811eb8',
      'uid':'b5ce532c-8389-11e8-bdf2-005056a0d11b',
      'name':'reeling-lemur-hcm-demoaccessories-instancedb-669d858557-v2p8b',
      'cluster':'5b57cb37d7f883001b15d7f9',
      'type':'pod',
      'namespace':'default',
      'topology':'pods',
      '__typename':'Resource'
    },
    {
      'id':'5b57cb3825f660891c811ebe',
      'uid':'546e1b9d-7a1b-11e8-bdf2-005056a0d11b',
      'name':'proxy-etcd-storage-v1-5656c79bbc-fgz5p',
      'cluster':'5b57cb37d7f883001b15d7f9',
      'type':'pod',
      'namespace':'default',
      'topology':'pods',
      '__typename':'Resource'
    },
    {
      'id':'5b57cb3825f660891c811ec1',
      'uid':'79421b13-7a1b-11e8-bdf2-005056a0d11b',
      'name':'etcd-v1-57f5bbfd4-fqzk9',
      'cluster':'5b57cb37d7f883001b15d7f9',
      'type':'pod',
      'namespace':'default',
      'topology':'pods',
      '__typename':'Resource'
    },
    {
      'id':'5b57cb3825f660891c811ec2',
      'uid':'8c4eeaf7-8ed6-11e8-bdf2-005056a0d11b',
      'name':'justin-testing-jenkinsch-594898c684-tgdsf',
      'cluster':'5b57cb37d7f883001b15d7f9',
      'type':'pod',
      'namespace':'default',
      'topology':'pods',
      '__typename':'Resource'
    },
    {
      'id':'5b57cb3825f660891c811edb',
      'uid':'b5cdd220-8389-11e8-bdf2-005056a0d11b',
      'name':'reeling-lemur-hcm-demoaccessories-templatedb-86c5755c4b-hmxx2',
      'cluster':'5b57cb37d7f883001b15d7f9',
      'type':'pod',
      'namespace':'default',
      'topology':'pods',
      '__typename':'Resource'
    },
    {
      'id':'5b57cb3825f660891c811ee4',
      'uid':'8563dd2a-7a1b-11e8-bdf2-005056a0d11b',
      'name':'etcd-operator-7d5b777654-9cl5q',
      'cluster':'5b57cb37d7f883001b15d7f9',
      'type':'pod',
      'namespace':'default',
      'topology':'pods',
      '__typename':'Resource'
    },
    {
      'id':'5b57cbb125f660891c812113',
      'uid':'86ccc5c3-8455-11e8-8c39-005056a021ea',
      'name':'undercooked-dragonfly-hcm-demoaccessories-templatedb-6f96fb684b',
      'cluster':'5b57cbb101ce3f001b7018f0',
      'type':'pod',
      'namespace':'default',
      'topology':'pods',
      '__typename':'Resource'
    },
    {
      'id':'5b57cbb125f660891c812115',
      'uid':'e8753e7b-845c-11e8-8c39-005056a021ea',
      'name':'exiled-anteater-hcm-demoaccessories-instancedb-54c5456447-794h6',
      'cluster':'5b57cbb101ce3f001b7018f0',
      'type':'pod',
      'namespace':'default',
      'topology':'pods',
      '__typename':'Resource'
    },
    {
      'id':'5b57cbb125f660891c812129',
      'uid':'86c446fb-8455-11e8-8c39-005056a021ea',
      'name':'undercooked-dragonfly-hcm-demoaccessories-instancedb-58cffl4hzl',
      'cluster':'5b57cbb101ce3f001b7018f0',
      'type':'pod',
      'namespace':'default',
      'topology':'pods',
      '__typename':'Resource'
    },
    {
      'id':'5b57cbb125f660891c81213f',
      'uid':'e8754e5b-845c-11e8-8c39-005056a021ea',
      'name':'exiled-anteater-hcm-demoaccessories-templatedb-68885d9b6d-x6fvp',
      'cluster':'5b57cbb101ce3f001b7018f0',
      'type':'pod',
      'namespace':'default',
      'topology':'pods',
      '__typename':'Resource'
    },
    {
      'id':'5b57cbb125f660891c812160',
      'uid':'86ba5c47-8455-11e8-8c39-005056a021ea',
      'name':'undercooked-dragonfly-hcm-demoaccessories-instancedb',
      'cluster':'5b57cbb101ce3f001b7018f0',
      'type':'deployment',
      'namespace':'default',
      'topology':'kube-controllers',
      '__typename':'Resource'
    },
    {
      'id':'5b57cbb125f660891c812166',
      'uid':'86bc3371-8455-11e8-8c39-005056a021ea',
      'name':'undercooked-dragonfly-hcm-demoaccessories-templatedb',
      'cluster':'5b57cbb101ce3f001b7018f0',
      'type':'deployment',
      'namespace':'default',
      'topology':'kube-controllers',
      '__typename':'Resource'
    },
    {
      'id':'5b57cbb125f660891c812174',
      'uid':'e850ce0d-845c-11e8-8c39-005056a021ea',
      'name':'exiled-anteater-hcm-demoaccessories-instancedb',
      'cluster':'5b57cbb101ce3f001b7018f0',
      'type':'deployment',
      'namespace':'default',
      'topology':'kube-controllers',
      '__typename':'Resource'
    },
    {
      'id':'5b57cbb125f660891c81217d',
      'uid':'e852a03a-845c-11e8-8c39-005056a021ea',
      'name':'exiled-anteater-hcm-demoaccessories-templatedb',
      'cluster':'5b57cbb101ce3f001b7018f0',
      'type':'deployment',
      'namespace':'default',
      'topology':'kube-controllers',
      '__typename':'Resource'
    },
    {
      'id':'5b5adfd625f660891c939943',
      'uid':'86b49b1a-8455-11e8-8c39-005056a021ea',
      'name':'undercooked-dragonfly-hcm-demoaccessories-instancedb',
      'cluster':'5b57cbb101ce3f001b7018f0',
      'type':'service',
      'namespace':'default',
      'topology':'services',
      '__typename':'Resource'
    },
    {
      'id':'5b5adfd625f660891c939952',
      'uid':'f7c89aa0-7b9f-11e8-8c39-005056a021ea',
      'name':'kubernetes',
      'cluster':'5b57cbb101ce3f001b7018f0',
      'type':'service',
      'namespace':'default',
      'topology':'services',
      '__typename':'Resource'
    },
    {
      'id':'5b5adfd625f660891c939956',
      'uid':'e848c469-845c-11e8-8c39-005056a021ea',
      'name':'exiled-anteater-hcm-demoaccessories-instancedb',
      'cluster':'5b57cbb101ce3f001b7018f0',
      'type':'service',
      'namespace':'default',
      'topology':'services',
      '__typename':'Resource'
    },
    {
      'id':'5b5adfd625f660891c939967',
      'uid':'86b97b73-8455-11e8-8c39-005056a021ea',
      'name':'undercooked-dragonfly-hcm-demoaccessories-templatedb',
      'cluster':'5b57cbb101ce3f001b7018f0',
      'type':'service',
      'namespace':'default',
      'topology':'services',
      '__typename':'Resource'
    },
    {
      'id':'5b5adfd625f660891c939968',
      'uid':'e84fcf01-845c-11e8-8c39-005056a021ea',
      'name':'exiled-anteater-hcm-demoaccessories-templatedb',
      'cluster':'5b57cbb101ce3f001b7018f0',
      'type':'service',
      'namespace':'default',
      'topology':'services',
      '__typename':'Resource'
    }
  ],
  'links':[
    {
      'source':'545cb76d-7a1b-11e8-bdf2-005056a0d11b',
      'target':'792aab50-7a1b-11e8-bdf2-005056a0d11b',
      'label':'calls',
      'type':'calls',
      'uid':'545cb76d-7a1b-11e8-bdf2-005056a0d11b792aab50-7a1b-11e8-bdf2-005056a0d11b'
    },
    {
      'source':'54672c64-7a1b-11e8-bdf2-005056a0d11b',
      'target':'7936fc03-7a1b-11e8-bdf2-005056a0d11b',
      'label':'calls',
      'type':'calls',
      'uid':'54672c64-7a1b-11e8-bdf2-005056a0d11b7936fc03-7a1b-11e8-bdf2-005056a0d11b'
    },
    {
      'source':'546e1b9d-7a1b-11e8-bdf2-005056a0d11b',
      'target':'79421b13-7a1b-11e8-bdf2-005056a0d11b',
      'label':'calls',
      'type':'calls',
      'uid':'546e1b9d-7a1b-11e8-bdf2-005056a0d11b79421b13-7a1b-11e8-bdf2-005056a0d11b'
    }
  ],
  'activeFilters':{
    'namespace':[
      {
        'label':'default'
      }
    ]
  },
  'selectedNodeId':'',
  'status':'DONE'
}

describe('ClustersTopologyDiagram component 2', () => {
  it('renders as expected', () => {
    const component = shallow(
      <ClustersTopologyDiagram
        clusters={mockData.clusters}
        nodes={mockData.nodes}
        links={mockData.links}
        activeFilters={mockData.activeFilters}
        onSelectedNodeChange={jest.fn()}
        selectedNodeId={mockData.selectedNodeId}
        status={mockData.status}
      />
    )
    expect(component).toMatchSnapshot()
  })
})
/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017, 2019. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *******************************************************************************/

import {
    getAllDeployablesStatus,
    getNumClusters,
    getNumIncidents,
    getApplicationName,
    getApplicationNamespace,
    getSingleApplicationObject,
    getChannelsCountFromSubscriptions,
    getNumPlacementRules,
    getSubscriptionDataOnHub,
    getSubscriptionDataOnManagedClusters,
    getPodData,
    getPolicyViolationData,
    getIncidentData
} from './utils'

// getNumIncidents

// describe('getNumIncidents', () => {

//     it('abc', () => {
//         const num = getNumClusters(sampleApplicationData, sampleSubscriptionData)
//         console.log("numClusters", num)
//         expect(true).toEqual(true)

//     })

// })

//getApplicationName

// getApplicationNamespace

// getSingleApplicationObject

// getChannelsCountFromSubscriptions

// getNumPlacementRules

// getSubscriptionDataOnHub

// getSubscriptionDataOnManagedClusters

// getPodData
describe('getPodData', () => {
    it('has pod data', () => {
        const podData = getPodData(
            podSampleData,
            'app1', 'default')

        expect(podData.total).toEqual(9)
        expect(podData.running).toEqual(4)
        expect(podData.failed).toEqual(5)
    }
    )
    it('no pod data', () => {
        const podData = getPodData(
            emptyData,
            'app1', 'default')

        expect(podData.total).toEqual(0)
        expect(podData.running).toEqual(0)
        expect(podData.failed).toEqual(0)
    }
    )

})

// getPolicyViolationData
describe('getPolicyViolationData', () => {
    it('has policy violation data', () => {
        const policyViolationData = getPolicyViolationData(
            policyViolationSampleData,
            'app1',
            'default'
        )

        expect(policyViolationData.VAViolations).toEqual(3)
        expect(policyViolationData.MAViolations).toEqual(1)
    })
    it('no policy violation data', () => {
        const policyViolationData = getPolicyViolationData(
            emptyData,
            'app1',
            'default'
        )

        expect(policyViolationData.VAViolations).toEqual(0)
        expect(policyViolationData.MAViolations).toEqual(0)
    })
})

// getIncidentData
describe('getIncidentData', () => {
    it('get incidents from list', () => {
        const incidentData = getIncidentData(incidents)

        expect(incidentData.priority1).toEqual(3)
        expect(incidentData.priority2).toEqual(2)
    })

    it('empty incident list', () => {
        const incidentData = getIncidentData(emptyData)

        expect(incidentData.priority1).toEqual(0)
        expect(incidentData.priority2).toEqual(0)
    })
})

const emptyData = { items: [] }

// total: 9, running: 4, failed: 5
const podSampleData = {
    items: [
        {
            name: 'app1',
            namespace: 'default',
            related: [
                {
                    kind: 'pod',
                    items: [
                        {
                            status: 'deployed',
                            name: 'p1',
                            namespace: 'default'
                        },
                        {
                            status: 'deployed',
                            name: 'p2',
                            namespace: 'default'
                        },
                        {
                            status: 'pass',
                            name: 'p3',
                            namespace: 'default'
                        },
                        {
                            status: 'running',
                            name: 'p4',
                            namespace: 'default'
                        },
                        {
                            status: 'fail',
                            name: 'p5',
                            namespace: 'default'
                        },
                        {
                            status: 'fail',
                            name: 'p6',
                            namespace: 'default'
                        },
                        {
                            status: 'error',
                            name: 'p7',
                            namespace: 'default'
                        },
                        {
                            status: 'error',
                            name: 'p8',
                            namespace: 'default'
                        },
                        {
                            status: 'imagepullbackoff',
                            name: 'p9',
                            namespace: 'default'
                        },
                    ]
                }
            ],
        }
    ]
}


const incidents = {
    items: [
        { priority: 1 },
        { priority: 2 },
        { priority: 2 },
        { priority: 1 },
        { priority: 1 }
    ]
}

const policyViolationSampleData = {
    items: [
        {
            name: 'app1',
            namespace: 'default',
            related: [
                {
                    kind: 'vulnerabilitypolicy',
                    items: [
                        {
                            severity: 'low',
                            name: 'vp1',
                            namespace: 'default'
                        },
                        {
                            severity: 'medium',
                            name: 'vp2',
                            namespace: 'default'
                        },
                        {
                            severity: 'low',
                            name: 'vp3',
                            namespace: 'default'
                        }
                    ]
                },
                {
                    kind: 'mutationpolicy',
                    items: [
                        {
                            severity: 'high',
                            name: 'vp4',
                            namespace: 'default'
                        }
                    ]
                }
            ],
        }
    ]
}

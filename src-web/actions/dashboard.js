/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import apolloClient from '../../lib/client/apollo-client'
import {receiveResourceError, receiveDashboardSuccess, requestResource} from './common'

// TODO: add dashboard filters container and combine all filters' actions

export const fetchDashboardResources = (resourceType, vars) => {
  return (dispatch) => {
    dispatch(requestResource(resourceType))
    return apolloClient.get(resourceType, vars)
      .then(response => {
        if (response.errors) {
          return dispatch(receiveResourceError(response.errors[0], resourceType))
        }
        return dispatch(receiveDashboardSuccess({
          pieChartItems: response.data.dashboard.pieChartItems,
          barChartItems: response.data.dashboard.barChartItems,
          cardItems: response.data.dashboard.cardItems,
        }, resourceType))
      })
      .catch(err => dispatch(receiveResourceError(err, resourceType)))
  }
}

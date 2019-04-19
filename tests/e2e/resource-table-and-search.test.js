/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

const config = require('../../config')
const ROUTE = {
  'cluster': ['/clusters','hub-cluster'],
  'compliance': ['/policies','compliance-xz'],
  'local_policies': ['/policies/local','policy-xz-2'],
  'applications': ['/applications','gbapp-gbapp'],
  // 'helm_releases': ['/releases','audit-logging'],
  'pods': ['/pods','audit-logging-fluentd-ds-lgjpj'],
  'nodes': ['/nodes','9.37.137.174'],
  'persistent_volume': ['/storage','helm-repo-pv'],
  'persistent_volume_claim': ['/storage/claims','helm-repo-pvc']
}

module.exports = {
  '@disabled': true,//re-enabled after test environment has clusters

  before: function (browser) {
    const loginPage = browser.page.LoginPage()
    loginPage.navigate()
    loginPage.authenticate()
  },

  'Cluster Page: table and search': (browser) => { //not installed as default
    verifyResourcePage(browser, ROUTE['cluster'][0],false)
    verifyTableSearch(browser, ROUTE['cluster'][0], ROUTE['cluster'][1])
  },


  // 'Application Page: table and search': (browser) => { //not installed as default
  //   verifyResourcePage(browser, ROUTE['applications'][0],false)
  //   verifyTableSearch(browser, ROUTE['applications'][0], ROUTE['applications'][1])
  // },

  // 'Helm Release Page: table and search': (browser) => {
  //   verifyResourcePage(browser, ROUTE['helm_releases'][0],false)
  //   verifyTableSearch(browser, ROUTE['helm_releases'][0], ROUTE['helm_releases'][1])
  // },



  after: function (browser, done) {
    setTimeout(() => {
      browser.end()
      done()
    })
  }
}

function verifyTableSearch(browser, subUrl, searchInput) {
  const url = `${browser.launch_url}${config.get('contextPath')}${subUrl}`
  const page = browser.page.TableSearchTest()
  page.navigate(url)
  page.verifySearchInput(browser,searchInput)
  page.verifySearchResult(browser,searchInput)
}

function verifyResourcePage(browser, subUrl,hasTabs) {
  const url = `${browser.launch_url}${config.get('contextPath')}${subUrl}`
  const resourceTablePage = browser.page.ResourceTablePage()
  resourceTablePage.navigate(url)
  resourceTablePage.verifyPageContent()
  resourceTablePage.verifySecondaryHeader(hasTabs)
}

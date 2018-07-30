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
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import resources from '../../../lib/shared/resources'
import config from '../../../lib/shared/config'
import LayoutHelper from './layoutHelper'
import LinkHelper from './linkHelper'
import NodeHelper from './nodeHelper'
import msgs from '../../../nls/platform.properties'
import _ from 'lodash'


resources(() => {
  require('../../../scss/cluster-viewer.scss')
  require('../../../scss/topology-link.scss')
  require('../../../scss/topology-node.scss')
})

var currentZoom = {x:0, y:0, k:1}

class ClusterViewer extends React.Component {

  static propTypes = {
    activeFilters: PropTypes.object,
    id: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      source: PropTypes.any,
      target: PropTypes.any,
      label: PropTypes.string,
      type: PropTypes.string,
    })),
    name: PropTypes.string,
    nodes: PropTypes.arrayOf(PropTypes.shape({
      cluster: PropTypes.string,
      uid: PropTypes.string.isRequired,
      type: PropTypes.string,
      name: PropTypes.string,
    })),
    onSelectedNodeChange: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = {
      activeFilters: props.activeFilters,
      links: props.links,
      nodes: props.nodes,
      hiddenNodes: new Set(),
      hiddenLinks: new Set()
    }
    this.layoutHelper = new LayoutHelper()

    this.setContainerRef = elem => {
      this.containerRef = elem
    }
  }

  componentDidMount() {
    this.generateDiagram()
  }

  componentDidUpdate(){
    this.generateDiagram()
  }

  shouldComponentUpdate(nextProps, nextState){
    return this.state.activeFilters!== nextState.activeFilters
    || !_.isEqual(this.state.nodes.map(n => n.id), nextState.nodes.map(n => n.id))
    || !_.isEqual(this.state.links.map(l => l.uid), nextState.links.map(l => l.uid))
    || !_.isEqual(this.state.hiddenNodes, nextState.hiddenNodes)
    || !_.isEqual(this.state.hiddenLinks, nextState.hiddenLinks)
  }

  componentWillReceiveProps(){
    this.setState((prevState, props) => {
      // cache live update links and nodes until filter is changed
      let nodes, links
      const hiddenNodes = new Set()
      const hiddenLinks = new Set()
      if (props.activeFilters !== prevState.activeFilters) {
        this.resetDiagram()
        nodes = _.cloneDeep(props.nodes)
        links = _.cloneDeep(props.links)
      } else {
        // to stabilize layout, just hide objects in diagram that are gone
        prevState.nodes.forEach(a=>{
          if (props.nodes.findIndex(b=>{
            return a.uid===b.uid
          })==-1) {
            hiddenNodes.add(a.uid)
          }
        })
        prevState.links.forEach(a=>{
          if (props.links.findIndex(b=>{
            return a.uid===b.uid
          })==-1) {
            hiddenLinks.add(a.uid)
          }
        })

        // keep cache of everything
        const compare = (a,b) => {
          return a.uid===b.uid
        }
        nodes = _.unionWith(prevState.nodes, props.nodes, compare)
        links = _.unionWith(prevState.links, props.links, compare)
      }
      return {links, nodes, hiddenNodes, hiddenLinks, activeFilters: props.activeFilters}
    })

  }

  render() {
    const { id, name } = this.props
    const { locale } = this.context
    return (
      <div className="clusterViewerDiagram" ref={this.setContainerRef} >
        <div className='clusterViewerTitle'>
          {msgs.get('cluster.name', [name], locale)}
        </div>
        <div className='clusterViewerContainer'>
          <svg id={name+id} className="topologyDiagram" />
          <input type='image' alt='zoom-in' className='zoom-in'
            onClick={this.handleZoomIn} src={`${config.contextPath}/graphics/zoom-in.svg`} />
          <input type='image' alt='zoom-out' className='zoom-out'
            onClick={this.handleZoomOut} src={`${config.contextPath}/graphics/zoom-out.svg`} />
          <input type='image' alt='zoom-target' className='zoom-target'
            onClick={this.handleTarget} src={`${config.contextPath}/graphics/zoom-center.svg`} />
        </div>
      </div>
    )
  }

  handleNodeClick = (node) => {
    this.props.onSelectedNodeChange(node.uid)
    d3.event.stopPropagation()
  }


  resetDiagram = () => {
    if (this.svg) {
      this.svg.selectAll('*').remove()
      delete this.svg
    }
    this.layoutHelper = new LayoutHelper()
    delete this.lastLayoutBBox
  }

  generateDiagram() {
    if (!this.containerRef) {
      return
    }

    if (!this.svg) {
      const {id, name} = this.props
      this.svg = d3.select('#'+name+id)
      this.svg.append('g').attr('class', 'clusters')
      this.svg.append('g').attr('class', 'links') // Links must be added before nodes, so nodes are painted on top.
      this.svg.append('g').attr('class', 'nodes')
      this.svg.on('click', this.props.onSelectedNodeChange)
      this.svg.call(this.getSvgSpace())
    }

    // consolidate nodes/filter links/add layout data to each element
    const {nodes, links, hiddenNodes, hiddenLinks} = this.state
    this.layoutBBox = this.layoutHelper.layout(nodes, links, hiddenNodes, hiddenLinks, (layoutNodes)=>{

      // resize diagram to fit all the nodes
      const firstLayout = !this.lastLayoutBBox
      if (firstLayout ||
          (Math.abs((this.layoutBBox.width - this.lastLayoutBBox.width)/this.layoutBBox.width) > .20)||
          (Math.abs((this.layoutBBox.height - this.lastLayoutBBox.height)/this.layoutBBox.height) > .20)) {
        this.zoomFit()
      }

      // Create or refresh the nodes in the diagram.
      const moveTrans = d3.transition()
        .duration(firstLayout?400:1000)
        .ease(d3.easeSinOut)
      const opacityTrans = d3.transition()
        .duration(400)
        .ease(d3.easeSinOut)

      // Create or refresh the links in the diagram.
      const linkHelper = new LinkHelper(this.svg, links)
      linkHelper.removeOldLinksFromDiagram()
      linkHelper.addLinksToDiagram(currentZoom)
      linkHelper.moveLinks(moveTrans, opacityTrans)

      const nodeHelper = new NodeHelper(this.svg, layoutNodes, linkHelper)
      nodeHelper.removeOldNodesFromDiagram()
      nodeHelper.addNodesToDiagram(currentZoom, this.handleNodeClick)
      nodeHelper.moveNodes(moveTrans)

      this.lastLayoutBBox = this.layoutBBox
    })
  }

  getSvgSpace(duration=0){
    const svgSpace = d3.zoom()
      .scaleExtent([ 0.25, 4 ])
      .on('zoom', () => {
        currentZoom = d3.event.transform
        const {id, name} = this.props
        const svg = d3.select('#'+name+id)
        const transition = d3.transition()
          .duration(duration)
          .ease(d3.easeSinOut)
        svg.select('g.nodes').selectAll('g.node')
          .transition(transition)
          .attr('transform', d3.event.transform)
        svg.select('g.links').selectAll('g.link')
          .transition(transition)
          .attr('transform', d3.event.transform)
      })
    return svgSpace
  }

  handleZoomIn = () => {
    this.getSvgSpace(200).scaleBy(this.svg, 1.3)
  }

  handleZoomOut = () => {
    this.getSvgSpace(200).scaleBy(this.svg, 1 / 1.3)
  }

  handleTarget = () => {
    this.zoomFit()
  }

  zoomFit = () => {
    const {width, height} = this.layoutBBox
    if (width && height) {
      const root = this.svg.select('g.nodes')
      const parent = root.node().parentElement
      const fullWidth = parent.clientWidth
      const fullHeight = parent.clientHeight
      const scale = Math.min( 1, .99 / Math.max(width / fullWidth, height / fullHeight))
      this.getSvgSpace(200).translateTo(this.svg, width/2, height/2)
      this.getSvgSpace(200).scaleTo(this.svg, scale)
    }
  }
}

export default ClusterViewer
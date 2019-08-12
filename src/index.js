import _ from 'lodash'
import random from 'canvas-sketch-util/random'
import * as THREE from 'three'
import { fract, lerp } from 'canvas-sketch-util/math'
import Color from 'canvas-sketch-util/color'
const OrbitControls = require('three-orbitcontrols')
import './style.css'

var camera, scene, renderer, controls
var mesh
init()
animate()
function init() {
  //Camera
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.z = 400
  scene = new THREE.Scene()

  var geometry = new THREE.BoxBufferGeometry(200, 200, 200)
  var material = new THREE.MeshBasicMaterial()
  mesh = new THREE.Mesh(geometry, material)

  scene.add(mesh)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  controls = new OrbitControls(camera, renderer.domElement)
  controls.update()

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  //
  window.addEventListener('resize', onWindowResize, false)
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
function animate() {
  controls.update()

  requestAnimationFrame(animate)
  mesh.rotation.x += 0.005
  mesh.rotation.y += 0.01
  renderer.render(scene, camera)
}

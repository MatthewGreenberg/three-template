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
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  )
  camera.position.z = 3
  scene = new THREE.Scene()

  addLights()
  addMesh()

  renderer = new THREE.WebGLRenderer({ antialias: true })
  controls = new OrbitControls(camera, renderer.domElement)
  controls.update()

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  //
  window.addEventListener('resize', onWindowResize, false)
}

function addMesh() {
  var geometry = new THREE.BoxBufferGeometry(1, 1, 1)
  var material = new THREE.MeshStandardMaterial({ color: 'rgb(250,0,0)' })
  mesh = new THREE.Mesh(geometry, material)

  scene.add(mesh)
}

function addLights() {
  var hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.6)
  hemiLight.position.set(0, 3, 0)
  scene.add(hemiLight)
  var pointLight = new THREE.PointLight(0xff00ff, 5, 0)
  pointLight.position.set(3, 0, 0)
  scene.add(pointLight)
  var pointLight2 = new THREE.PointLight(0x0000ff, 5, 0)
  pointLight2.position.set(-3, 0, 0)
  scene.add(pointLight2)
  var sphereSize = 1
  var pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize)
  var pointLightHelper2 = new THREE.PointLightHelper(pointLight2, sphereSize)

  scene.add(pointLightHelper)
  scene.add(pointLightHelper2)
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

import styles from './bg.module.sass'
import{useEffect} from 'react'
import * as THREE from 'three'
import { TorusGeometry } from 'three'
import {pi, abs} from 'mathjs'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

if (typeof window !== 'undefined'){
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(10, window.innerWidth/window.innerHeight, 0.1, 1000)
  camera.position.setZ(20)
  camera.position.setX(10)
  const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'),})
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight) 
  const geometry = new TorusGeometry(3,10,8,6,2*pi)
  const material = new THREE.MeshBasicMaterial({color: 0x00008B,wireframe: true}) 
  const spinnyboy = new THREE.Mesh(geometry, material)
  scene.add(spinnyboy)
  const controls = new OrbitControls( camera, renderer.domElement )
  controls.enableZoom = false
  controls.enablePan = false
  controls.rotateSpeed = 0.05
  let x = 1
  let y = 1
  let z = 1
  let mult = 1
  const animate = () => {
    requestAnimationFrame( animate )
    spinnyboy.rotation.x += 0.0005*x*mult/2
    spinnyboy.rotation.y += 0.0005*y*mult/2
    spinnyboy.rotation.z += 0.0005*x*y*mult/4
    renderer.setSize(window.innerWidth, window.innerHeight)
    controls.update()
    renderer.render(scene, camera)
  }
  var wait = false
  const timesPerSecond = 5
  function rotati(e){
    x = (e.clientX - (renderer.domElement.width/2))
    y = (e.clientY - (renderer.domElement.height/2))
    mult = abs(x)>400 || abs(y)>400 ? 1:2
    mult = abs(x)>300 && abs(y)>300 ? mult:4
    x = x>0 ? 1:-1
    y = y>0 ? 1:-1
  }
  window.addEventListener('mousemove', (e) => {
    if (!wait) {
      rotati(e);
      wait = true;
      setTimeout(function () {wait = false;}, 1000 / timesPerSecond);
    } 
  })
}

export default function BG() {
  useEffect(() => {
    animate()
  }, [])
  
  if (typeof window !== 'undefined'){
    //ubu
  }

  return (<>
    <canvas id="bg" className={styles.bg}></canvas>
  </>)
}

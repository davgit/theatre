import setupScene from './setupScene'
import * as THREE from 'three'
import state from './data.json'

import {TypeOfTheatre} from '$src/tl/entries/index'

declare var Theatre: TypeOfTheatre

const {sphere, sphereGroup} = setupScene()

const project = new Theatre.Project('The ORB', {state})

window.p = project

project.adapters.add(2, {
  accepts(obj) {
    return obj instanceof THREE.Object3D
  },
  getType(obj: THREE.Object3D) {
    return {
      props: {
        positionX: {
          type: 'number',
        },
        positionY: {
          type: 'number',
        },
        positionZ: {
          type: 'number',
        },
        squish: {
          type: 'number'
        }
        // scaleX: {
        //   type: 'number',
        // },
        // scaleY: {
        //   type: 'number',
        // },
        // scaleZ: {
        //   type: 'number',
        // },
      },
    }
  },
  start(object, nativeObject: THREE.Object3D) {
    const stop = object.onValuesChange((values) => {
      nativeObject.position.x = values.positionX
      nativeObject.position.y = values.positionY - 84
      nativeObject.position.z = values.positionZ
      nativeObject.scale.x = 1 - values.squish
      nativeObject.scale.y = 1 + values.squish
      nativeObject.scale.z = 1 - values.squish
      // nativeObject.ax
    })

    return stop
  },
})

const timeline = project.getTimeline('Bouncing orb')
// timeline.createObject('Ball', null)
timeline.createObject('Ball', sphereGroup)
// sphereGroup.position.z = 852
// sphere.position.y = -
// timeline.time = 2000

project.ready.then(async () => {
  timeline.play({
    iterationCount: 1000,
    // range: {from: 200, to: 1300}
  })
  // timeline.gotoTime(1000)
})

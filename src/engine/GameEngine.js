const initializationSystems = []
const updateSystems = []
const drawSystems = []
const entities = []

let lastTimestamp = 0
let loopHandle = 0
  
const init = () => {
  initializationSystems.forEach(system => system.init())
}

const update = (elapsed) => updateSystems.forEach(system => system.update(elapsed, entities))

const draw = (elapsed) => drawSystems.forEach(system => system.draw(elapsed, entities))

const scheduleLoop = () => loopHandle = window.requestAnimationFrame(loop)

const loop = (timestamp) => {
  const elapsed = timestamp - lastTimestamp
  lastTimestamp = timestamp

  update(elapsed)
  draw(elapsed)

  scheduleLoop()
}

const gameEngine = {
  use(system) {
    if (system.init) {
      initializationSystems.push(system)
    }

    if (system.update) {
      updateSystems.push(system)
    }

    if (system.draw) {
      drawSystems.push(system)
    }
  },

  registerEntity(entity) {
    entities.push(entity)
  },

  start() {
    init()
    scheduleLoop()
  },

  stop() {
    window.cancelAnimationFrame(loopHandle)
  }
}

export default gameEngine
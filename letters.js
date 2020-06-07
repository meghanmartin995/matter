const {Engine, Render, World, Bodies, Composites, MouseConstraint} = Matter

Matter.use("matter-wrap")

const w = window.innerWidth
const h = window.innerHeight
const dpi = window.devicePixelRatio
const section = document.querySelector('section.matter')

const engine = Engine.create()

const renderer = Render.create({
  element: section,
  engine: engine,
  options: {
    width: w,
    height: h,
    pixelRatio: dpi,
    background: '#FFECD6',
    wireframes: false
  }
})


const createShape = function (x, y) {
  const randomNum = Math.random()

  if (randomNum > 0.75) {
    return Bodies.circle(x, y, 30, {
      render: {
        sprite: {
          texture: "banana.png",
          xScale: 1,
          yScale: 1
        }
      }
    })
  }
    else if (randomNum > 0.6) {
        return Bodies.circle(x, y, 30, {
      render: {
        sprite: {
          texture: "apricot.png",
          xScale: 1,
          yScale: 1
        }
      }
    })
  }
  else if (randomNum > 0.45) {
        return Bodies.circle(x, y, 30, {
      render: {
        sprite: {
          texture: "mango.png",
          xScale: 1,
          yScale: 1
        }
      }
    })
  }
  else if (randomNum > 0.3) {
        return Bodies.circle(x, y, 30, {
      render: {
        sprite: {
          texture: "cherry.png",
          xScale: 1,
          yScale: 1
        }
      }
    })
  }
  else if (randomNum > 0.2) {
        return Bodies.circle(x, y, 30, {
      render: {
        sprite: {
          texture: "lemon.png",
          xScale: 1,
          yScale: 1
        }
      }
    })
  }
  else if (randomNum > 0.1) {
        return Bodies.circle(x, y, 30, {
      render: {
        sprite: {
          texture: "orange.png",
          xScale: 1,
          yScale: 1
        }
      }
    })
  }
  else {
    return Bodies.circle(x, y, 20, {
      render: {
        sprite: {
          texture: "strawberry.png",
          xScale: 1,
          yScale: 1
        }
      }
    })
  }
}

const wallOptions = {
  isStatic: true,
  render: {
    visible: false
  }
}

const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 100, wallOptions)
const leftWall = Bodies.rectangle(-50, h / 2, 100, h + 100, wallOptions)
const rightWall = Bodies.rectangle(w + 50, h / 2, 100, h + 100, wallOptions)
const ceiling = Bodies.rectangle(w / 2, -50, w + 100, 100, wallOptions)

const shapes = Composites.stack(50, 50, 10, 10, 40, 40, function (x, y) {
  return createShape(x, y)
})

const circle = Bodies.circle(w / 2, h / 2, Math.min(w / 4.5, h / 4.5), {
  isStatic: true,
  render: {
    fillStyle: '#F6B67B',
    strokeStyle: 'transparent'
  }
})




const mouse = MouseConstraint.create(engine, {
  element: section,
  constraint: {
    render: {
      visible: false
    }
   }
 })

World.add(engine.world, [
  mouse,
  shapes,
  circle,
  ground,
  ceiling,
  leftWall,
  rightWall
])

Engine.run(engine)

Render.run(renderer)


document.addEventListener("click", function (event) {
  const shape = createShape(event.pageX, event.pageY)
  World.add(engine.world, shape)
})

document.addEventListener("touchstart", function (event) {
  const shape = createShape(event.pageX, event.pageY)
  World.add(engine.world, shape)
})

window.addEventListener('deviceorientation', function (event) {
  engine.world.gravity = {
    x: (event.gamma / 50),
    y: (event.beta / 25)
  }

  Engine.update(engine)
})

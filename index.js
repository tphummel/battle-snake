function move (reqBody) {
  const { board, you } = reqBody

  const shout = 'shout'
  let move

  const prev = you.body[1]

  const movingNorth = prev.y === you.head.y - 1
  const movingSouth = prev.y === you.head.y + 1
  const movingEast = prev.x === you.head.x - 1
  const movingWest = prev.x === you.head.x + 1

  const atNorthWall = you.head.y + 1 === board.height
  const atWestWall = you.head.x === 0
  const atEastWall = you.head.x + 1 === board.width
  const atSouthWall = you.head.y === 0
  const atNorthWestCorner = atNorthWall && atWestWall
  const atSouthWestCorner = atSouthWall && atWestWall
  const atSouthEastCorner = atSouthWall && atEastWall
  const atNorthEastCorner = atNorthWall && atEastWall

  if (atNorthWestCorner) {
    if (movingNorth) {
      move = 'right'
    } else if (movingWest) {
      move = 'down'
    }
  } else if (atSouthWestCorner) {
    if (movingSouth) {
      move = 'right'
    } else if (movingWest) {
      move = 'up'
    }
  } else if (atSouthEastCorner) {
    if (movingSouth) {
      move = 'left'
    } else if (movingEast) {
      move = 'up'
    }
  } else if (atNorthEastCorner) {
    if (movingNorth) {
      move = 'left'
    } else if (movingEast) {
      move = 'down'
    }
  } else if (atNorthWall) {
    if (movingWest) {
      move = 'left'
    } else if (movingEast) {
      move = 'right'
    } else if (movingNorth) {
      move = 'left'
    }
  } else if (atWestWall) {
    if (movingNorth) {
      move = 'up'
    } else if (movingSouth) {
      move = 'down'
    } else if (movingWest) {
      move = 'up'
    }
  } else if (atSouthWall) {
    if (movingWest) {
      move = 'left'
    } else if (movingEast) {
      move = 'right'
    } else if (movingSouth) {
      move = 'right'
    }
  } else if (atEastWall) {
    if (movingSouth) {
      move = 'down'
    } else if (movingNorth) {
      move = 'up'
    } else if (movingEast) {
      move = 'up'
    }
  } else {
    move = 'up'
  }

  return { move, shout }
}

const isCloudFlareWorker = typeof addEventListener !== 'undefined' && addEventListener // eslint-disable-line

if (isCloudFlareWorker) {
  addEventListener('fetch', event => { // eslint-disable-line
    const resp = handleRequest(event.request)
    // const respBody = JSON.parse(resp.body)

    const { pathname } = new URL(event.request.url)

    const someEvent = {
      type: 'page-load',
      req_method: event.request.method,
      req_pathname: pathname,
      res_status: resp.status,
      // res_move: respBody?.move
    }

    event.waitUntil(postLog(someEvent))
    event.respondWith(resp)
  })

  async function handleRequest (request) {
    const { pathname } = new URL(request.url)

    if (request.method === 'GET') {
      console.log('GET /')
      console.log(new Map(request.headers))

      const body = {
        apiversion: '1',
        author: 'tphummel',
        color: '#888888',
        head: 'viper',
        tail: 'rattle',
        version: '2021-07-07'
      }

      return new Response(JSON.stringify(body), { // eslint-disable-line
        status: 200,
        headers: {
          'content-type': 'application/json;charset=UTF-8'
        }
      })
    }

    if (request.method !== 'POST') {
      return new Response('Not Found', { status: 404 }) // eslint-disable-line
    }

    if (pathname.startsWith('/start')) {
      console.log('POST /start')
      console.log(new Map(request.headers))

      // const reqBody = await request.text()

      // no response required
      return new Response('OK', { status: 200 }) // eslint-disable-line

    } else if (pathname.startsWith('/move')) {
      console.log('POST /move')
      console.log(new Map(request.headers))

      const reqBodyTxt = await request.text()
      const reqBody = JSON.parse(reqBodyTxt)

      const resBody = move(reqBody)

      return new Response(JSON.stringify(resBody), { // eslint-disable-line
        status: 200,
        headers: {
          'content-type': 'application/json;charset=UTF-8'
        }
      })
    } else if (pathname.startsWith('/end')) {
      console.log('POST /end')
      console.log(new Map(request.headers))

      // no response required
      return new Response('OK', { status: 200 }) // eslint-disable-line
    } else {
      return new Response('Not Found', { status: 404 }) // eslint-disable-line
    }
  }

  function postLog (data) {
    console.log('sending event to honeycomb')
    return fetch('https://api.honeycomb.io/1/events/' + encodeURIComponent(HONEYCOMB_DATASET), { // eslint-disable-line
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers([['X-Honeycomb-Team', HONEYCOMB_KEY]]) // eslint-disable-line
    })
  }
} else {
  module.exports = { move }
}

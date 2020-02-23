const p = require('react-puddles')

const Home = () =>
  p('div', null,
    p('header', null,
      p('h1', null, 'Video tutorials')
    ),

    p('main', null,
      p('button', {
        on: { click: recordView }
      }, 'Record view')
    )
  )

const recordView = () =>
  fetch('/api/recordView', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ videoId: '123' })
  })

module.exports = Home

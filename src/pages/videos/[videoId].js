import p from 'react-puddles'
import { pick } from 'tinyfunk'

const Video = ({ query: { videoId } }) =>
  p('div', null,
    p('header', null,
      p('h1', null, `Watch video ${videoId}`)
    ),

    p('main', null,
      p('button', {
        on: { click: [ recordView, videoId ] }
      }, 'Record view')
    )
  )

const recordView = videoId =>
  fetch('/api/recordView', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ videoId })
  })

Video.getInitialProps =
  pick(['query'])

export default Video

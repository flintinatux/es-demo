import axios from 'axios'
import p from 'react-puddles'
import { pipeP, prop } from 'tinyfunk'

import resolveUri from '../lib/resolveUri'

const Home = ({ videosWatched }) =>
  p('div', null,
    p('header', null,
      p('h1', null, 'Home')
    ),

    p('main', null,
      p('p', null, `Total views: ${videosWatched}`)
    )
  )

Home.getInitialProps =
  pipeP(
    resolveUri('/api/pages/home'),
    axios,
    prop('data')
  )

export default Home

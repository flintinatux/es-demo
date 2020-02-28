import axios from 'axios'
import Link from 'next/link'
import p from 'react-puddles'
import { pipeP, prop } from 'tinyfunk'

import resolveUri from '../lib/resolveUri'

const Home = ({ videosWatched }) =>
  p('div', null,
    p('header', null,
      p('h1', null, 'Home')
    ),

    p('main', null,
      p('p', null, `Total views: ${videosWatched}`),
      p('p', null,
        p(Link, { href: '/videos/[videoId]', as: '/videos/1234' },
          p('a', null, 'Click to watch video 1234')
        )
      ),
      p('p', null,
        p(Link, { href: '/register' },
          p('a', null, 'Register')
        ),
        ' ',
        p(Link, { href: '/login' },
          p('a', null, 'Login')
        )
      )
    )
  )

Home.getInitialProps =
  pipeP(
    resolveUri('/api/pages/home'),
    axios,
    prop('data')
  )

export default Home

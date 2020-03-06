import axios from 'axios'
import { compose, either, path, prop } from 'tinyfunk'
import p from 'react-puddles'
import tinygen from 'tinygen'
import { useCallback, useState } from 'react'

import { targetVal } from '../lib/events'

const SignupFom = ({ userId }) => {
  const [ email, setEmail ] = useState('')
  const [ error, setError ] = useState('')
  const [ password, setPassword ] = useState('')

  const submit = useCallback(event => {
    event.preventDefault()
    setError('')
    signup(setError, { email, password, userId })
  }, [ email, password, userId ])

  return p('div', null,
    p('header', null,
      p('h1', null, 'Signup New User')
    ),

    p('main', null,
      p('form', { on: { submit } },
        p('input', {
          name: 'email',
          onChange: compose(setEmail, targetVal),
          placeholder: 'email',
          required: true,
          type: 'email',
          value: email
        }),
        ' ',
        p('input', {
          name: 'password',
          onChange: compose(setPassword, targetVal),
          placeholder: 'password',
          required: true,
          type: 'password' ,
          value: password
        }),
        ' ',
        p('button', { type: 'submit' }, 'Submit')
      ),
      p('p', { style: { color: 'red' } }, error)
    )
  )
}

const signup = (setError, data) =>
  axios({
    method: 'POST',
    url: '/api/signup',
    data
  }).catch(err =>
    setError(either(
      path(['response', 'data', 'details', '0', 'message']),
      compose(JSON.stringify, path(['response', 'data', 'errors']))
    )(err))
  )

SignupFom.getInitialProps = () =>
  ({ userId: tinygen() })

export default SignupFom

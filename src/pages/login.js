import axios from 'axios'
import { compose } from 'tinyfunk'
import p from 'react-puddles'
import { useCallback, useState } from 'react'

import { targetVal } from '../lib/events'

const Login = () => {
  const [ email, setEmail ] = useState('')
  const [ error, setError ] = useState('')
  const [ password, setPassword ] = useState('')

  const submit = useCallback(event => {
    event.preventDefault()
    setError('')
    loginUser(setError, { email, password })
  }, [ email, password ])

  return p('div', null,
    p('header', null,
      p('h1', null, 'Login')
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

const loginUser = (setError, data) =>
  axios({
    method: 'POST',
    url: '/api/login',
    data
  }).catch(() =>
    setError('Oops!  An error occured logging you in.  Please try again later.')
  )

export default Login

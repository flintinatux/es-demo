import axios from 'axios'
import { compose } from 'tinyfunk'
import p from 'react-puddles'
import tinygen from 'tinygen'
import { useCallback, useState } from 'react'

import { targetVal } from '../lib/events'

const Register = ({ userId }) => {
  const [ email, setEmail ] = useState('')
  const [ error, setError ] = useState('')
  const [ password, setPassword ] = useState('')

  const submit = useCallback(event => {
    event.preventDefault()
    setError('')
    registerUser(setError, { email, password, userId })
  }, [ email, password, userId ])

  return p('div', null,
    p('header', null,
      p('h1', null, 'Register New User')
    ),

    p('main', null,
      p('form', { on: { submit } },
        p('input', {
          name: 'email',
          onChange: compose(setEmail, targetVal),
          placeholder: 'email',
          type: 'email',
          value: email
        }),
        ' ',
        p('input', {
          name: 'password',
          onChange: compose(setPassword, targetVal),
          placeholder: 'password',
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

const registerUser = (setError, data) =>
  axios({
    method: 'POST',
    url: '/api/register',
    data
  }).catch(err =>
    setError(err.response.data.details[0].message)
  )

Register.getInitialProps = () =>
  ({ userId: tinygen() })

export default Register

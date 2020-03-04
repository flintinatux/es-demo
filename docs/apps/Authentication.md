# Authentication

> Tracks events related to logging in and out.

## Commands

None yet.

## Events

Stream name: `authentication-${userId}`

### UserLoggedIn

Tracks a successful login.

```json
{
  "type": "UserLoggedIn",
  "metadata": {
    "userId": "dl16jZ5ZvrD5vRdn"
  },
  "data": {
    "userId": "dl16jZ5ZvrD5vRdn"
  }
}
```

### UserLoginFailed

Tracks a failed login.

```json
{
  "type": "UserLoginFailed",
  "metadata": {
    "userId": "dl16jZ5ZvrD5vRdn"
  },
  "data": {
    "reason": "Incorrect password",
    "userId": "dl16jZ5ZvrD5vRdn"
  }
}
```

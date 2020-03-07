# UserLogin

> Tracks events related to logging in and out.

## Endpoints

| Method | Path | Description |
| - | - | - |
| `GET` | `/login` | Renders the login form |
| `POST` | `/api/login` | Accepts credentials and sets JWT cookie |

## Commands

None yet.

## Events

Stream name: `userLogin-${userId}`

### LoggedIn

Tracks a successful login.

```json
{
  "streamName": "userLogin-dl16jZ5ZvrD5vRdn",
  "type": "LoggedIn",
  "data": {
    "userId": "dl16jZ5ZvrD5vRdn"
  },
  "metadata": {
    "traceId": "aaade035-868e-49e0-885c-e0c2f74f1bbf",
    "userId": "dl16jZ5ZvrD5vRdn"
  }
}
```

### LoginFailed

Tracks a failed login.

```json
{
  "streamName": "userLogin-dl16jZ5ZvrD5vRdn",
  "type": "LoginFailed",
  "data": {
    "reason": "Incorrect password",
    "userId": "dl16jZ5ZvrD5vRdn"
  },
  "metadata": {
    "traceId": "aaade035-868e-49e0-885c-e0c2f74f1bbf",
    "userId": "dl16jZ5ZvrD5vRdn"
  }
}
```

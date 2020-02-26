# identity

> Handles everything related to identifying users.

## Commands

Stream name: `identity:command-${userId}`

### Register

Registers a user for our application.

```json
{
  "type": "Register",
  "meta": {
    "userId": "dl16jZ5ZvrD5vRdn"
  },
  "data": {
    "email": "user@example.com",
    "userId": "dl16jZ5ZvrD5vRdn"
  }
}
```

## Events

Stream name: `identity-${userId}`

### Registered

Denotes that a user has successfully registered.

```json
{
  "type": "Registered",
  "meta": {
    "userId": "dl16jZ5ZvrD5vRdn"
  },
  "data": {
    "email": "user@example.com",
    "userId": "dl16jZ5ZvrD5vRdn"
  }
}
```

### RegistrationFailed

Denotes that a user has failed to register.

```json
{
  "type": "RegistrationFailed",
  "meta": {
    "userId": "dl16jZ5ZvrD5vRdn"
  },
  "data": {
    "email": "user@example.com",
    "reason": "email already in use",
    "userId": "dl16jZ5ZvrD5vRdn"
  }
}
```

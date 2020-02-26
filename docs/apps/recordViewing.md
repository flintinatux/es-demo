# recordViewing

> Tracks when videos are viewed.

## Commands

None yet.

## Events

Stream name: `viewing-${videoId}`

### VideoViewed

Marks a video as having been viewed at a particular time by a user.

```json
{
  "type": "VideoViewed",
  "meta": { },
  "data": {
    "videoId": "orECXbdt6vu6v10R",
    "viewedAt": "2020-02-22T04:40:19.247Z"
  }
}
```

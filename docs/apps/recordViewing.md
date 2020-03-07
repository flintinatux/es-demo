# RecordViewing

> Tracks when videos are viewed.

## Commands

None yet.

## Events

Stream name: `viewing-${videoId}`

### Viewed

Marks a video as having been viewed at a particular time by a user.

```json
{
  "streamName": "viewing-orECXbdt6vu6v10R",
  "type": "VideoViewed",
  "data": {
    "videoId": "orECXbdt6vu6v10R",
    "viewedAt": "2020-02-22T04:40:19.247Z"
  },
  "metadata": {
    "traceId": "aaade035-868e-49e0-885c-e0c2f74f1bbf",
    "userId": "dl16jZ5ZvrD5vRdn"
  }
}
```

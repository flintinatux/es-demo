const versionConflictRegex = /^Wrong.*Stream Version: (\d+)\)/

function VersionConflictError({ actualVersion, expectedVersion, streamName }) {
  Error.captureStackTrace(this, this.constructor)
  this.message = `VersionConflict: stream ${streamName} expected version ${expectedVersion} but was at version ${actualVersion}`
  this.name = 'VersionConflictError'
}

VersionConflictError.prototype = Object.create(Error.prototype)
VersionConflictError.prototype.constructor = VersionConflictError

const versionConflict = ({ expectedVersion, streamName }) => err => {
  const errorMatch = err.message.match(versionConflictRegex)
  if (errorMatch === null) return Promise.reject(err)

  const error = new VersionConflictError({
    actualVersion: Number(errorMatch[1]),
    expectedVersion,
    streamName
  })

  error.stack = err.stack
  return Promise.reject(error)
}

module.exports = versionConflict

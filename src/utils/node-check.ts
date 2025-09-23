const requiredMajorVersion = 20
const currentVersion = process.version
const majorVersion = parseInt(currentVersion.slice(1).split('.')[0], 10)

if (majorVersion < requiredMajorVersion) {
  console.error(
    `✗ Current Node.js version is ${currentVersion}, and ccspec requires ${requiredMajorVersion} or higher!`,
  )
  process.exit(1)
}

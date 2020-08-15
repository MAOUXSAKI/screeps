const mountCreep = require('property/mount.creep')

module.exports = () => {
    if (!global.hasExtension) {
        global.hasExtension = true
        mountCreep()
    }
}
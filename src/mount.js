const mountCreep = require('src/property/creep')
const mountRoom = require('src/property/room')

module.exports = () => {
    if (!global.hasExtension) {
        global.hasExtension = true
        mountCreep()
        mountRoom()
    }
}
const mount = require('mount')
const spawn = require('spawn')
const tower = require('tower')
const stateScanner = require('stats')

module.exports.loop = function () {

    stateScanner()

    for (let roomName in Game.spawns){
        let room = Game.spawns[roomName].room
        if (room.find(FIND_CONSTRUCTION_SITES).length > 0) {
            Game.spawns[roomName].memory.builder1 = 1
        }else {
            Game.spawns[roomName].memory.builder1 = 0
        }
    }

    tower()

    mount()
    for (let name in Memory.creeps) {
        let creep = Game.creeps[name];
        if (!creep) {
            delete Memory.creeps[name]
            continue
        }
        creep.work()
    }

    spawn()
}
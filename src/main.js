const mount = require('src/mount')
const spawn = require('src/spawn')
const tower = require('src/tower')
const stateScanner = require('src/stats')
const configCreeps = require('src/config/creep')
const sync = require('sync')

module.exports.loop = function () {

    stateScanner()
    mount()
    sync()

    for (let roomName in Game.spawns){
        let room = Game.spawns[roomName].room
        if (room.find(FIND_CONSTRUCTION_SITES).length > 0) {
            Game.spawns[roomName].memory.builder1 = 1
        }else {
            Game.spawns[roomName].memory.builder1 = 0
        }
    }

    tower()
    creepsWork()

    spawn()
}

function creepsWork() {
    for (let name in Memory.creeps) {
        let creep = Game.creeps[name]
        if (!creep) {
            let creepMemory = Memory.creeps[name]
            let role = creepMemory.role
            let configCreep = configCreeps[role]
            let room = Game.rooms[configCreep.roomName]
            if (!configCreep.checked){
                let roleDetail = room.memory.roleDetails[role]
                room.pushRoomSpawnTask(role)
            }
            delete Memory.creeps[name]
            continue
        }
        creep.work()
    }
}
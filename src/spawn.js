const configCreeps = require('src/config/creep')

module.exports = () => {

    for (let role in configCreeps) {

        let configCreep = configCreeps[role]

        let room = Game.rooms[configCreep.roomName]

        let roleDetail = room.memory.roleDetails[role]
        let createNumber = roleDetail.allNumber - (roleDetail.liveNumber + roleDetail.waitNumber)

        if (createNumber > 0){
            for (let count = 0;count < createNumber;count++){
                room.pushRoomSpawnTask(role,true)
            }
        }
    }

    for (let roomName in Game.rooms) {
        let room = Game.rooms[roomName]
        room.createCreep()
    }
}
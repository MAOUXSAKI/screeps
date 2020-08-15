const configCreeps = require('src/config/creep')

module.exports = ()=>{

    for (let role in configCreeps) {
        let configCreep = configCreeps[role]
        let room = Game.rooms[configCreep.roomName]
        let roleDetail = room.memory[role].roleDetail
        let allNumber
        if (roleDetail) {
            allNumber = roleDetail.allNumber
        }
        if (allNumber === undefined){
            allNumber = configCreep.number
        }
        room.memory[role].roleDetail = initRoleDetail(allNumber)

    }

    for (let creepName in Game.creeps) {
        let creepMemory = Memory.creeps[creepName]
        let room = Game.rooms[creepMemory.roomName]
        let roleDetail = room.memory[creepMemory.role].roleDetail

        if (!creepMemory.checked){
            creepMemory.checked = false
            roleDetail.liveNumber = roleDetail + 1
        }

        let taskList = room.taskList
        if (!taskList){
            taskList = []
            room.taskList = taskList
        }
        roleDetail.waitNumber = taskList.length
    }
}

function initRoleDetail(allNumber) {
    return{
        liveNumber:0,
        waitNumber:0,
        allNumber: allNumber
    }
}
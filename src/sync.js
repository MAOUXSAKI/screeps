const configCreeps = require('src/config/creep')

module.exports = ()=>{

    if (!global.initSync || Game.time % 60 ===0) {
        for (let roomName in Game.rooms){
            let room = Game.rooms[roomName]
            if (!room.memory.roleDetails){
                room.memory.roleDetails = {}
            }
        }

        for (let role in configCreeps) {
            let configCreep = configCreeps[role]
            let room = Game.rooms[configCreep.roomName]
            let roleDetail = room.memory.roleDetails[role]
            let allNumber = configCreep.number
            if (allNumber === undefined) {
                allNumber = roleDetail.allNumber
            }
            room.memory.roleDetails[role] = initRoleDetail(allNumber)

            let taskList = room.memory.taskList
            if (!taskList){
                taskList = []
                room.memory.taskList = taskList
            }
            room.memory.roleDetails[role].waitNumber = taskList.filter(taskRoleName => {
                return role === taskRoleName
            }).length
        }


        for (let creepName in Memory.creeps) {
            let creepMemory = Memory.creeps[creepName]
            let creepConfig = configCreeps[creepMemory.role]
            let room = Game.rooms[creepConfig.roomName]
            let roleDetail = room.memory.roleDetails[creepMemory.role]

            if (!creepMemory.checked){
                creepMemory.checked = false
                roleDetail.liveNumber++
            }
        }

        global.initSync = true
    }



}

function initRoleDetail(allNumber) {
    return{
        liveNumber:0,
        waitNumber:0,
        allNumber: allNumber
    }
}
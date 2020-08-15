const configCreeps = require('config.creep')

module.exports = () => {

    for (let role in configCreeps) {

        let configCreep = configCreeps[role]

        let count = _.filter(Memory.creeps, ((value, key) => {
            return value.role === role
        })).length

        let number = 0
        if (configCreep.number !== undefined){
            number = configCreep.number
        }else {
            number = Game.spawns[configCreep.roomName].memory[role]
        }

        if (number === undefined){
            number = 0
        }


        if (number > count) {
            let creepNo = 0
            while (Game.spawns[configCreep.roomName].spawnCreep(configCreep.structure, `${role}_${creepNo}`, {memory: {role: role}}) === -3){
                creepNo = creepNo + 1
            }
            return
        }
    }
}
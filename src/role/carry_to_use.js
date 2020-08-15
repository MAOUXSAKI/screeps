const data = require('src/config.data')
module.exports = () => ({
    status1: creep => {
        let container

        container = creep.getSourceHasEnergy()
        if (container) {
            creep.memory.energySourceId = container.id
            if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        }

    },
    status2: creep => {
        let target
        let energyStoreList = data[creep.room.name].energyStoreList
        let energySourceList = data[creep.room.name].energySourceList
        let exceptList = energyStoreList.concat(energySourceList)
        let spawnTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: object => {
                if ((object.structureType === STRUCTURE_EXTENSION || object.structureType === STRUCTURE_SPAWN)
                    && object.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    return true
                }
            }
        })
        if (spawnTarget){
            target = spawnTarget
        }else {
            if (creep.memory.target) {
                target = Game.getObjectById(creep.memory.target)
                if (!target){
                    creep.memory.target = null
                }else if (target.store.getFreeCapacity(RESOURCE_ENERGY) <= 0 ){
                    creep.memory.target = null
                }
            }

            if (!creep.memory.target){
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: object => {
                        if (object.structureType === STRUCTURE_CONTAINER) {
                            if (exceptList.indexOf(object.id) === -1 && object.store.getFreeCapacity(RESOURCE_ENERGY) > object.store.getCapacity(RESOURCE_ENERGY) / 4) {
                                return true
                            }
                        }

                        if (object.structureType === STRUCTURE_TOWER && object.store.getFreeCapacity(RESOURCE_ENERGY) > object.store.getCapacity(RESOURCE_ENERGY) / 4) {
                            return true
                        }
                    }
                })
            }
        }

        if (target) {
            creep.memory.target = target.id
            if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            creep.break()
        }
    },
    switch: creep => {
        creep.updateStatus()
        if (!creep.memory.working) {
            return 'status1'
        } else {
            return 'status2'
        }
    }
})
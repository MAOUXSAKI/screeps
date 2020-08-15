const data = require('src/config.data')
module.exports = () => ({
    status1: creep => {
        let container

        if (creep.memory.energySourceId) {
            container = Game.getObjectById(creep.memory.energySourceId)
            if (container.store.getUsedCapacity(RESOURCE_ENERGY) <= 0) {
                creep.memory.energySourceId = null
            }
        }

        if (!creep.memory.energySourceId) {
            let energySourceList = data[creep.room.name].energySourceList
            let energySourceId = _.max(energySourceList,id =>{
                let energySource = Game.getObjectById(id)
                if(energySource.structureType !== STRUCTURE_CONTAINER){
                    return 0
                }
                return energySource.store.getUsedCapacity()
            })
            container = Game.getObjectById(energySourceId)
        }
        if (container) {
            creep.memory.energySourceId = container.id
            if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        }

    },
    status2: creep => {
        let source
        if (creep.memory.source) {
            source = Game.getObjectById(creep.memory.source)
            if (source.store.getFreeCapacity(RESOURCE_ENERGY) <= 0) {
                creep.memory.source = null
            }
        }
        if (!creep.memory.source) {
            source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: object => {
                    let store = object.store
                    if ((object.structureType === STRUCTURE_EXTENSION || object.structureType === STRUCTURE_SPAWN || (object.id === '27e4e67df58eff8' && store.getFreeCapacity(RESOURCE_ENERGY) > store.getCapacity()/4*1))
                        && object.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                        return true
                    }
                }
            })
        }

        if (source) {
            creep.memory.source = source.id
            if (creep.transfer(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
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
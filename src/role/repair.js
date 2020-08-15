module.exports = (sourceId, roomName) => ({
    status1: creep => {
        let structure
        if (creep.memory.repair){
            structure = Game.getObjectById(creep.memory.repair)
            if (structure.hits === structure.hitsMax) {
                creep.memory.repair = null
            }
        }
        if (!creep.memory.repair) {
            structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: object => {
                    if (object.hits < (object.hitsMax /4 * 3)) {
                        return true
                    }
                }
            })
        }

        if (structure) {
            creep.memory.repair = structure.id
            if(creep.repair(structure) === ERR_NOT_IN_RANGE) {
                creep.moveTo(structure);
            }
        }else {
            creep.break()
        }

    },
    status2: creep => {
        let container
        if (creep.memory.target) {
            container = Game.getObjectById(creep.memory.target)
            if (container.store.getUsedCapacity(RESOURCE_ENERGY) < creep.store.getCapacity(RESOURCE_ENERGY)) {
                creep.memory.target = null
            }
        }

        if (!creep.memory.target) {
            container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: object => {
                    if ((object.structureType === STRUCTURE_CONTAINER) && object.store.getUsedCapacity(RESOURCE_ENERGY) >= creep.store.getCapacity(RESOURCE_ENERGY)) {
                        return true
                    }
                }
            })
        }
        if (container){
            if(creep.withdraw(container,RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        }else {
            let source = Game.getObjectById(sourceId)
            if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }

    },
    switch: creep => {
        creep.updateStatus()
        if (creep.memory.working) {
            return 'status1'
        } else {
            return 'status2'
        }
    }
})
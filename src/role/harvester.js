module.exports = (sourceId, roomName) => ({
    status1: creep => {
        let source = Game.getObjectById(sourceId)
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    },
    status2: creep => {
        let container
        if (creep.memory.target) {
            container = Game.getObjectById(creep.memory.target)
            if (container.store.getFreeCapacity(RESOURCE_ENERGY) <= 0) {
                creep.memory.target = null
            }
        }
        if (!creep.memory.target) {
            container = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: object => {
                    if ((object.structureType === STRUCTURE_EXTENSION || object.structureType === STRUCTURE_SPAWN) && object.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                        return true
                    }
                }
            })
        }

        if (container) {
            creep.memory.target = container.id
            if (creep.transfer(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        }

    },
    switch: creep => {
        creep.updateStatus()
        //没能量时，也就是working 为false 时开始采矿，否则搬运
        if (!creep.memory.working) {
            return 'status1'
        } else {
            return 'status2'
        }
    }
})
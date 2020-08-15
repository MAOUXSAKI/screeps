module.exports = (sourceId, roomName) => ({
    status1: creep => {
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    },
    status2: creep => {
        // let energySource = creep.getSourceHasEnergy()
        // if (energySource) {
        //     if (creep.withdraw(energySource,RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        //         creep.moveTo(energySource)
        //     }
        // } else {
        //     let source = Game.getObjectById(sourceId)
        //     if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        //         creep.moveTo(source);
        //     }
        // }
        let source = Game.getObjectById(sourceId)
        if (creep.withdraw(source,RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
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
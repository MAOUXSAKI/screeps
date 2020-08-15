module.exports = (sourceId, roomName) => ({
    status1: creep => {
        let constructionSite = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES)
        if (constructionSite != null){
            if(creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
                creep.moveTo(constructionSite);
            }
        }else {
            creep.break()
        }
    },
    status2: creep => {
        let container
        container = creep.getSourceHasEnergy()
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
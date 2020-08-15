module.exports = (sourceId, roomName,containerId) => ({
    status1: creep => {
        let source = Game.getObjectById(sourceId)
        let container = Game.getObjectById(containerId)
        if (creep.pos.x !== container.pos.x || creep.pos.y !== container.pos.y || creep.roomName !== container.roomName){
            creep.moveTo(container);
        }else {
            creep.harvest(source)
        }
    },
    status2: creep => {
    },
    switch: creep => {
        return 'status1'
    }
})
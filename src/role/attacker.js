module.exports = (targetRoomName,x=0,y=0) => ({
    status1: creep => {
        // let targetRoomPosition = RoomPosition(x,y,targetRoomName)
        if (creep.room.name !== targetRoomName){
            let exitDir = creep.room.findExitTo(targetRoomName)
            let exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit)
            return
        }

        let enemy = creep.pos.findClosestByPath(FIND_HOSTILE_SPAWNS)

        if (!enemy){
            enemy = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS)
        }

        if (!enemy){
            enemy = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES)
        }

        if (!enemy){
            return;
        }

        if (creep.attack(enemy) === ERR_NOT_IN_RANGE) {
            creep.moveTo(enemy)
        }

    },
    status2: creep => {

    },
    switch: creep => {
        return 'status1'
    }
})
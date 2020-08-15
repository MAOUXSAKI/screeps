module.exports = () => {

    let spawns = Game.spawns

    for (let spawnName in spawns) {
        let spawn = spawns[spawnName]
        let enemy = spawn.pos.findClosestByPath(FIND_HOSTILE_CREEPS)
        let towerList = spawn.room.find(FIND_MY_STRUCTURES, {
            filter: object => {
                return object.structureType === STRUCTURE_TOWER
            }
        })
        if (enemy) {
            for (let tower of towerList) {
                tower.attack(enemy)
            }
            return
        }

        let structure
        if (spawn.memory.repair){
            structure = Game.getObjectById(spawn.memory.repair)
            if (structure.hits === structure.hitsMax) {
                spawn.memory.repair = null
            }
        }
        if (!spawn.memory.repair) {
            structure = spawn.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: object => {
                    if (object.hits < (object.hitsMax /4 * 3)) {
                        return true
                    }
                }
            })
        }

        if (structure) {
            spawn.memory.repair = structure.id
            for (let tower of towerList) {
                tower.repair(structure)
            }
        }
    }

}
const configCreeps = require('src/config/creep')

module.exports = () => {
    Room.prototype.pushRoomSpawnTask = roomExtension.pushRoomSpawnTask
    Room.prototype.createCreep = roomExtension.createCreep()
}

const roomExtension = {
    pushRoomSpawnTask : (role,newCreeps=false)=>{
        let taskList = this.memory.taskList
        let roleDetail = this.memory[role].roleDetail
        let number = roleDetail.liveNumber + roleDetail.waitNumber
        // 如果已存在的creeps与wait的数量大于本来应该存在的数量则不生成任务
        if (number > roleDetail.allNumber) {
            roleDetail.liveNumber--
            return
        }
        if (!taskList){
            taskList = []
            this.memory.taskList = taskList
        }
        taskList.push(role)
        if (!newCreeps){
            roleDetail.liveNumber--
        }
        roleDetail.waitNumber++
    },

    createCreep(){
        if (this.spawning) {
            return
        }
        let taskList = this.memory.taskList

        if (!taskList){
            return
        }

        let role = _.min(taskList,role =>{
            let configCreep = configCreeps[role]
            let priority = configCreep.priority
            if (priority === undefined) {
                priority = 9
            }
            return priority
        })

        let configCreep = configCreeps[role]

        let freeSpawn = this.find(FIND_MY_SPAWNS,{
            filter: spawn =>{
                return !spawn.spawning
            }
        })

        let creepNo = 0
        let result = -3
        while (result === -3) {
            result = freeSpawn.spawnCreep(configCreep.structure, `${role}_${creepNo}`, {dryRun: true})
            creepNo++
        }
        if (result === 0){
            let memory = {
                role: role,
                checked: false
            }
            freeSpawn.spawnCreep(configCreep.structure, `${role}_${creepNo}`, {memory})
            let roleDetail = this.memory[role].roleDetail
            roleDetail.liveNumber++
            roleDetail.waitNumber--

            let index = taskList.indexOf(role)
            taskList.splice(index,1)
        }


    }
}
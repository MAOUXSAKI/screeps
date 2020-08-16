const configCreeps = require('src/config/creep')
const data = require('src/config/data')

module.exports = () => {
    Creep.prototype.work = function () {
        let configCreep = configCreeps[this.memory.role]
        if (!configCreep) {
            console.log(`${this.name}:${this.memory.role}:not has this role!`)
            return
        }
        let process = configCreep.process
        if (!this.memory.ready) {
            if (process.prepare && process.isReady) {
                process.prepare(this)
                this.memory.ready = process.isReady(this)
                return
            } else {
                this.memory.ready = true
            }
        }
        let workMethod = process.switch(this)
        process[workMethod](this)
    }

    Creep.prototype.break = function (){
        let breakPointList = this.room.find(FIND_FLAGS, {
            filter: object => {
                return object.name === 'break'
            }
        })
        if (breakPointList) {
            this.moveTo(breakPointList[0])
        }
    }

    Creep.prototype.getSourceHasEnergy = function () {
        let energySource
        let energyStoreList = data[this.room.name].energyStoreList
        if (this.memory.energySourceId) {
            energySource = Game.getObjectById(this.memory.energySourceId)
            if (energySource.store.getUsedCapacity(RESOURCE_ENERGY) <= 0) {
                this.memory.energySourceId = null
            }
        }

        if (!this.memory.energySourceId) {
            let energyStoreId = _.max(energyStoreList, id => {
                let energyStore = Game.getObjectById(id)
                return energyStore.store.getUsedCapacity()
            })
            energySource = Game.getObjectById(energyStoreId)
        }

        if (energySource) {
            this.memory.energySourceId = energySource.id
        }
        return energySource
    }

    Creep.prototype.updateStatus = function () {
        //自身能量为0时，working状态切换为false
        let beforeWorking = this.memory.working
        if (this.store[RESOURCE_ENERGY] <= 0 && this.memory.working) {
            this.memory.working = false
        } else if (this.store[RESOURCE_ENERGY] >= this.store.getCapacity() && !this.memory.working) {
            this.memory.working = true
        }
        if (beforeWorking !== this.memory.working) {
            delete this.memory.energySourceId
        }
    }
}

const harvester = require('role/harvester_v2')
const upgrader = require('role/upgrader')
const builder = require('role/builder')
const carrier = require('role/carry_v2')
const repairer = require('role/repair')
const carrier_to_use = require('role/carry_to_use')

module.exports = {
    carrier_to_use1: {
        process: carrier_to_use(),
        roomName: 'Spawn1',
        structure: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
        // structure: [CARRY,CARRY,MOVE],
        number: 1
    },
    harvester1: {
        process: harvester('26f20772347f879', 'Spawn1','74132c1ded1c856'),
        roomName: 'Spawn1',
        structure: [WORK,WORK,WORK,WORK,WORK,MOVE],
        number: 1
    },
    harvester2: {
        process: harvester('71ac0772347ffe6', 'Spawn1','a1e83307f78f2f9'),
        roomName: 'Spawn1',
        structure: [WORK,WORK,WORK,WORK,WORK,MOVE],
        number: 1
    },
    upgrader1: {
        process: upgrader('5e0f378661eb9d3', 'Spawn1'),
        roomName: 'Spawn1',
        structure: [MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY],
        number: 2
    },
    builder1: {
        process: builder('71ac0772347ffe6', 'Spawn1'),
        roomName: 'Spawn1',
        structure: [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
    },
    builder2: {
        process: builder('26f20772347f879', 'Spawn1'),
        roomName: 'Spawn1',
        structure: [WORK,WORK,CARRY,MOVE],
        number: 0
    },
    carry1: {
        process: carrier(),
        roomName: 'Spawn1',
        structure: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
        number: 1
    },
    repairer1: {
        process: repairer('71ac0772347ffe6'),
        roomName: 'Spawn1',
        structure: [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
        number: 0
    }
}
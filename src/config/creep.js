const harvester = require('src/role/harvester_v2')
const upgrader = require('src/role/upgrader')
const builder = require('src/role/builder')
const carrier = require('src/role/carry_v2')
const repairer = require('src/role/repair')
const carrier_to_use = require('src/role/carry_to_use')
const attacker = require('src/role/attacker')

let roomName = "W8N3"

module.exports = {
    
    carrier_to_use1: {
        process: carrier_to_use(),
        roomName: roomName,
        spawnName : 'Spawn1',
        structure: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
        // structure: [CARRY,CARRY,MOVE],
        number: 1
    },
    attacker1: {
        process: attacker('W7N3',1,15),
        roomName: roomName,
        spawnName : 'Spawn1',
        structure: [ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE],
        // structure: [CARRY,CARRY,MOVE],
        number: 0
    },
    harvester1: {
        process: harvester('26f20772347f879', 'Spawn1','74132c1ded1c856'),
        roomName: roomName,
        structure: [WORK,WORK,WORK,WORK,WORK,MOVE],
        number: 1
    },
    harvester2: {
        process: harvester('71ac0772347ffe6', 'Spawn1','a1e83307f78f2f9'),
        roomName: roomName,
        structure: [WORK,WORK,WORK,WORK,WORK,MOVE],
        number: 1
    },
    upgrader1: {
        process: upgrader('5e0f378661eb9d3', 'Spawn1'),
        roomName: roomName,
        structure: [MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY],
        number: 2
    },
    builder1: {
        process: builder('71ac0772347ffe6', 'Spawn1'),
        roomName: roomName,
        structure: [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
    },
    builder2: {
        process: builder('26f20772347f879', 'Spawn1'),
        roomName: roomName,
        structure: [WORK,WORK,CARRY,MOVE],
        number: 0
    },
    carry1: {
        process: carrier(),
        roomName: roomName,
        structure: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
        number: 1
    },
    repairer1: {
        process: repairer('71ac0772347ffe6'),
        roomName: roomName,
        structure: [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
        number: 0
    }
}
// 3.2

// const fs = require('fs')

// // fs.writeFileSync('notes.txt',"I am ranjan suwal")

// fs.appendFileSync('notes.txt', 'I am learning node')


// 3.3
// const getNotes = require("./notes")

// const msg = getNotes()
// console.log(msg)

// 3.4

// const validator = require('validator')
// console.log(validator.isEmail('email@example.com'))

// 3.5

const getchalk = require("chalk");
// console.log(getchalk.blue('Success'));

// 4 FILE SYSTEM AND CMD LINE ARGUMENTS
// 4.1

// const command = process.argv

// console.log(command)


// 4.2 4.3 4.4 4.6 4.7
const yargs = require('yargs')
const { addNote, removeNote, listNotes, readNote } = require('./notes')
yargs.version('1.1.0')


// ADD COMMANDS
yargs.command({
    command: 'add',
    describe: 'add note',
    builder: {
        title: {
            describe: "Add note",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Add note body",
            demandOption: true,
            type: "string"
        },

    },
    handler(argv) {
        addNote(argv)
    }
})

// remove command
yargs.command({
    command: 'remove',
    describe: 'remove note',
    builder: {
        title: {
            describe: "Add note",
            demandOption: true,
            type: "string"
        },
    },
    handler(argv) {
        removeNote(argv.title)
    }
})

// LIST COMMAND
yargs.command({
    command: 'list',
    describe: 'list note',
    handler() {
        listNotes()
    }
})

// read command
yargs.command({
    command: 'read',
    describe: 'read note',
    builder: {
        title: {
            describe: "title",
            demandOption: true,
            type: "string"
        },

    },
    handler(argv) {
        readNote(argv.title)
    }
})

yargs.parse()



//this is for the CLI

const readline = require('readline')
const { createNewAccount, deposit, withdraw, balance, transfer, payFees, payAccommodation, prepaidMeals } = require('./db')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


console.log('Welcome')
console.log('\n 1. Create New Account')
console.log('\n 2. Deposit Money')
console.log('\n 3. Withdraw Money')
console.log('\n 4. Check Balance')
console.log('\n 5. Pay Fees')
console.log('\n 6. Pay Accommodation')
console.log('\n 7. Transfer Money')
console.log('\n 8. Prepaid Meals')
console.log('\n 9. View Results Slip')
console.log('\n 10. Exit')

const ip = (msg) => new Promise((resolve, reject) => {
    rl.question(`\n ${msg}: `, (ch) => {
        resolve(ch)
    })
})


const start = async () => {
    while (true) {
        const choice = await ip('\n Enter your choice')
        if (choice == 1) {
            console.log(`Create New Account`)
            const acId = parseInt(await ip('Enter Account Id'))
            const acNm = await ip('Enter Account Name')
            const balance = 0
            createNewAccount({ acId, acNm, balance })

        } else if (choice == 2) {
            console.log(`\n Deposit Money`)
            const acId = parseInt(await ip('Enter Account Id'))
            const amount = parseFloat(await ip('Enter Amount'))
            deposit({ acId, amount })

        } else if (choice == 3) {
            console.log(`\n Withdraw Money`)
            const acId = parseInt(await ip('Enter Account Id'))
            const amount = parseFloat(await ip('Enter Amount'))
            withdraw({ acId, amount })

        } else if (choice == 4) {
            console.log(`\n Check Balance`)
            const acId = parseInt(await ip('Enter Account Id'))
            balance(acId)

        } else if (choice == 5) {
            console.log(`\n Pay Fees`)
            const acId = parseInt(await ip('Enter Account Id'))
            const amount = parseFloat(await ip('Enter Amount'))
            payFees({ acId, amount })

        } else if (choice == 6) {
            console.log(`\n Pay Accommodation`)
            const acId = parseInt(await ip('Enter Account Id'))
            const amount = parseFloat(await ip('Enter Amount'))
            payAccommodation({ acId, amount })

        } else if (choice == 7) {
            console.log(`\n Transfer Money`)
            const srcId = parseInt(await ip('Enter Source Account Id'))
            const destId = parseInt(await ip('Enter Source Account Id'))
            const amount = parseFloat(await ip('Enter Amount'))
            transfer({ srcId, destId, amount })

        } else if (choice == 8) {
            console.log(`\n Prepaid Meals`)
            const acId = parseInt(await ip('Enter Account Id'))
            const amount = parseFloat(await ip('Enter Amount'))
            prepaidMeals({ acId, amount })

        } else if (choice == 9) {
            console.log(`\n View Results Slip`)

        } else if (choice == 10) {
            console.log(`\n Exiting Application`)
            process.exit()
        } else {
            console.log(`\n Invalid Option`)
            process.exit()
        }
    }
}
start()
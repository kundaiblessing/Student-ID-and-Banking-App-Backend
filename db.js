const { Client } = require('pg')

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'bankdb',
    post: 5432
})

// const  connect = async () => await client.connect()

// connect()
// console.log(`connected successfully`)

client.connect((err, db) => {
    if (err) {
        console.log(`\n Error in Connectivity`)
        return
    }
    console.log(`\n Connected Successfully`)
})

const createNewAccount = ({ acId, acNm, balance }, onCreate = undefined) => {
    client.query(`insert into account values ($1, $2, $3)`, [acId, acNm, balance], (err, res) => {
        if (err) {
            console.log(`\n Problem in Creating New Customer, Contact System Admin`)
        } else {
            console.log(`\n New Account created`)
            if (onCreate) {
                onCreate(`New account created`)
            }
        }
    })
}

const deposit = ({ acId, amount }, onDeposit = undefined) => {
    client.query(`select balance from account where ac_id = $1`, [acId], (err, res) => {
        if (err) {
            console.log(`\n problem with deposit amount`)
        } else {
            const balance = parseFloat(res.rows[0].balance)
            console.log(`\n Your existing balance is ${balance}`)

            const newBalance = balance + amount

            client.query(`update account set balance = $1 where ac_id = $2`, [newBalance, acId], (err, res) => {
                if (err) {
                    console.log(`\n Problem performing deposit`)
                } else {
                    console.log(`\n ${amount} deposit successful`)
                    if (onDeposit) {
                        onDeposit(`${amount} deposit successful`)
                    }
                }
            })
        }

    })
}

const withdraw = ({ acId, amount }, onWithdraw = undefined) => {
    client.query(`select balance from account where ac_id = $1`, [acId], (err, res) => {
        if (err) {
            console.log(`\n Problem withdrawing amount`)
        } else {
            const balance = parseFloat(res.rows[0].balance)
            // console.log(`Your existing balance is ${balance}`)

            const newBalance = balance - amount

            client.query(`update account set balance = $1 where ac_id = $2`, [newBalance, acId], (err, res) => {
                if (err) {
                    console.log(`\n Problem performing withdrawal`)
                } else {
                    console.log(`\n ${amount} withdrawal successful`)
                    if (onWithdraw) {
                        onWithdraw(`${amount} withdrawal successful`)
                    }
                }
            })
        }

    })
}

const balance = (acId, onBalance = undefined) => {
    client.query(`select balance from account where ac_id = $1`, [acId], (err, res) => {
        if (err) {
            console.log(`\n Problem checking balance`)
        } else {
            const balance = parseFloat(res.rows[0].balance)
            console.log(`\n Your existing balance is ${balance}`)
            if (onBalance) {
                onBalance(balance)
            }

        }

    })
}

const payFees = ({ acId, amount }) => {
    client.query(`select balance from account where ac_id = $1`, [acId], (err, res) => {
        if (err) {
            console.log(`\n problem with paying fees`)
        } else {
            const balance = parseFloat(res.rows[0].balance)
            console.log(`\n Your existing balance is ${balance}`)

            const newBalance = balance - amount

            client.query(`update payments set fees = $1 where ac_id = $2`, [newBalance, acId], (err, res) => {
                if (err) {
                    console.log(`\n Problem performing payment`)
                } else {
                    console.log(`\n ${amount} payment successful`)
                }
            })
        }

    })
}

const payAccommodation = ({ acId, amount }) => {
    client.query(`select balance from account where ac_id = $1`, [acId], (err, res) => {
        if (err) {
            console.log(`\n problem with paying fees`)
        } else {
            const balance = parseFloat(res.rows[0].balance)
            console.log(`\n Your existing balance is ${balance}`)

            const newBalance = balance - amount

            client.query(`update payments set fees = $1 where ac_id = $2`, [newBalance, acId], (err, res) => {
                if (err) {
                    console.log(`\n Problem performing payment`)
                } else {
                    console.log(`\n ${amount} payment successful`)
                }
            })
        }

    })
}

const transfer = ({ srcId, destId, amount }) => {
    withdraw({ acId: srcId, amount }, msgWd => {
        deposit({ acId: destId, amount }, msgDp => {
            if (onTransfer) {
                onTransfer(`Amount ${amount} transfer success`)
            }
        })
    })

}

const prepaidMeals = ({ acId, amount }) => {
    client.query(`select balance from account where ac_id = $1`, [acId], (err, res) => {
        if (err) {
            console.log(`\n problem with paying fees`)
        } else {
            const balance = parseFloat(res.rows[0].balance)
            console.log(`\n Your existing balance is ${balance}`)

            const newBalance = balance - amount

            client.query(`update payments set fees = $1 where ac_id = $2`, [newBalance, acId], (err, res) => {
                if (err) {
                    console.log(`\n Problem performing payment`)
                } else {
                    console.log(`\n ${amount} payment successful`)
                }
            })
        }

    })
}

//const results = () => {}

//createNewAccount({acId:1, acNm: `abc`, balance:100})
//withdraw({acId:1, amount:10})
//deposit({acId:1, amount:1000})
//transfer({srcId: 1, destId: 2, amount:6000})
//balance(acId : 1)


module.exports = {
    createNewAccount, deposit, withdraw, transfer, balance, payFees, payAccommodation, prepaidMeals
}
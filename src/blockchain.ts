import { hash, validatedHash } from "./helpers"

export interface Block {
    header: {
        nonce: number
        hashBlock: string
    }
    payload: {
        sequence: number
        timestamp: number
        data: any
        previousHash: string
    }
}

export class Blockchain {
    #chain: Block[] = []
    private powPrefix = '0'

    constructor(private readonly difficulty: number = 4) {
        this.#chain.push(this.createGenesisBlock())
    }

    private createGenesisBlock(): Block {
        const payload: Block['payload'] = {
            sequence: 0,
            timestamp: +new Date(),
            data: 'Initial block',
            previousHash: ''
        }

        return {
            header: {
                nonce: 0,
                hashBlock: hash(JSON.stringify(payload))
            },
            payload
        }
    }

    get chain() {
        return this.#chain
    }

    private get lastBlock(): Block {
        return this.#chain.at(-1) as Block
    }

    private hashLastBlock() {
        return this.lastBlock.header.hashBlock
    }

    createBlock(data: any): Block['payload'] {
        const newBlock: Block['payload'] = {
            sequence: this.lastBlock.payload.sequence + 1,
            timestamp: +new Date(),
            data,
            previousHash: this.hashLastBlock()
        }

        console.log(`Block #${newBlock.sequence} created: ${JSON.stringify(newBlock)}`)

        return newBlock
    }

    mineBlock(block: Block['payload']) {
        let nonce = 0
        const start = +new Date()

        while (true) {
            const hashBlock = hash(JSON.stringify(block))
            const hashPow = hash(hashBlock + nonce)

            if (validatedHash({ hash: hashPow, difficulty: this.difficulty, prefix: this.powPrefix })) {
                const end = +new Date()
                const reducedHash = hashBlock.slice(0, 12)
                const miningTime = (end - start) / 1000

                console.log(`Block #${block.sequence} mined in ${miningTime}s.
                    Hash ${reducedHash} (${nonce} attempts.)
                `)

                return {
                    minedBlock: {
                        payload: { ...block },
                        header: {
                            nonce,
                            hashBlock
                        }
                    }
                }
            }

            nonce++
        }
    }

    checkBlock(block: Block): boolean {
        if (block.payload.previousHash !== this.hashLastBlock()) {
            console.error(`Block #${block.payload.sequence} invalid. The previous hash is ${this.hashLastBlock().slice(0, 12)} and not ${block.payload.previousHash.slice(0, 12)}`)

            return false
        }

        const testHash = hash(hash(JSON.stringify(block.payload)) + block.header.nonce)
        if (!validatedHash({ hash: testHash, difficulty: this.difficulty, prefix: this.powPrefix })) {
            console.error(`Block #${block.payload.sequence} invalid. Nonce ${block.header.nonce} is invalid and could not be verified.`)

            return false
        }

        return true
    }

    sendBlock(block: Block): Block[] {
        if (this.checkBlock(block)) {
            this.#chain.push(block)

            console.log(`Block #${block.payload.sequence} was added to blockchain: ${JSON.stringify(block, null, 2)}`)
        }

        return this.#chain
    }
}
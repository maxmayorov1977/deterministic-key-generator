const bip39 = require('bip39')
const bip32 = require('bip32')
const crypto = require('crypto')
const bitcoin = require('bitcoinjs-lib')

const payments = bitcoin.payments

    crypto.mnemonic = function(){
        var randomBytes = crypto.randomBytes(16)
        var mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'))
        return mnemonic
    }

    crypto.bitcoinWallet = function(phrases, id){
        const seed = bip39.mnemonicToSeed(phrases)
        const root = bip32.fromSeed(seed)
        const { publicKey } = root.derivePath(`m/44'/0'/0'/0/${id}`)
        const { address } = payments.p2pkh({ pubkey: publicKey })
        return address;
    }

module.exports = crypto

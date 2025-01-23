import axios from 'axios'
import {Buffer} from 'buffer'
import {Transaction} from '@solana/web3.js'


const BASE_URL = 'http://localhost:8080'


const txConvert = (base64Transaction : string)=>{
  const transactionBuffer = Buffer.from(base64Transaction, 'base64')
  const transaction = Transaction.from(transactionBuffer)
  return transaction
}


export const transferIn = async (clientSecret : string, amount : number, fromWallet : string)=>{
    try{
      const response = await axios.post(
        `${BASE_URL}/transfer/in`,
        {amount,fromWallet},
        {headers:{'Authorization':`Bearer ${clientSecret}`}}
      )
      const transaction = txConvert(response.data.base64Transaction)
      const {signature} = await window.phantom.solana.signAndSendTransaction(transaction)
      const confirmation = await axios.post(
        `${BASE_URL}/transfer/process`,
        {signature},
        {headers:{'Authorization':`Bearer ${clientSecret}`}}
      )
      console.log(confirmation.data)
      return confirmation.data
    }catch(e){
      console.log('Something went wrong')
    }
}


export const transferOut = async (clientSecret : string, amount : number, toWallet : string)=>{
    try{
      const response = await axios.post(
        `${BASE_URL}/transfer/out`,
        {amount,toWallet},
        {headers:{'Authorization':`Bearer ${clientSecret}`}}
      )
      const transaction = txConvert(response.data.base64Transaction)
      const {signature} = await window.phantom.solana.signAndSendTransaction(transaction)
      const confirmation = await axios.post(
        `${BASE_URL}/transfer/process`,
        {signature},
        {headers:{'Authorization':`Bearer ${clientSecret}`}}
      )
      console.log(confirmation.data)
      return confirmation.data
    }catch(e){
      console.log('Something went wrong')
    }
}
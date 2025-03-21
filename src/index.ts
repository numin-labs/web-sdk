import axios from 'axios'
import {Buffer} from 'buffer'
import {Transaction} from '@solana/web3.js'


const getURL = (url:string|undefined)=>{
  if(url){
    return url
  }else{
    return 'https://api.numin.xyz'
  }
}


export const txConvert = (base64Transaction : string)=>{
  const transactionBuffer = Buffer.from(base64Transaction, 'base64')
  const transaction = Transaction.from(transactionBuffer)
  return transaction
}


export const transferIn = async (sessionId : string, amount : number, fromWallet : string, url? : string)=>{
    try{
      const response = await axios.post(
        `${getURL(url)}/transfer/in`,
        {amount,fromWallet},
        {headers:{'Authorization':`Bearer ${sessionId}`}}
      )
      const transaction = txConvert(response.data.base64Transaction)
      const {signature} = await window.phantom.solana.signAndSendTransaction(transaction)
      const confirmation = await axios.post(
        `${getURL(url)}/transfer/process`,
        {signature},
        {headers:{'Authorization':`Bearer ${sessionId}`}}
      )
      return confirmation.data
    }catch(e){
      throw new Error('Could not complete transfer!')
    }
}


export const transferOut = async (sessionId : string, amount : number, toWallet : string, url? : string)=>{
    try{
      const response = await axios.post(
        `${getURL(url)}/transfer/out`,
        {amount,toWallet},
        {headers:{'Authorization':`Bearer ${sessionId}`}}
      )
      const transaction = txConvert(response.data.base64Transaction)
      const {signature} = await window.phantom.solana.signAndSendTransaction(transaction)
      const confirmation = await axios.post(
        `${getURL(url)}/transfer/process`,
        {signature},
        {headers:{'Authorization':`Bearer ${sessionId}`}}
      )
      return confirmation.data
    }catch(e){
      throw new Error('Could not complete transfer!')
    }
}
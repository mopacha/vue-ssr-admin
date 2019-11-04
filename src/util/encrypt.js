import JSEncrypt from 'jsencrypt'
import pubkey from './pubkey'

export function encrypt(data){
	let encrypt = new JSEncrypt()
	encrypt.setPublicKey(pubkey)
  return encrypt.encrypt(data)
}

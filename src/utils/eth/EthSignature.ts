import {ethers} from "ethers"
import Errors from "../errors/Errors"

export default class EthSignature {

    public static loginMessage(address: string, nonce: string): string {
        return `Welcome !

  Click "Sign" to login to your account.

  This request will not trigger a blockchain transaction or cost any gas fees.

  Wallet eth_address: ${address}
  
  Nonce:
  ${nonce}`
    }

    public static updatePasswordMessage(address: string, nonce: string): string {
        return `Welcome !

  Click "Sign" to reveal the password attached to your account linked to the wallet(${address}).

  This request will not trigger a blockchain transaction or cost any gas fees.

  Wallet eth_address: ${address}
  
  Nonce:
  ${nonce}`
    }

    public static updateEmailMessage(address: string, nonce: string): string {
        return `Welcome !

  Click "Sign" to update the email attached to your account linked to your wallet(${address}).

  This request will not trigger a blockchain transaction or cost any gas fees.

  Wallet eth_address: ${address}
  
  Nonce:
  ${nonce}`
    }

    public static bindMessage(address: string, uuid: string, nonce: string): string {
        return `Welcome !

  Click "Sign" to bind your eth_address(${address}) to your account(${uuid}).

  This request will not trigger a blockchain transaction or cost any gas fees.

  Wallet eth_address: ${address}
  
  Nonce:
  ${nonce}`
    }

    public static unbindMessage(address: string, nonce: string): string {
        return `Welcome !

  Click "Sign" to confirm and unbind your eth_address(${address}) from your account.

  This request will not trigger a blockchain transaction or cost any gas fees.

  Wallet eth_address: ${address}
  
  Nonce:
  ${nonce}`
    }

    public static extractAddress(message: string, signature: string): string {
        try {
            return ethers.verifyMessage(message, signature)
        } catch (e) {
            throw Errors.INVALID_Parameter("Invalid Signature.")
        }
    }
}
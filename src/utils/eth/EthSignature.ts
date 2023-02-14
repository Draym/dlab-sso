import {ethers} from "ethers"
import Errors from "../errors/Errors"

export default class EthSignature {

    public static loginMessage(address: string, nonce: string): string {
        return `Welcome to Delysium!

  Click "Sign" to login to your Delysium account.

  This request will not trigger a blockchain transaction or cost any gas fees.

  Wallet eth_address: ${address}
  
  Nonce:
  ${nonce}`
    }

    public static revealMessage(address: string, nonce: string): string {
        return `Welcome to Delysium!

  Click "Sign" to reveal the Delysium account's email linked to your wallet(${address}).

  This request will not trigger a blockchain transaction or cost any gas fees.

  Wallet eth_address: ${address}
  
  Nonce:
  ${nonce}`
    }

    public static updatePasswordMessage(address: string, nonce: string): string {
        return `Welcome to Delysium!

  Click "Sign" to reveal the password attached to your Delysium account linked to the wallet(${address}).

  This request will not trigger a blockchain transaction or cost any gas fees.

  Wallet eth_address: ${address}
  
  Nonce:
  ${nonce}`
    }

    public static updateEmailMessage(address: string, nonce: string): string {
        return `Welcome to Delysium!

  Click "Sign" to update the email attached to your Delysium account linked to your wallet(${address}).

  This request will not trigger a blockchain transaction or cost any gas fees.

  Wallet eth_address: ${address}
  
  Nonce:
  ${nonce}`
    }

    public static bindMessage(address: string, email: string, nonce: string): string {
        return `Welcome to Delysium!

  Click "Sign" to bind your eth_address(${address}) to your Delysium account of ${email}.

  This request will not trigger a blockchain transaction or cost any gas fees.
  
  I accept the Delysium Terms of Service: https://www.delysium.com/account/terms-of-use

  Wallet eth_address: ${address}
  Email: ${email}
  
  Nonce:
  ${nonce}`
    }

    public static unbindMessage(address: string, nonce: string): string {
        return `Welcome to Delysium!

  Click "Sign" to confirm and unbind your eth_address(${address}) from your Delysium account.

  This request will not trigger a blockchain transaction or cost any gas fees.
  
  I accept the Delysium Terms of Service: https://www.delysium.com/account/terms-of-use

  Wallet eth_address: ${address}
  
  Nonce:
  ${nonce}`
    }

    public static extractAddress(message: string, signature: string): string {
        try {
            return ethers.utils.verifyMessage(message, signature)
        } catch (e) {
            throw Errors.INVALID_Parameter("Invalid Signature.")
        }
    }
}
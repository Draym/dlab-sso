import {IsEthereumAddress} from "class-validator"

export default class WhitelistUserAddByWalletRequest {
    @IsEthereumAddress({each: true, message: "Please input only valid wallet addresses."})
    addresses: string[]
}
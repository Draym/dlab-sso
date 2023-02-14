import {IsEthereumAddress, IsInt} from "class-validator"

export default class AdminBindWalletRequest {
    @IsInt()
    public userId: number
    @IsEthereumAddress()
    public walletAddress: string
}
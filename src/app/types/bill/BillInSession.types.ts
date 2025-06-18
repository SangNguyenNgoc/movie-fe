export type TBillSession = {
    billId: string
    expireTime: string
}

export type TConcessionOfBill = {
    concessionId: string
    amount: number
    price: number
}

export type TAddCessionToBill = {
    concessionOfBills: TConcessionOfBill[]
}
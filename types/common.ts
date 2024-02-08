export type CartItem = {
  id: number
  imgUrl?: string
  title: string
  tags?: string[]
  unit?: string
  amount?: number
  prize: number
  specialPrize?: number
}

export type ApiRes<Data> = {
  resultcode: number
  resultmessage: string
  data: Data
}

export type AddressData = {
  id?: number
  title?: string
  member_id: number
  LogisticsSubType: string
  city1?: string
  city2?: string
  address?: string
  name: string
  tel: string
  CVSStoreName?: string
  CVSStoreID?: string
  CVSAddress?: string
}

export type InitialData = {
  paykind: string
  paystatus: string
  id: number
  name: string
  domain: string
  title: string
  keyword: string
  description: string
  email: string
  logisticprice: number
  jsonbody: string
  created_at: string
  updated_at: string
}

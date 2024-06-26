import axiosInstance from '@/lib/axios'
import { ApiRes } from '@/types/common'

export type ProductData = {
  title: string
  id: number
  price: number
  sortnum: string
  hits: number
  marketprice: number
  location: string
  tags: string | null
  star: number
  imgs: string[]
  number: string
  kindmain_id: number
  kindhead_id: number
  created_at: string
  closedate: string
  begindate: string
  updated_at: string
  buycount: number
  body: string
  specs: { title: string; body: string }[]
  unit: string
  kindhead_title: string
  kindmain_title: string
}

type GetProductsRes = ApiRes<{
  current_page: number
  data: ProductData[]
  total: number
  last_page: number
}>

type GetProductRes = ApiRes<ProductData>

type getProductsArgs = {
  baseURL: string
  page: number
  pageSize: number
  search?: string
  sortName?: string
  sortType?: string
  kindheadId?: string
  kindmainId?: string
  price1?: number
  price2?: number
}

export const getProducts = async ({
  baseURL,
  page,
  pageSize,
  search = '',
  sortName = 'hits',
  sortType = 'desc',
  kindheadId,
  kindmainId,
  price1,
  price2,
}: getProductsArgs): Promise<GetProductsRes> => {
  const { data } = await axiosInstance({
    method: 'POST',
    baseURL,
    url: '/api/product',
    data: {
      page,
      pagesize: pageSize,
      search,
      sortname: sortName,
      sorttype: sortType,
      searchstartdate: '2021-01-01',
      searchenddate: '2099-12-31',
      ...(kindheadId && { kindhead_id: kindheadId }),
      ...(kindmainId && { kindmain_id: kindmainId }),
      price1,
      price2,
    },
  })

  return data
}

export const getProduct = async (baseURL: string, id: number): Promise<GetProductRes> => {
  const { data } = await axiosInstance({
    method: 'POST',
    baseURL,
    url: '/api/product/show',
    data: {
      id,
    },
  })

  return data
}

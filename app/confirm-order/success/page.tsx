'use client'

import Title from '@/components/Title'
import { Delivery } from '@/context/AddressContext'
import { useWebSettingsContext } from '@/context/WebSettingsContext'
import { deliveryMap, handleLabel } from '@/lib/payment'
import { OrderData, getOrder } from '@/services/order'
import { CheckIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'

const SuccessPage = () => {
  const { webSettingsData } = useWebSettingsContext()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [data, setData] = useImmer<OrderData | null>(null)

  useEffect(() => {
    if (id) {
      getOrder(Number(id)).then(({ data }) => setData(data))
    }
  }, [id])

  return (
    <main className="min-h-screen">
      <Title title="付款" goBackUrl="/" />
      <div className="flex min-h-screen w-full flex-col items-center bg-default">
        <div className="flex flex-col items-center justify-center p-20">
          <CheckIcon className="h-[100px] w-[100px] rounded-full bg-primary text-white" />
          <div className="my-4 text-lg">付款完成</div>
        </div>
        <div className="w-full p-4">
          <div className="rounded-lg bg-white p-4">
            <div className="flex items-center border-b-2 p-4">
              <div className="text-md w-[25%]">訂單編號</div>
              <div className="text-md flex w-[75%] justify-end">{data?.ordergroupnumber}</div>
            </div>
            <div className="flex items-center border-b-2 p-4">
              <div className="text-md w-[25%]">運送方式</div>
              <div className="text-md flex w-[75%] justify-end">
                {deliveryMap[(data?.LogisticsSubType || 'HOME_DELIVERY') as Delivery]}
              </div>
            </div>
            <div className="flex items-center border-b-2 p-4">
              <div className="text-md w-[25%]">付款方式</div>
              <div className="text-md flex w-[75%] justify-end">
                {handleLabel(data?.paystatus || '', webSettingsData || null)}
              </div>
            </div>
            <div className="flex items-center border-b-2 p-4">
              <div className="text-md w-[25%]">地址</div>
              <div className="text-md flex w-[75%] flex-col justify-end">
                <div className="flex justify-end">{data?.CVSAddress || data?.raddress}</div>
                <div className="flex justify-end">{data?.CVSStoreName}</div>
              </div>
            </div>
            <div className="flex items-center p-4">
              <div className="text-md w-[25%]">金額</div>
              <div className="text-md flex w-[75%] justify-end">${data?.totalprice}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SuccessPage

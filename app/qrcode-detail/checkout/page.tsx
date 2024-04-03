'use client'
import Title from '@/components/Title'
import { Skeleton } from '@/components/ui/skeleton'
import { useOrderDetailContext } from '@/context/OrderDetailContext'
import { getPayBarcode } from '@/services/order'
import Image from 'next/image'
import { useEffect } from 'react'

const QrcodeDetail = () => {
  const { order } = useOrderDetailContext()
  console.log(order)
  useEffect(() => {
    const test = async () => {
      const data = await getPayBarcode(100)
      console.log(data)
    }
    test()
  }, [])

  return (
    <>
      <Title title="付款" goBackUrl="/member/orders" />
      <div className={'flex min-h-screen w-full flex-col items-center bg-background'}>
        <div className="w-full p-2">
          <div className="rounded-lg bg-white">
            <div className="flex w-full flex-col justify-between rounded-lg bg-white p-4">
              <div className="flex items-center space-x-2">
                <div className="relative flex h-[18px] min-w-[18px]">
                  <Image alt="info" fill src="/cash.png" />
                </div>
                <div className="text-lg font-bold">超商付款</div>
              </div>
              <span className="py-2 text-xs font-light">＊請使用下方付款條碼完成繳款。</span>
              <div className="flex items-center rounded-lg">
                <div className="flex w-full flex-col space-y-2">
                  {!order ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="break-keep">繳款金額</span>
                      <span className="flex">${order.totalprice}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-2 flex items-center rounded-lg">
                <div className="flex w-full flex-col space-y-2">
                  {!order ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="break-keep">訂購人</span>
                      <span className="flex">{order.rname}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-2 flex flex-col items-center space-y-5 rounded-lg bg-background p-3">
                {/* <div
                  className="flex h-10 items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: qrcode }}
                />
                <div
                  className="flex h-10 items-center justify-center "
                  dangerouslySetInnerHTML={{ __html: qrcode }}
                />
                <div
                  className="flex h-10 items-center justify-center "
                  dangerouslySetInnerHTML={{ __html: qrcode }}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default QrcodeDetail

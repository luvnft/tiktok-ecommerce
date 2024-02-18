'use client'

import { ScrollText } from 'lucide-react'
import Image from 'next/image'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Title from '@/components/Title'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { orderStatusMap } from '@/constants/member'

const OrderCard = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePay = () => {
    const newSearchPamras = new URLSearchParams(searchParams)

    router.push(`/member/orders/detail?${newSearchPamras.toString()}`)
  }

  return (
    <Card className="w-full border-none">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between border-b border-default pb-4 text-sm font-normal">
            <span className="text-gray-500">2021.12.27 12:23</span>
            <p className="text-primary">待付款</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p>生鮮超市</p>
          <div className="flex items-end justify-between">
            <div className="flex gap-4">
              <div className="rounded-xl bg-default p-4">
                <Image
                  width={100}
                  height={100}
                  className="md:h-25 md:w-25 h-10 w-10"
                  src="https://img.freepik.com/free-psd/grape-fruits-isolated-transparent-background_191095-14703.jpg?w=1060&t=st=1707652451~exp=1707653051~hmac=65ed420c75cf93ae28e14b5f563205eff39194d323cb73ba78e7fae7fd00612d"
                  alt="蘋果"
                />
              </div>
              <div className="rounded-xl bg-default p-4">
                <Image
                  width={100}
                  height={100}
                  className="md:h-25 md:w-25 h-10 w-10"
                  src="https://img.freepik.com/free-psd/grape-fruits-isolated-transparent-background_191095-14703.jpg?w=1060&t=st=1707652451~exp=1707653051~hmac=65ed420c75cf93ae28e14b5f563205eff39194d323cb73ba78e7fae7fd00612d"
                  alt="蘋果"
                />
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 text-sm">
              <span className="text-gray-400">共 2 件</span>
              <span>
                合計：$
                <span className="text-xl font-bold">1,000</span>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <span className="grid grid-cols-3 gap-2">
          <Button
            variant="ghost"
            className="rounded-3xl border border-gray-400 p-2 text-gray-400 hover:text-gray-400"
          >
            取消訂單
          </Button>
          <Button
            variant="ghost"
            className="rounded-3xl border border-primary p-2 text-primary hover:bg-primary-foreground hover:text-primary"
            onClick={handlePay}
          >
            付款
          </Button>
          <Button
            variant="ghost"
            className="hover:whit-blue-400 rounded-3xl border border-blue-400 p-2 text-blue-400 hover:bg-blue-100 hover:text-blue-400"
          >
            與我聯絡
          </Button>
        </span>
      </CardFooter>
    </Card>
  )
}

const NoOrder = () => {
  return (
    <div className="m-auto flex flex-1 flex-col items-center justify-center gap-8">
      <ScrollText color="#e8dad9" size={100} />
      <h4 className="text-center text-gray-500">抱歉，沒有找到訂單哦！</h4>
    </div>
  )
}

const AllOrders = () => {
  return (
    <div className="flex h-full">
      <NoOrder />
    </div>
  )
}

const CheckoutOrders = () => {
  return (
    <div className="flex h-full flex-col p-4">
      <OrderCard />
    </div>
  )
}

const ShippingOrders = () => {
  return (
    <div className="flex h-full flex-col p-4">
      <OrderCard />
    </div>
  )
}

const ReceiptOrders = () => {
  return (
    <div className="flex h-full flex-col p-4">
      <OrderCard />
    </div>
  )
}

const CommentOrders = () => {
  return (
    <div className="flex h-full flex-col p-4">
      <OrderCard />
    </div>
  )
}

const RefundOrders = () => {
  return (
    <div className="flex h-full flex-col p-4">
      <OrderCard />
    </div>
  )
}

const OrderPages = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get('type')!

  const handleTabChange = (value: string) => {
    const newSearchPamras = new URLSearchParams(searchParams)

    newSearchPamras.set('type', value)

    router.push(`/member/orders?${newSearchPamras.toString()}`)
  }

  return (
    <main className="flex min-h-screen flex-col bg-default">
      <Title title="訂單" goBackUrl="/member" />

      <div className="flex flex-1">
        <Tabs
          value={type}
          defaultValue="all"
          className="flex flex-1 flex-col overflow-x-auto"
          onValueChange={handleTabChange}
        >
          <TabsList className="flex justify-center gap-10 bg-white pb-2 md:justify-start md:pl-4">
            <TabsTrigger className="w-4 hover:text-primary" value="all">
              全部
            </TabsTrigger>
            {Object.values(orderStatusMap).map((status) => (
              <TabsTrigger
                key={status.value}
                className="w-4 hover:text-primary"
                value={status.value}
              >
                {status.title}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent className="flex-1" value="all">
            <AllOrders />
          </TabsContent>
          <TabsContent className="flex-1" value={orderStatusMap.checkout.value}>
            <CheckoutOrders />
          </TabsContent>
          <TabsContent className="flex-1" value={orderStatusMap.shipping.value}>
            <ShippingOrders />
          </TabsContent>
          <TabsContent className="flex-1" value={orderStatusMap.receipt.value}>
            <ReceiptOrders />
          </TabsContent>
          <TabsContent className="flex-1" value={orderStatusMap.receipted.value}>
            <CommentOrders />
          </TabsContent>
          <TabsContent className="flex-1" value={orderStatusMap.refunded.value}>
            <RefundOrders />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

export default OrderPages

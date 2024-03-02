'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { orderStatusMap } from '@/constants/order'
import { useOrderContext } from '@/context/OrderContext'
import Title from '@/components/Title'
import BottomDialog from '@/components/BottomDialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  AllOrders,
  CheckoutOrders,
  ShippingOrders,
  ReceiptOrders,
  ReceiptedOrders,
  RefundedOrders,
} from '@/app/member/orders/Orders'

const OrdersPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get('type')!

  useEffect(() => {
    if (!type) {
      router.push('/member/orders?type=all')
    }
  }, [type, router])

  const {
    isContactDialogOpen,
    selectedOrder,
    contactMessage,
    contactTextareaRef,
    handleContactDialogClose,
    handleContactMessageChange,
    handleContactSubmit,
  } = useOrderContext()

  const handleTabChange = (value: string) => {
    const newSearchPamras = new URLSearchParams(searchParams)
    newSearchPamras.set('type', value)
    router.push(`/member/orders?${newSearchPamras.toString()}`)
  }

  const handleConfirmContact = async () => {
    await handleContactSubmit()
    handleContactDialogClose()
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
          <TabsList className="sticky top-0 flex justify-center gap-10 bg-white pb-2 md:justify-start md:pl-4">
            <TabsTrigger className="w-4 hover:text-primary" value="all">
              全部
            </TabsTrigger>
            {Object.values(orderStatusMap).map(({ value, nav }) => (
              <TabsTrigger key={value} className="w-4 hover:text-primary" value={value}>
                {nav.title}
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
            <ReceiptedOrders />
          </TabsContent>
          <TabsContent className="flex-1" value={orderStatusMap.refunded.value}>
            <RefundedOrders />
          </TabsContent>
        </Tabs>
      </div>
      {isContactDialogOpen && (
        <BottomDialog className="h-[204]" title="與我聯絡" onClose={handleContactDialogClose}>
          <div className="flex flex-col gap-2">
            <div className="text-center text-sm text-gray-500">
              (訂單編號 {selectedOrder?.ordergroupnumber})
            </div>
            <div className="flex flex-col gap-4">
              <Textarea
                ref={contactTextareaRef}
                className="flex-1 bg-white text-base outline-none"
                defaultValue=""
                onChange={handleContactMessageChange}
              />
              <Button
                disabled={!contactMessage}
                className="rounded-lg"
                variant="primary"
                onClick={handleConfirmContact}
              >
                確認
              </Button>
            </div>
          </div>
        </BottomDialog>
      )}
    </main>
  )
}

export default OrdersPage

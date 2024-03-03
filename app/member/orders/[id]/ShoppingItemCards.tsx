'use client'

import Image from 'next/image'

import { Skeleton } from '@/components/ui/skeleton'
import { OrderData, OrderDetail } from '@/services/order'

type ShoppingItemCardProps = {
  detail: OrderDetail
}

function ShoppingItemCard({ detail }: ShoppingItemCardProps) {
  return (
    <div className="relative m-4 flex flex-col gap-2 rounded-xl bg-white p-4">
      <div className="flex flex-1 items-center justify-between gap-2">
        <div className="rounded-xl bg-default p-4">
          {detail.imgs.map((img, index) => (
            <Image
              key={index}
              width={100}
              height={100}
              className="md:h-25 md:w-25 h-10 w-10"
              src={img}
              alt={detail.product_title}
            />
          ))}
        </div>

        <div className="flex-1 text-sm">
          <span>{detail.product_title}</span>
          <div className="flex flex-col text-gray-500">
            <span>規格：{detail.productitem_title}</span>
            <span>數量：{detail.qty}份</span>
          </div>
        </div>

        <span className="text-lg font-bold">${detail.price.toLocaleString()}</span>
      </div>
    </div>
  )
}

function ShoppingItemCardSkeleton() {
  return (
    <div className="relative m-4 flex flex-col gap-2 rounded-xl bg-white p-4">
      <div className="flex flex-1 items-center justify-between gap-2">
        <div className="rounded-xl bg-default p-4">
          <Skeleton className="md:h-25 md:w-25 h-10 w-10" />
        </div>

        <div className="flex flex-1 flex-col gap-2 text-sm">
          <Skeleton className="h-5 w-40" />
          <div className="flex flex-col gap-2 text-gray-500">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>

        <Skeleton className="h-7 w-10" />
      </div>
    </div>
  )
}

type ShoppingItemCardsProps = {
  order: OrderData | null
}

function ShoppingItemCards({ order }: ShoppingItemCardsProps) {
  if (!order || !order.orderdetail) {
    return <ShoppingItemCardSkeleton />
  }

  return order.orderdetail.map((item) => <ShoppingItemCard detail={item} key={item.id} />)
}

export default ShoppingItemCards
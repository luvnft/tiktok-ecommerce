import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

import ProductCarousel from '@/app/products/[id]/ProductCarousel'
import TitleCard from '@/app/products/[id]/TitleCard'
// import SpecCard from '@/app/products/[id]/SpecCard'
import PrevButton from '@/components/PrevButton'
import { Card, CardContent } from '@/components/ui/card'
import SubmitButtons from '@/app/products/[id]/SubmitButtons'
import { getProduct } from '@/services/product'
import { getProductItems } from '@/services/productItem'

type ProductPageProps = {
  params: {
    id: string
  }
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = params
  const { data: product } = await getProduct(Number(id))
  const { data: productItems } = await getProductItems({ productId: id })

  return (
    <main className="mb-14 min-h-screen bg-default">
      <header className="flex items-center justify-between gap-3 bg-white p-4">
        <PrevButton />
        <Link href="/shopping-cart">
          <ShoppingCartIcon className="text-gray-400" />
        </Link>
      </header>
      <ProductCarousel imgs={product.imgs} />
      <TitleCard
        title={product.title}
        price={String(product.price)}
        salePrice={String(product.marketprice)}
        tags={product.tags?.split(',') || []}
      />
      <Card className="m-2 border-none shadow-none">
        <CardContent className="flex flex-col gap-2 p-3">
          <div dangerouslySetInnerHTML={{ __html: product.body }} />
        </CardContent>
      </Card>
      {/* <SpecCard
        specs={[
          { key: '產地', value: '安徽' },
          { key: '規格', value: '180+/份' },
          { key: '有效日期', value: '30天' },
        ]}
      /> */}
      {/* <Card className="m-2 border-none shadow-none">
        <div className="relative h-screen w-full">
          <Image
            src="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
            alt=""
            className="object-cover"
            fill
          />
        </div>
      </Card> */}
      <SubmitButtons product={product} specs={productItems.data} />
    </main>
  )
}

export default ProductPage

'use client'

import CartItem from '@/components/CartItem'
import MerchandiseCard from '@/components/MerchandiseCard'
import NavBar from '@/components/NavBar'
import React from 'react'
import { useImmer } from 'use-immer'

const ShoppingCartPage = () => {
  const [count, setCount] = useImmer([1, 1])
  return (
    <main className="mb-16">
      <header className="flex items-center justify-between bg-white px-4 pb-4 pt-6">
        <h4 className="mb-2 ml-auto mr-auto flex scroll-m-20 text-xl font-normal tracking-tight">
          購物車
        </h4>
      </header>
      <div className="bg-default flex w-full flex-col items-center justify-center">
        <div className="w-full p-4">
          <div className="rounded-lg bg-white">
            <CartItem
              amount={count[0]}
              editable={true}
              imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
              title="PS5 新春大禮包"
              prize={18888}
              tags={['快速出貨', '24hr']}
              onSelect={(res) => console.log(res)}
              onChange={(val) =>
                setCount((draft) => {
                  draft[0] = val
                })
              }
            />
            <CartItem
              amount={count[1]}
              editable={true}
              imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
              title="PS5 新春大禮包新春大禮包新春大禮包新春大禮包新春大禮包"
              prize={18888}
              specialPrize={13000}
              tags={['快速出貨', '24hr']}
              onSelect={(res) => console.log(res)}
              onChange={(val) =>
                setCount((draft) => {
                  draft[1] = val
                })
              }
            />
          </div>
        </div>

        <div className="font-lg mb-2 flex items-center justify-center font-semibold">
          ✨推薦商品✨
        </div>
        <div className="flex w-full items-center justify-center gap-x-1.5 p-2">
          <MerchandiseCard
            className="max-h-[320px] w-[50%] md:w-auto"
            imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
            title="PS5"
            tags={['game', 'tv']}
            prize={18800}
            specialPrize={13000}
            unit="台"
          />
          <MerchandiseCard
            className="max-h-[320px] w-[50%] md:w-auto"
            imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
            title="PS5 GGGHHGHGHGHGHGHGHGHGHGHG"
            tags={['game', 'tv']}
            prize={18800}
            unit="台"
          />
        </div>
        <div className="w-full p-4">
          <div className="rounded bg-white">
            <CartItem
              imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
              tags={['第三方物流', '快速出貨']}
              title="PS5 新春大禮包"
              amount={2}
              prize={18888}
              unit="台"
            />
            <CartItem
              imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
              tags={['第三方物流', '快速出貨']}
              title="PS5 新春大禮包"
              amount={2}
              prize={18888}
              unit="台"
            />
            <CartItem
              imgUrl="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"
              tags={['第三方物流', '快速出貨']}
              title="PS5 新春大禮包新春大禮包新春大禮包新春大禮包新春大禮包新春大禮包"
              amount={2}
              prize={18888}
              unit="台"
            />
          </div>
        </div>
      </div>
      <NavBar />
    </main>
  )
}

export default ShoppingCartPage

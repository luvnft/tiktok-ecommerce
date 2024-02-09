import Link from 'next/link'

import { cn } from '@/lib/utils'

type SidebarProps = {
  items: { id: number; title: string }[]
  activeType: string
}

const Sidebar = ({ items, activeType }: SidebarProps) => {
  return (
    <aside className="sticky top-[68px] flex h-full w-20 flex-col items-center">
      {items.map((item) => {
        return (
          <Link
            key={item.id}
            href={`/products?type=${item.title}`}
            className={cn('flex w-full cursor-pointer justify-center p-4 text-xs text-gray-500', {
              'bg-white font-semibold text-primary': activeType === item.title,
            })}
          >
            {item.title}
          </Link>
        )
      })}
    </aside>
  )
}

export default Sidebar

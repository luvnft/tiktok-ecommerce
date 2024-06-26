'use client'

import ReceiptForm from '@/app/confirm-order/upsert-receipt/ReceiptForm'
import { Delivery, useAddressContext } from '@/context/AddressContext'
import { useAuthContext } from '@/context/AuthContext'
import { useCity } from '@/hooks/useCity'
import { getAddress, upsertAddress } from '@/services/address'
import { AddressData } from '@/types/common'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { format } from 'date-fns'
import Title from '@/components/Title'
import { getBaseURL } from '@/lib/utils'

const UpsertReceiptPage = () => {
  const { cities, districts, handleGetDistrict } = useCity()
  const { handleSelectDeliveryType } = useAddressContext()
  const { user } = useAuthContext()
  const [value, setValue] = useImmer<AddressData>({
    title: format(new Date(), 'yyyymmddHHMMSSS') + user?.name,
    member_id: user?.id || 0,
    name: '',
    tel: '',
    LogisticsSubType: 'HOME_DELIVERY',
  })

  const router = useRouter()
  const searchParams = useSearchParams()

  const id = searchParams.get('id')
  const from = searchParams.get('from')

  const CVSStoreID = searchParams.get('CVSStoreID')
  const CVSStoreName = searchParams.get('CVSStoreName')
  const CVSAddress = searchParams.get('CVSAddress')
  const LogisticsSubType = searchParams.get('LogisticsSubType') as Delivery

  useEffect(() => {
    const baseURL = getBaseURL(window.location.host)

    if (id) {
      getAddress(baseURL).then(({ data }) => {
        const target = data.data?.find((opt) => opt?.id?.toString() === id)
        if (target) {
          console.log(target)
          setValue(target)
        }
      })
    }
  }, [id, setValue])

  useEffect(() => {
    if (CVSStoreID && CVSStoreName && CVSAddress && LogisticsSubType) {
      handleSelectDeliveryType(Delivery[LogisticsSubType])
      setValue((draft) => {
        draft['LogisticsSubType'] = Delivery[LogisticsSubType]
        draft['CVSStoreID'] = CVSStoreID
        draft['CVSStoreName'] = CVSStoreName
        draft['CVSAddress'] = CVSAddress
      })
    }
  }, [CVSStoreID, CVSStoreName, CVSAddress, LogisticsSubType, handleSelectDeliveryType, setValue])

  const handleSubmit = (val: AddressData) => {
    const baseURL = getBaseURL(window.location.host)

    const addressToSubmit =
      val.LogisticsSubType === 'HOME_DELIVERY' ? { ...val, LogisticsSubType: '' } : val
    upsertAddress(baseURL, addressToSubmit).then(() => {
      router.push(from || id ? '/profile' : '/confirm-order/choose-delivery')
    })
  }

  return (
    <main className="min-h-screen">
      <Title
        title={id ? '編輯收件人資訊' : '新增收件人資訊'}
        goBackUrl={from || id ? '/profile' : '/confirm-order/choose-delivery'}
      />
      <div className="flex min-h-screen w-full flex-col items-center bg-background">
        <div className="min-h-screen w-full bg-white p-4">
          <ReceiptForm
            value={value}
            cities={cities}
            districts={districts}
            onGetDistrict={handleGetDistrict}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </main>
  )
}

export default UpsertReceiptPage

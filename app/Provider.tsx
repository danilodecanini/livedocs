'use client'

import Loader from '@/components/Loader'
import { getClerkUser } from '@/lib/actions/user.actions'
import {
  ClientSideSuspense,
  LiveblocksProvider
} from '@liveblocks/react/suspense'
import React, { type ReactNode } from 'react'

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <LiveblocksProvider
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUser({ userIds })

        return users
      }}
      authEndpoint='/api/liveblocks-auth'
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  )
}

export default Provider

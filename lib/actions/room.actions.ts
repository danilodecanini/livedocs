'use server'

import { liveblocks } from '@/lib/liveblocks'
import { parseStringify } from '@/lib/utils'
import { nanoid } from 'nanoid'
import { revalidatePath } from 'next/cache'

export const createDocument = async ({
  userId,
  email
}: CreateDocumentParams) => {
  const roomId = nanoid()

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: 'Untitled'
    }

    const usersAccesses: RoomAccesses = {
      [email]: ['room:write']
    }

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: ['room:write']
    })

    revalidatePath('/')

    return parseStringify(room)
  } catch (error) {
    console.log(`Error happened while creating a room ${error}`)
  }
}

export const getDocument = async ({
  roomId,
  userId
}: { roomId: string; userId: string }) => {
  try {
    const room = await liveblocks.getRoom(roomId)

    // TODO: Bring this back letter on

    // const hasAccess = Object.keys(room.usersAccesses).includes(userId)

    // if (!hasAccess) throw new Error('You do not have access to this room')

    return parseStringify(room)
  } catch (error) {
    console.log(`Error happened while getting a room ${error}`)
  }
}

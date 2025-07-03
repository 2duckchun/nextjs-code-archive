import { createCommand, LexicalCommand } from 'lexical'

export type ImageSizePayload = {
  key: string // 선택된 ImageNode의 key
  width: number // px 값
  height: number // px 값
}

export const SET_IMAGE_SIZE_COMMAND: LexicalCommand<ImageSizePayload> =
  createCommand('SET_IMAGE_SIZE_COMMAND')

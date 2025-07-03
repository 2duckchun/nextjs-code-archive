// commands/insertImage.ts
import { createCommand, LexicalCommand } from 'lexical'

/**
 * payload: { src: string }
 *  └─ 업로드가 끝난 이미지 파일의 URL
 */
export const INSERT_IMAGE_COMMAND: LexicalCommand<{ src: string }> =
  createCommand('INSERT_IMAGE_COMMAND')

import { createCommand, LexicalCommand } from 'lexical'

export const INSERT_IFRAME_COMMAND: LexicalCommand<{
  src: string
  width: string
  height: string
}> = createCommand('INSERT_IFRAME_COMMAND')

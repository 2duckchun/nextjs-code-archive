import { DecoratorNode, SerializedLexicalNode, Spread } from 'lexical'

/** 직렬화 타입 */
export type SerializedIframeNode = Spread<
  { type: 'iframe'; src: string; width: string; height: string; version: 1 },
  SerializedLexicalNode
>

export class IframeNode extends DecoratorNode<React.ReactNode> {
  __src: string
  __width: string
  __height: string

  static getType() {
    return 'iframe'
  }

  constructor(src: string, width = '100%', height = '400px', key?: string) {
    super(key)
    this.__src = src
    this.__width = width
    this.__height = height
  }

  static clone(node: IframeNode) {
    return new IframeNode(node.__src, node.__width, node.__height, node.__key)
  }

  /* DOM 생성 */
  createDOM(): HTMLElement {
    const el = document.createElement('iframe')
    el.src = this.__src
    el.width = this.__width
    el.height = this.__height
    el.setAttribute('frameborder', '0')
    el.setAttribute('allowfullscreen', 'true')
    el.className = 'rounded-md'
    return el
  }
  updateDOM() {
    return false
  }

  /* 직렬화 */
  exportJSON(): SerializedIframeNode {
    return {
      type: 'iframe',
      src: this.__src,
      width: this.__width,
      height: this.__height,
      version: 1,
    }
  }
  static importJSON(j: SerializedIframeNode) {
    return new IframeNode(j.src, j.width, j.height)
  }

  /* React 미리보기 */
  decorate() {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <iframe
        src={this.__src}
        width={this.__width}
        height={this.__height}
        allowFullScreen
        className="rounded-md"
      />
    )
  }
}

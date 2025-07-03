// nodes/ImageNode.ts
import {
  DecoratorNode,
  SerializedLexicalNode, // 직렬화 타입 베이스
  Spread,
} from 'lexical'

/* 1️⃣  직렬화 타입 정의 ------------------------------------------------ */
export type SerializedImageNode = Spread<
  {
    type: 'image'
    src: string
    width: number | 'auto'
    height: number | 'auto'
    version: 1
  },
  SerializedLexicalNode
>

/* 2️⃣  노드 클래스 ---------------------------------------------------- */
export class ImageNode extends DecoratorNode<React.ReactNode> {
  __src: string
  __width: number | 'auto'
  __height: number | 'auto'

  static getType() {
    return 'image'
  }

  /* src, width, height, key? 순서로 통일 */
  constructor(
    src: string,
    width: number | 'auto' = 'auto',
    height: number | 'auto' = 'auto',
    key?: string,
  ) {
    super(key)
    this.__src = src
    this.__width = width
    this.__height = height
  }

  /* clone 도 같은 순서 유지 */
  static clone(node: ImageNode) {
    return new ImageNode(node.__src, node.__width, node.__height, node.__key)
  }

  /* --- DOM 생성 / 업데이트는 기존과 동일 --- */
  createDOM() {
    const img = document.createElement('img')
    img.src = this.__src
    if (this.__width !== 'auto') img.style.width = `${this.__width}px`
    if (this.__height !== 'auto') img.style.height = `${this.__height}px`
    return img
  }

  updateDOM(prev: ImageNode, dom: HTMLElement) {
    const el = dom as HTMLImageElement
    if (prev.__src !== this.__src) el.src = this.__src
    if (prev.__width !== this.__width) el.style.width = `${this.__width}px`
    if (prev.__height !== this.__height) el.style.height = `${this.__height}px`
    return false
  }

  exportJSON(): SerializedImageNode {
    return {
      type: 'image',
      src: this.__src,
      width: this.__width,
      height: this.__height,
      version: 1,
    }
  }

  static importJSON(serialized: SerializedImageNode): ImageNode {
    const { src, width, height } = serialized
    return new ImageNode(src, width, height)
  }

  decorate() {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={this.__src} alt="uploaded" className="max-w-full rounded-md" />
    )
  }
}

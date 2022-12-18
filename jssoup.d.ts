// thanks to @AmonDeShir

declare module 'jssoup' {
  class TreeBuilder {
    canBeEmptyElement(name: string): boolean
  }

  export class SoupElement {
    parent?: SoupTag
    previousElement?: SoupTag
    nextElement?: SoupTag

    constructor(
      parent?: SoupTag,
      previousElement?: SoupTag,
      nextElement?: SoupTag
    )

    get nextSibling(): SoupTag | undefined
    get previousSibling(): SoupTag | undefined
    get nextSiblings(): SoupTag | undefined
    get previousSiblings(): SoupTag | undefined
    get text(): string

    /** remove item from dom tree */
    extract(): void
    insert(index: number, newElement: SoupElement | string): void
    replaceWith(newElement: SoupElement | string): this | undefined
  }

  export class SoupString extends SoupElement {
    constructor(
      text: string,
      parent?: SoupElement,
      previousElement?: SoupElement,
      nextElement?: SoupElement
    )

    toString(): string
  }

  type Attributes =
    | string
    | string[]
    | {class: string}
    | {class: string[]}
    | {[attribute: string]: string}

  export class SoupTag extends SoupElement {
    name: string
    builder: TreeBuilder
    attrs: {[attribute: string]: string}

    /** contains direct children of current element */
    contents: SoupTag[]

    constructor(
      name: string,
      builder: TreeBuilder,
      attrs: {[attribute: string]: string}
    )

    get string(): SoupString

    /** includes all elements of which current element is the ancestor of */
    get descendants(): SoupElement[]

    find<T extends SoupElement>(
      name?: string,
      attrs?: Attributes,
      string?: string
    ): T | undefined

    /** like find_all in BeautifulSoup */
    findAll<T extends SoupElement>(
      name?: string,
      attrs?: Attributes,
      string?: string
    ): T[]

    findPreviousSibling<T extends SoupElement>(
      name?: string,
      attrs?: Attributes,
      string?: string
    ): T | undefined

    findPreviousSiblings<T extends SoupElement>(
      name?: string,
      attrs?: Attributes,
      string?: string
    ): T[]

    findNextSibling<T extends SoupElement>(
      name?: string,
      attrs?: Attributes,
      string?: string
    ): T | undefined

    findNextSiblings<T extends SoupElement>(
      name?: string,
      attrs?: Attributes,
      string?: string
    ): T[]

    getText(separator?: string): string
    prettify(indent?: string, breakline?: string): string
    toString(): string
    append(item: SoupElement): void

    /** @param expression - a CSS expression like "div > .class1"*/
    select<T extends SoupElement>(expression: string): T[]

    /** @param expression - a CSS expression like "div > .class1"*/
    selectOne<T extends SoupElement>(expression: string): T | undefined
  }

  export default class JSSoup extends SoupTag {
    /** The text element only contains whitespace will be ignored by default. To disable this feature, set "ignoreWhitespace" to true. */
    constructor(text: string, ignoreWhitespace?: boolean)
  }
}

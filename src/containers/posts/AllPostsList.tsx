'use client'

import { FunctionComponent, HTMLAttributes } from 'react'
import { Desktop } from './Desktop'

interface AllPostsListProps extends HTMLAttributes<HTMLDivElement> {}

export const AllPostsList: FunctionComponent<AllPostsListProps> = ({
  className,
  ...props
}) => {
  return <Desktop />
}

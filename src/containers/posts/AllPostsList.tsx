'use client'

import { FunctionComponent, HTMLAttributes } from 'react'
import { Desktop } from './Desktop'
import { Mobile } from './Mobile'

interface AllPostsListProps extends HTMLAttributes<HTMLDivElement> {}

export const AllPostsList: FunctionComponent<AllPostsListProps> = ({
  className,
  ...props
}) => {
  return (
    <>
      <Desktop className="hidden md:block" />
      <Mobile className="block md:hidden" />
    </>
  )
}

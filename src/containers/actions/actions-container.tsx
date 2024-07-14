'use client'

import { Action } from '@/app/(routes)/callback/page'
import { Button } from '@/components/ui/button'

export const ActionsContainer = ({
  actionsList,
}: {
  actionsList: Action[]
}) => {
  return (
    <div>
      <div className="flex gap-2">
        {actionsList.map((action, index) => (
          <Button key={action.label} onClick={() => action.api({ index })}>
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

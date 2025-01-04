import React from 'react'
import { Card, CardContent, CardFooter } from './ui/card'
import Markdown from './markdown'

type Props = {
  role: string,
  content: string
}

const MessageBox = ({ role, content }: Props) => {
  return (
    <Card className={`overflow-hidden ${role === 'user' ? 'bg-blue-50' : 'bg-white'}`}>
      <CardContent className="p-4">
        <div className="text-sm font-semibold mb-2">
          {role === 'user' ? 'You' : 'AI Assistant'}
        </div>
        <div className="text-sm">
          <Markdown text={content} />
        </div>
      </CardContent>
      {role !== "user" && (
        <CardFooter className="border-t bg-muted/50 px-4 py-2 text-xs text-muted-foreground">
          Verify the information before taking any action
        </CardFooter>
      )}
    </Card>
  )
}

export default MessageBox


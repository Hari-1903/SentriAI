import React from 'react'
import { Textarea } from './ui/textarea'
import { useChat } from 'ai/react';
import { Button } from './ui/button';
import { CornerDownLeft, Loader2 } from 'lucide-react';
import { Badge } from './ui/badge';
import Messages from './messages';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type Props = {
  reportData?: string
}

const ChatComponent = ({ reportData }: Props) => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chatgemini",
    });

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">AI Assistant</CardTitle>
        <Badge variant={'outline'}
          className={`${reportData ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
        >
          {reportData ? "✓ Report Added" : "No Report Added"}
        </Badge>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col space-y-4">
        <div className="flex-grow overflow-auto">
          <Messages messages={messages} isLoading={isLoading} />
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(event, {
              data: {
                reportData: reportData as string,
              },
            });
          }}
          className="space-y-4"
        >
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Type your query here..."
            className="min-h-[100px] resize-none"
          />
          <Button
            type="submit"
            className="w-full bg-[#3267FF]/80 hover:bg-[#3267FF]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <CornerDownLeft className="mr-2 h-4 w-4" />
                Ask
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ChatComponent


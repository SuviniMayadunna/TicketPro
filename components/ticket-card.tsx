import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User, MessageSquare, ArrowRight } from "lucide-react"
import Link from "next/link"

interface TicketCardProps {
  ticket: {
    id: number
    title: string
    description: string
    status: "open" | "in-progress" | "closed"
    priority: "low" | "medium" | "high" | "urgent"
    category: string
    createdAt: string
    assignee?: string | null
    comments?: number
  }
}

const statusColors = {
  open: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "in-progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  closed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
}

const priorityColors = {
  low: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  medium: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  urgent: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

export function TicketCard({ ticket }: TicketCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {ticket.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{ticket.description}</p>
          </div>
          <Badge className={`ml-2 ${statusColors[ticket.status]} border-0`}>{ticket.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(ticket.createdAt)}
            </div>
            {ticket.assignee && (
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {ticket.assignee}
              </div>
            )}
            {ticket.comments && (
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                {ticket.comments}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={priorityColors[ticket.priority]}>
              {ticket.priority}
            </Badge>
            <Badge variant="outline">{ticket.category}</Badge>
          </div>
          <Button variant="ghost" size="sm" asChild className="group/button">
            <Link href={`/tickets/${ticket.id}`}>
              View
              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover/button:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

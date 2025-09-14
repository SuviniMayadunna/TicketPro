"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { CommentSection } from "@/components/comment-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, User, Tag, AlertTriangle, Clock, CheckCircle2, Edit } from "lucide-react"

// Mock data - in a real app, this would come from an API
const mockTicket = {
  id: 1,
  title: "Login page not loading properly",
  description:
    "Users are experiencing issues when trying to access the login page. The page appears to be blank and doesn't respond to user interactions. This has been reported by multiple users across different browsers including Chrome, Firefox, and Safari. The issue seems to have started after the recent deployment on January 14th.",
  status: "open" as const,
  priority: "high" as const,
  category: "technical",
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T14:20:00Z",
  assignee: "John Doe",
  reporter: "Alice Johnson",
  tags: ["login", "frontend", "critical"],
}

const mockComments = [
  {
    id: 1,
    author: "Alice Johnson",
    content:
      "I've noticed this issue started happening after the recent deployment. Multiple users have reported the same problem.",
    timestamp: "2024-01-15T10:35:00Z",
    isInternal: false,
  },
  {
    id: 2,
    author: "John Doe",
    content: "I'm investigating this issue. It seems to be related to the new authentication middleware we deployed.",
    timestamp: "2024-01-15T11:15:00Z",
    isInternal: true,
  },
  {
    id: 3,
    author: "John Doe",
    content: "I've identified the root cause. Working on a fix now. Should have this resolved within the next 2 hours.",
    timestamp: "2024-01-15T14:20:00Z",
    isInternal: false,
  },
]

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

export default function TicketDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [ticket, setTicket] = useState(mockTicket)
  const [comments, setComments] = useState(mockComments)
  const [isLoading, setIsLoading] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleStatusChange = async (newStatus: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setTicket((prev) => ({ ...prev, status: newStatus as any, updatedAt: new Date().toISOString() }))
    setIsLoading(false)
  }

  const handlePriorityChange = async (newPriority: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setTicket((prev) => ({ ...prev, priority: newPriority as any, updatedAt: new Date().toISOString() }))
    setIsLoading(false)
  }

  const handleAddComment = (content: string, isInternal: boolean) => {
    const newComment = {
      id: comments.length + 1,
      author: "Current User", // In a real app, this would be the logged-in user
      content,
      timestamp: new Date().toISOString(),
      isInternal,
    }
    setComments((prev) => [...prev, newComment])
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertTriangle className="h-4 w-4" />
      case "in-progress":
        return <Clock className="h-4 w-4" />
      case "closed":
        return <CheckCircle2 className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Ticket</span>
            <span>#{ticket.id}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ticket Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl leading-tight">{ticket.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={`${statusColors[ticket.status]} border-0`}>
                        {getStatusIcon(ticket.status)}
                        <span className="ml-1 capitalize">{ticket.status.replace("-", " ")}</span>
                      </Badge>
                      <Badge className={`${priorityColors[ticket.priority]} border-0`}>
                        {ticket.priority.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground leading-relaxed">{ticket.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Comments */}
            <CommentSection comments={comments} onAddComment={handleAddComment} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={ticket.status} onValueChange={handleStatusChange} disabled={isLoading}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select value={ticket.priority} onValueChange={handlePriorityChange} disabled={isLoading}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Ticket Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ticket Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Assigned to</p>
                    <p className="text-sm text-muted-foreground">{ticket.assignee || "Unassigned"}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Reporter</p>
                    <p className="text-sm text-muted-foreground">{ticket.reporter}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Created</p>
                    <p className="text-sm text-muted-foreground">{formatDate(ticket.createdAt)}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-sm text-muted-foreground">{formatDate(ticket.updatedAt)}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Category</p>
                    <p className="text-sm text-muted-foreground capitalize">{ticket.category}</p>
                  </div>
                </div>

                {ticket.tags && ticket.tags.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium mb-2">Tags</p>
                      <div className="flex flex-wrap gap-1">
                        {ticket.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

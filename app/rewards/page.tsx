"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Star,
  Target,
  Gift,
  Award,
  Zap,
  Clock,
  CheckCircle,
  TrendingUp,
  Users,
  MessageSquare,
  Crown,
} from "lucide-react"

// Mock data
const userStats = {
  totalPoints: 2450,
  level: 5,
  nextLevelPoints: 3000,
  ticketsResolved: 47,
  averageResponseTime: "2.3 hours",
  customerSatisfaction: 4.8,
  streak: 12,
}

const achievements = [
  {
    id: 1,
    title: "First Resolver",
    description: "Resolved your first ticket",
    icon: CheckCircle,
    earned: true,
    earnedDate: "2024-01-10",
    points: 50,
    rarity: "common",
  },
  {
    id: 2,
    title: "Speed Demon",
    description: "Resolved 5 tickets in under 1 hour",
    icon: Zap,
    earned: true,
    earnedDate: "2024-01-12",
    points: 150,
    rarity: "rare",
  },
  {
    id: 3,
    title: "Customer Champion",
    description: "Achieved 4.5+ average customer rating",
    icon: Star,
    earned: true,
    earnedDate: "2024-01-14",
    points: 200,
    rarity: "epic",
  },
  {
    id: 4,
    title: "Streak Master",
    description: "Maintain a 10-day resolution streak",
    icon: Target,
    earned: true,
    earnedDate: "2024-01-15",
    points: 300,
    rarity: "legendary",
  },
  {
    id: 5,
    title: "Team Player",
    description: "Help 3 colleagues with their tickets",
    icon: Users,
    earned: false,
    progress: 2,
    total: 3,
    points: 100,
    rarity: "rare",
  },
  {
    id: 6,
    title: "Communication Expert",
    description: "Receive 50 positive feedback comments",
    icon: MessageSquare,
    earned: false,
    progress: 32,
    total: 50,
    points: 250,
    rarity: "epic",
  },
]

const rewards = [
  {
    id: 1,
    title: "Extra Day Off",
    description: "Get an additional paid day off",
    cost: 2000,
    category: "time-off",
    available: true,
    icon: Clock,
  },
  {
    id: 2,
    title: "Premium Parking Spot",
    description: "Reserved parking for one month",
    cost: 1500,
    category: "perks",
    available: true,
    icon: Star,
  },
  {
    id: 3,
    title: "Team Lunch Voucher",
    description: "$100 voucher for team lunch",
    cost: 1000,
    category: "social",
    available: true,
    icon: Gift,
  },
  {
    id: 4,
    title: "Tech Conference Ticket",
    description: "Ticket to a tech conference of your choice",
    cost: 3000,
    category: "learning",
    available: false,
    icon: Trophy,
  },
  {
    id: 5,
    title: "Home Office Setup",
    description: "$500 budget for home office equipment",
    cost: 2500,
    category: "equipment",
    available: true,
    icon: Award,
  },
]

const rarityColors = {
  common: "bg-gray-100 text-gray-800 border-gray-200",
  rare: "bg-blue-100 text-blue-800 border-blue-200",
  epic: "bg-purple-100 text-purple-800 border-purple-200",
  legendary: "bg-yellow-100 text-yellow-800 border-yellow-200",
}

const categoryIcons = {
  "time-off": Clock,
  perks: Star,
  social: Gift,
  learning: Trophy,
  equipment: Award,
}

export default function RewardsPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const progressToNextLevel = ((userStats.totalPoints % 500) / 500) * 100

  const handleRedeemReward = (rewardId: number) => {
    // In a real app, this would make an API call
    console.log(`Redeeming reward ${rewardId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Rewards & Achievements</h1>
          <p className="text-muted-foreground">
            Earn points by resolving tickets and unlock exclusive rewards and achievements
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="rewards">Rewards Store</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardHeader className="pb-2">
                  <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{userStats.totalPoints.toLocaleString()}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader className="pb-2">
                  <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                    <Crown className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">Level {userStats.level}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Current Level</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader className="pb-2">
                  <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{userStats.ticketsResolved}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Tickets Resolved</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader className="pb-2">
                  <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{userStats.streak}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </CardContent>
              </Card>
            </div>

            {/* Level Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Level Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Level {userStats.level}</span>
                    <span className="text-sm text-muted-foreground">
                      {userStats.totalPoints} / {userStats.nextLevelPoints} points
                    </span>
                  </div>
                  <Progress value={progressToNextLevel} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    {userStats.nextLevelPoints - userStats.totalPoints} points until Level {userStats.level + 1}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements
                    .filter((achievement) => achievement.earned)
                    .slice(0, 3)
                    .map((achievement) => {
                      const Icon = achievement.icon
                      return (
                        <div key={achievement.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={rarityColors[achievement.rarity as keyof typeof rarityColors]}>
                              {achievement.rarity}
                            </Badge>
                            <p className="text-sm font-medium text-primary">+{achievement.points} pts</p>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <Card
                    key={achievement.id}
                    className={`transition-all duration-300 ${
                      achievement.earned
                        ? "bg-primary/5 border-primary/20 hover:shadow-lg"
                        : "hover:shadow-md opacity-75"
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-12 w-12 rounded-full flex items-center justify-center ${
                              achievement.earned ? "bg-primary/10" : "bg-muted"
                            }`}
                          >
                            <Icon
                              className={`h-6 w-6 ${achievement.earned ? "text-primary" : "text-muted-foreground"}`}
                            />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{achievement.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          </div>
                        </div>
                        <Badge className={rarityColors[achievement.rarity as keyof typeof rarityColors]}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {achievement.earned ? (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Earned {new Date(achievement.earnedDate!).toLocaleDateString()}
                            </Badge>
                          ) : (
                            achievement.progress !== undefined && (
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm text-muted-foreground">Progress</span>
                                  <span className="text-sm font-medium">
                                    {achievement.progress}/{achievement.total}
                                  </span>
                                </div>
                                <Progress value={(achievement.progress / achievement.total!) * 100} className="h-2" />
                              </div>
                            )
                          )}
                        </div>
                        <span className="text-sm font-medium text-primary">+{achievement.points} pts</span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Rewards Store</h2>
                <p className="text-muted-foreground">Redeem your points for exclusive rewards</p>
              </div>
              <Card className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span className="font-medium">{userStats.totalPoints.toLocaleString()} points</span>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward) => {
                const Icon = categoryIcons[reward.category as keyof typeof categoryIcons]
                const canAfford = userStats.totalPoints >= reward.cost
                return (
                  <Card
                    key={reward.id}
                    className={`transition-all duration-300 ${
                      reward.available && canAfford ? "hover:shadow-lg hover:-translate-y-1" : "opacity-60"
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{reward.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{reward.description}</p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-primary" />
                          <span className="font-medium">{reward.cost.toLocaleString()} points</span>
                        </div>
                        <Button
                          size="sm"
                          disabled={!reward.available || !canAfford}
                          onClick={() => handleRedeemReward(reward.id)}
                        >
                          {!reward.available ? "Unavailable" : !canAfford ? "Not enough points" : "Redeem"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

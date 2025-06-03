export interface UserProfile {
  id: number
  name: string
  username: string
  email: string
  avatar: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Professional"
  joinDate: string
  location: string
  favoriteStyle: string
  goals: string[]
  stats: {
    totalSessions: number
    currentStreak: number
    longestStreak: number
    totalHours: number
    averageSession: number
    overallProgress: number
  }
  achievements: Array<{
    id: number
    name: string
    icon: string
    description: string
    unlockedDate: string
  }>
  trainingHistory: Array<{
    date: string
    type: string
    duration: number
    intensity: "Low" | "Medium" | "High"
    notes?: string
  }>
  predictions: Array<{
    id: number
    fight: string
    prediction: string
    confidence: number
    result?: "Correct" | "Incorrect"
    date: string
  }>
  favoriteGyms: number[]
  favoriteFighters: number[]
  purchaseHistory: Array<{
    id: number
    productId: number
    productName: string
    price: number
    date: string
    status: "Delivered" | "Shipped" | "Processing"
  }>
  wishlist: number[]
  preferences: {
    notifications: boolean
    emailUpdates: boolean
    publicProfile: boolean
    trainingReminders: boolean
    fightAlerts: boolean
  }
}

export const userProfilesDatabase: UserProfile[] = [
  {
    id: 1,
    name: "Alex Rodriguez",
    username: "alexfighter",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    level: "Intermediate",
    joinDate: "March 2024",
    location: "Los Angeles, CA",
    favoriteStyle: "Boxing",
    goals: ["Fitness", "Self-Defense", "Competition"],
    stats: {
      totalSessions: 47,
      currentStreak: 12,
      longestStreak: 18,
      totalHours: 94,
      averageSession: 2,
      overallProgress: 68,
    },
    achievements: [
      {
        id: 1,
        name: "First Steps",
        icon: "🥋",
        description: "Completed first training module",
        unlockedDate: "March 15, 2024",
      },
      {
        id: 2,
        name: "Consistency",
        icon: "📅",
        description: "7 days of training",
        unlockedDate: "March 22, 2024",
      },
      {
        id: 3,
        name: "Streak Master",
        icon: "🔥",
        description: "10-day training streak",
        unlockedDate: "April 5, 2024",
      },
    ],
    trainingHistory: [
      {
        date: "2024-02-01",
        type: "Boxing",
        duration: 60,
        intensity: "High",
        notes: "Focused on jab-cross combinations",
      },
      {
        date: "2024-02-02",
        type: "Conditioning",
        duration: 45,
        intensity: "Medium",
        notes: "Cardio and strength training",
      },
      {
        date: "2024-02-03",
        type: "Technique",
        duration: 75,
        intensity: "Low",
        notes: "Form correction and drilling",
      },
    ],
    predictions: [
      {
        id: 1,
        fight: "Rodriguez vs Silva",
        prediction: "Rodriguez",
        confidence: 78,
        result: "Correct",
        date: "2024-01-15",
      },
      {
        id: 2,
        fight: "Johnson vs Lee",
        prediction: "Johnson",
        confidence: 65,
        result: "Correct",
        date: "2024-01-12",
      },
    ],
    favoriteGyms: [1, 3, 7],
    favoriteFighters: [1, 3, 5],
    purchaseHistory: [
      {
        id: 1,
        productId: 1,
        productName: "Elite Pro Boxing Gloves",
        price: 129.99,
        date: "2024-01-20",
        status: "Delivered",
      },
      {
        id: 2,
        productId: 12,
        productName: "Hand Wraps - Cotton",
        price: 12.99,
        date: "2024-01-20",
        status: "Delivered",
      },
    ],
    wishlist: [5, 7, 14],
    preferences: {
      notifications: true,
      emailUpdates: true,
      publicProfile: true,
      trainingReminders: true,
      fightAlerts: true,
    },
  },
  {
    id: 2,
    name: "Sarah Chen",
    username: "sarahkicks",
    email: "sarah@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    level: "Beginner",
    joinDate: "January 2024",
    location: "San Francisco, CA",
    favoriteStyle: "Kickboxing",
    goals: ["Fitness", "Self-Defense"],
    stats: {
      totalSessions: 23,
      currentStreak: 5,
      longestStreak: 8,
      totalHours: 34.5,
      averageSession: 1.5,
      overallProgress: 35,
    },
    achievements: [
      {
        id: 1,
        name: "First Steps",
        icon: "🥋",
        description: "Completed first training module",
        unlockedDate: "January 28, 2024",
      },
    ],
    trainingHistory: [
      {
        date: "2024-02-01",
        type: "Kickboxing",
        duration: 45,
        intensity: "Medium",
      },
      {
        date: "2024-02-03",
        type: "Self-Defense",
        duration: 60,
        intensity: "Low",
      },
    ],
    predictions: [],
    favoriteGyms: [2, 4],
    favoriteFighters: [6, 9],
    purchaseHistory: [
      {
        id: 3,
        productId: 2,
        productName: "Beginner Training Gloves",
        price: 49.99,
        date: "2024-01-25",
        status: "Delivered",
      },
    ],
    wishlist: [6, 13],
    preferences: {
      notifications: true,
      emailUpdates: false,
      publicProfile: false,
      trainingReminders: true,
      fightAlerts: false,
    },
  },
]

// Current user (for simulation)
export const currentUser = userProfilesDatabase[0]

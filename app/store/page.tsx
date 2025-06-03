"use client"

import { useState } from "react"
import { Search, Filter, Heart, ShoppingCart, Star, Zap, Shield, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const products = [
  {
    id: 1,
    name: "Elite Pro Boxing Gloves",
    category: "Gloves",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.8,
    reviews: 234,
    image: "/placeholder.svg?height=300&width=300",
    level: "Professional",
    brand: "FightGear Pro",
    features: ["Genuine Leather", "Gel Padding", "Velcro Closure"],
    inStock: true,
    bestseller: true,
  },
  {
    id: 2,
    name: "Beginner Training Gloves",
    category: "Gloves",
    price: 49.99,
    rating: 4.5,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
    level: "Beginner",
    brand: "StartStrong",
    features: ["Synthetic Leather", "Foam Padding", "Hook & Loop"],
    inStock: true,
    bestseller: false,
  },
  {
    id: 3,
    name: "Heavy Bag - 100lb",
    category: "Bags",
    price: 199.99,
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    level: "Professional",
    brand: "IronCore",
    features: ["Synthetic Leather", "Pre-filled", "Heavy Duty Chain"],
    inStock: true,
    bestseller: false,
  },
  {
    id: 4,
    name: "Speed Bag Platform Set",
    category: "Bags",
    price: 89.99,
    rating: 4.3,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=300",
    level: "Beginner",
    brand: "QuickHit",
    features: ["Adjustable Height", "Swivel Mount", "Includes Bag"],
    inStock: false,
    bestseller: false,
  },
  {
    id: 5,
    name: "MMA Training Shorts",
    category: "Uniforms",
    price: 59.99,
    rating: 4.6,
    reviews: 123,
    image: "/placeholder.svg?height=300&width=300",
    level: "Professional",
    brand: "FightWear",
    features: ["Moisture Wicking", "Flexible Waistband", "Reinforced Seams"],
    inStock: true,
    bestseller: true,
  },
  {
    id: 6,
    name: "Headgear Protection",
    category: "Protection",
    price: 79.99,
    rating: 4.4,
    reviews: 91,
    image: "/placeholder.svg?height=300&width=300",
    level: "Beginner",
    brand: "SafeGuard",
    features: ["Foam Padding", "Adjustable Straps", "Chin Protection"],
    inStock: true,
    bestseller: false,
  },
]

const categories = ["All", "Gloves", "Bags", "Uniforms", "Protection"]
const levels = ["All Levels", "Beginner", "Professional"]
const brands = ["All Brands", "FightGear Pro", "StartStrong", "IronCore", "QuickHit", "FightWear", "SafeGuard"]

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All Levels")
  const [selectedBrand, setSelectedBrand] = useState("All Brands")
  const [searchTerm, setSearchTerm] = useState("")
  const [cartItems, setCartItems] = useState<number[]>([])
  const [wishlistItems, setWishlistItems] = useState<number[]>([])

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesLevel = selectedLevel === "All Levels" || product.level === selectedLevel
    const matchesBrand = selectedBrand === "All Brands" || product.brand === selectedBrand
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesLevel && matchesBrand && matchesSearch
  })

  const addToCart = (productId: number) => {
    setCartItems([...cartItems, productId])
  }

  const toggleWishlist = (productId: number) => {
    if (wishlistItems.includes(productId)) {
      setWishlistItems(wishlistItems.filter((id) => id !== productId))
    } else {
      setWishlistItems([...wishlistItems, productId])
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">OctagonOracle Gear Store</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Professional-grade equipment for fighters at every level
          </p>
        </div>

        {/* Featured Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.slice(1).map((category) => (
            <Card
              key={category}
              className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setSelectedCategory(category)}
            >
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 mx-auto mb-3 bg-[#00d4ff]/10 rounded-full flex items-center justify-center">
                  {category === "Gloves" && <Zap className="h-6 w-6 text-[#00d4ff]" />}
                  {category === "Bags" && <Shield className="h-6 w-6 text-[#00d4ff]" />}
                  {category === "Uniforms" && <Award className="h-6 w-6 text-[#00d4ff]" />}
                  {category === "Protection" && <Shield className="h-6 w-6 text-[#00d4ff]" />}
                </div>
                <h3 className="text-white font-medium">{category}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Filter className="h-5 w-5 text-[#00d4ff]" />
              Filter Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[#1a1a1a] border-[#333333] text-white placeholder:text-white/50"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-[#1a1a1a] border-[#333333] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#2a2a2a] border-[#333333]">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="text-white hover:bg-[#333333]">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="bg-[#1a1a1a] border-[#333333] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#2a2a2a] border-[#333333]">
                  {levels.map((level) => (
                    <SelectItem key={level} value={level} className="text-white hover:bg-[#333333]">
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="bg-[#1a1a1a] border-[#333333] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#2a2a2a] border-[#333333]">
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand} className="text-white hover:bg-[#333333]">
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="border-[#333333] text-white/70 hover:bg-[#333333]">
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Sections */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-[#2a2a2a] border-[#333333]">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black">
              All Products
            </TabsTrigger>
            <TabsTrigger value="beginner" className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black">
              Beginner Gear
            </TabsTrigger>
            <TabsTrigger
              value="professional"
              className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black"
            >
              Professional Gear
            </TabsTrigger>
            <TabsTrigger
              value="bestsellers"
              className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black"
            >
              Bestsellers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                {filteredProducts.length} Product{filteredProducts.length !== 1 ? "s" : ""} Found
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-white/70 text-sm">Sort by:</span>
                <Select defaultValue="featured">
                  <SelectTrigger className="w-40 bg-[#1a1a1a] border-[#333333] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2a2a] border-[#333333]">
                    <SelectItem value="featured" className="text-white hover:bg-[#333333]">
                      Featured
                    </SelectItem>
                    <SelectItem value="price-low" className="text-white hover:bg-[#333333]">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high" className="text-white hover:bg-[#333333]">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating" className="text-white hover:bg-[#333333]">
                      Highest Rated
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm hover:shadow-lg transition-all group"
                >
                  {product.bestseller && (
                    <div className="bg-[#d20a11] text-white text-xs font-medium px-3 py-1 rounded-t-lg">BESTSELLER</div>
                  )}
                  <CardHeader className="relative">
                    <div className="aspect-square bg-[#1a1a1a] rounded-lg border border-[#333333] mb-4 overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-[#1a1a1a]/80 hover:bg-[#1a1a1a]"
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          wishlistItems.includes(product.id) ? "text-[#d20a11] fill-current" : "text-white/70"
                        }`}
                      />
                    </Button>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            product.level === "Professional"
                              ? "border-[#d20a11] text-[#d20a11]"
                              : "border-[#00d4ff] text-[#00d4ff]"
                          }`}
                        >
                          {product.level}
                        </Badge>
                        <span className="text-white/70 text-sm">{product.brand}</span>
                      </div>
                      <CardTitle className="text-white text-lg">{product.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-white text-sm">{product.rating}</span>
                        </div>
                        <span className="text-white/70 text-sm">({product.reviews} reviews)</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {product.features.map((feature, index) => (
                        <span key={index} className="text-xs text-white/50 bg-[#333333] px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-white">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-white/50 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          product.inStock ? "border-[#00d4ff] text-[#00d4ff]" : "border-[#d20a11] text-[#d20a11]"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-[#d20a11] hover:bg-[#d20a11]/90"
                        disabled={!product.inStock}
                        onClick={() => addToCart(product.id)}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button variant="outline" className="border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="beginner">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts
                .filter((p) => p.level === "Beginner")
                .map((product) => (
                  <Card
                    key={product.id}
                    className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm hover:shadow-lg transition-all"
                  >
                    {/* Same product card structure as above */}
                    <CardContent className="p-6">
                      <div className="text-center">
                        <h3 className="text-white font-medium">{product.name}</h3>
                        <p className="text-2xl font-bold text-white mt-2">${product.price}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="professional">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts
                .filter((p) => p.level === "Professional")
                .map((product) => (
                  <Card
                    key={product.id}
                    className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm hover:shadow-lg transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="text-center">
                        <h3 className="text-white font-medium">{product.name}</h3>
                        <p className="text-2xl font-bold text-white mt-2">${product.price}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="bestsellers">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts
                .filter((p) => p.bestseller)
                .map((product) => (
                  <Card
                    key={product.id}
                    className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm hover:shadow-lg transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="text-center">
                        <h3 className="text-white font-medium">{product.name}</h3>
                        <p className="text-2xl font-bold text-white mt-2">${product.price}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Shopping Cart Summary */}
        {cartItems.length > 0 && (
          <Card className="border-[#d20a11]/30 bg-[#d20a11]/10 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-[#d20a11]" />
                  <span className="text-white font-medium">{cartItems.length} items in cart</span>
                </div>
                <Button className="bg-[#d20a11] hover:bg-[#d20a11]/90">View Cart</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

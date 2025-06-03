"use client"

import { forwardRef, ButtonHTMLAttributes, ReactNode, useState, MouseEvent } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { createRipple, buttonTap } from "@/lib/animation-utils"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform-gpu",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        neon: "bg-gradient-to-r from-cyan-400 to-blue-600 text-white hover:brightness-110 shadow-lg shadow-cyan-400/20",
        glow: "bg-black border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 shadow-lg shadow-cyan-400/10",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface AnimatedButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode
  ripple?: boolean
  pressEffect?: boolean
  hoverScale?: boolean
  glowOnHover?: boolean
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, variant, size, children, ripple = true, pressEffect = true, hoverScale = true, glowOnHover = false, ...props }, ref) => {
    const [isPressed, setIsPressed] = useState(false)

    const handleMouseDown = () => {
      setIsPressed(true)
    }

    const handleMouseUp = () => {
      setIsPressed(false)
    }

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (ripple) {
        createRipple(e)
      }
      if (props.onClick) {
        props.onClick(e)
      }
    }

    return (
      <motion.button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, className }),
          ripple && "ripple-container overflow-hidden",
          pressEffect && "btn-3d",
          hoverScale && "hover:scale-105",
          glowOnHover && "hover:glow-blue",
          "transition-all duration-300"
        )}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsPressed(false)}
        whileTap={pressEffect ? buttonTap : undefined}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)

AnimatedButton.displayName = "AnimatedButton"

export { AnimatedButton, buttonVariants } 
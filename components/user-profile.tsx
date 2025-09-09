"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/use-auth"
import { User, Settings, LogOut, ChevronDown } from "lucide-react"

interface UserProfileProps {
    variant?: "desktop" | "mobile"
    onClose?: () => void
}

export function UserProfile({ variant = "desktop", onClose }: UserProfileProps) {
    const { user, signOut } = useAuth()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    if (!user) return null

    const handleSignOut = async () => {
        setIsLoading(true)
        try {
            await signOut()
            router.push("/")
            if (onClose) onClose()
        } catch (error) {
            console.error("Failed to sign out:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleProfileClick = () => {
        router.push("/profile")
        if (onClose) onClose()
    }

    const getUserInitials = () => {
        const name = user.user_metadata?.name || user.email?.split("@")[0] || "U"
        return name.charAt(0).toUpperCase()
    }

    const getUserName = () => {
        return user.user_metadata?.name || user.email?.split("@")[0] || "User"
    }

    const getUserAvatar = () => {
        return user.user_metadata?.avatar_url || user.user_metadata?.picture
    }

    if (variant === "mobile") {
        return (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 border border-white/10">
                <Avatar className="w-10 h-10">
                    <AvatarImage src={getUserAvatar()} alt={getUserName()} />
                    <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                        {getUserInitials()}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                        {getUserName()}
                    </p>
                    <p className="text-xs text-white/70 truncate">
                        {user.email}
                    </p>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleProfileClick}
                    className="text-white/70 hover:text-white hover:bg-white/10"
                >
                    <Settings className="w-4 h-4" />
                </Button>
            </div>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/10 text-white"
                >
                    <Avatar className="w-8 h-8">
                        <AvatarImage src={getUserAvatar()} alt={getUserName()} />
                        <AvatarFallback className="bg-primary/20 text-primary font-semibold text-sm">
                            {getUserInitials()}
                        </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:block text-sm font-medium">
                        {getUserName()}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 p-2">
                    <Avatar className="w-8 h-8">
                        <AvatarImage src={getUserAvatar()} alt={getUserName()} />
                        <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                            {getUserInitials()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                            {getUserName()}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                            {user.email}
                        </p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleProfileClick}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleProfileClick}>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleSignOut}
                    disabled={isLoading}
                    className="text-destructive focus:text-destructive"
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    {isLoading ? "Signing out..." : "Sign out"}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
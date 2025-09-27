
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Settings } from "lucide-react";
import { AuthButtons } from "./auth-buttons";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <MapPin className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">Paranhos PR</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" asChild>
              <Link href="/territorios">
                <MapPin className="w-4 h-4 mr-2" />
                Territórios
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/municipios">
                <Users className="w-4 h-4 mr-2" />
                Municípios
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/agenda">
                <Calendar className="w-4 h-4 mr-2" />
                Agenda
              </Link>
            </Button>
            <AuthButtons />
          </nav>
        </div>
      </div>
    </header>
  );
}

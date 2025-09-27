
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useSession } from "next-auth/react";

export function AuthButtons() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <Button variant="ghost" asChild>
          <Link href="/admin">
            <Settings className="w-4 h-4 mr-2" />
            Admin
          </Link>
        </Button>
      ) : (
        <Button variant="outline" asChild size="sm">
          <Link href="/admin/login">
            <Settings className="w-4 h-4 mr-2" />
            Login
          </Link>
        </Button>
      )}
    </>
  );
}

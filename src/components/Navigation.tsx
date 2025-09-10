import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getSession, logout } from "@/services/auth";

export const Navigation = () => {
  const navItems = [
    { label: "Markets", href: "/#markets" },
    { label: "About", href: "/about" },
  ];
  const session = getSession();

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              MarketHub
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
                asChild
              >
                <a href={item.href}>{item.label}</a>
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">{session.email}</span>
                <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10" onClick={() => { logout(); window.location.reload(); }}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <a href="/login">Login</a>
                </Button>
                <Button className="bg-gradient-primary" asChild>
                  <a href="/register">Register</a>
                </Button>
              </div>
            )}

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-6">
                  {navItems.map((item) => (
                    <Button
                      key={item.label}
                      variant="ghost"
                      className="justify-start"
                      asChild
                    >
                      <a href={item.href}>{item.label}</a>
                    </Button>
                  ))}
                  {session ? (
                    <Button variant="outline" onClick={() => { logout(); window.location.href = "/"; }}>Logout</Button>
                  ) : (
                    <>
                      <Button asChild><a href="/login">Login</a></Button>
                      <Button asChild className="bg-gradient-primary"><a href="/register">Register</a></Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { login } from "@/services/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(email.trim(), password);
    if (!res.ok) setError(res.error || "Login failed");
    else window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navigation />
      <div className="container mx-auto px-4 py-16 max-w-md">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="text-sm">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <label className="text-sm">Password</label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {error && <div className="text-sm text-loss">{error}</div>}
              <Button type="submit" className="w-full">Login</Button>
            </form>
            <div className="text-sm text-muted-foreground mt-4">
              New here? <Link to="/register" className="text-primary hover:underline">Create an account</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;



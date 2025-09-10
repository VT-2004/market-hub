import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { register } from "@/services/auth";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    const res = register(email.trim(), password);
    if (!res.ok) setError(res.error || "Registration failed");
    else window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navigation />
      <div className="container mx-auto px-4 py-16 max-w-md">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle>Register</CardTitle>
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
              <div>
                <label className="text-sm">Confirm Password</label>
                <Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
              </div>
              {error && <div className="text-sm text-loss">{error}</div>}
              <Button type="submit" className="w-full">Create account</Button>
            </form>
            <div className="text-sm text-muted-foreground mt-4">
              Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;



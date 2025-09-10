import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export const NotifyMeDialog = ({ trigger }: { trigger: React.ReactNode }) => {
  const [email, setEmail] = useState('');
  const [pair, setPair] = useState('BTCUSDT');
  const [saved, setSaved] = useState(false);

  const save = () => {
    try {
      const key = 'notifyPrefs';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push({ email, pair, createdAt: Date.now() });
      localStorage.setItem(key, JSON.stringify(existing));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {}
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Get notified</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pair">Symbol (optional)</Label>
            <Input id="pair" placeholder="e.g. BTCUSDT" value={pair} onChange={(e) => setPair(e.target.value.toUpperCase())} />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => { setEmail(''); setPair('BTCUSDT'); }}>Clear</Button>
            <Button onClick={save}>Save</Button>
          </div>
          {saved && <div className="text-sm text-gain">Saved! We will notify you when this feature is live.</div>}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotifyMeDialog;



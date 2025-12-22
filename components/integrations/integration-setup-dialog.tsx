'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ExternalLink, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { IntegrationWithState } from '@/lib/integrations/types';
import { getPlatformForm } from '@/lib/data/integrations-metadata';
import { useIntegrationStore } from '@/lib/stores/integration-store';

interface IntegrationSetupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  integration: IntegrationWithState | null;
}

export function IntegrationSetupDialog({
  open,
  onOpenChange,
  integration,
}: IntegrationSetupDialogProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { connectIntegration, disconnectIntegration } = useIntegrationStore();

  if (!integration) return null;

  const platformForm = getPlatformForm(integration.platform);

  // If no form configuration exists, show a message
  if (!platformForm) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Setup {integration.name}</DialogTitle>
            <DialogDescription>
              Configuration for {integration.name} is not available yet.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      const missingFields = platformForm.fields
        .filter((field) => field.required && !formData[field.name])
        .map((field) => field.label);

      if (missingFields.length > 0) {
        toast.error(`Please fill in: ${missingFields.join(', ')}`);
        setIsLoading(false);
        return;
      }

      // Save to local store
      connectIntegration(integration.id, formData);

      toast.success(`${integration.name} connected successfully!`);
      onOpenChange(false);
      setFormData({});
    } catch (error) {
      toast.error('Failed to save integration settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    disconnectIntegration(integration.id);
    toast.success(`${integration.name} disconnected`);
    onOpenChange(false);
    setFormData({});
  };

  const handleFieldChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Pre-fill form with existing config if connected
  const getFieldValue = (name: string) => {
    return formData[name] ?? integration.config?.[name] ?? '';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {integration.isConnected ? 'Settings' : 'Setup'} {integration.name}
          </DialogTitle>
          <DialogDescription>
            {integration.isConnected
              ? 'Update your integration settings or disconnect.'
              : 'Enter your credentials to connect this integration.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {platformForm.fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </Label>
                <Input
                  id={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={getFieldValue(field.name)}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  required={field.required}
                />
              </div>
            ))}

            {platformForm.docsUrl && (
              <a
                href={platformForm.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View documentation
              </a>
            )}
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            {integration.isConnected && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDisconnect}
                className="w-full sm:w-auto"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Disconnect
              </Button>
            )}
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1 sm:flex-initial"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="flex-1 sm:flex-initial">
                {isLoading ? 'Saving...' : integration.isConnected ? 'Save' : 'Connect'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

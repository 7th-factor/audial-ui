'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { IconCreditCard, IconReceipt } from '@tabler/icons-react';

export default function BillingPage() {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-xl font-semibold">Billing</h2>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and billing information.
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                You are currently on the Free plan.
              </CardDescription>
            </div>
            <Badge variant="secondary">Free</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">API Calls</span>
              <span className="font-medium">250 / 1,000</span>
            </div>
            <Progress value={25} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Phone Numbers</span>
              <span className="font-medium">1 / 2</span>
            </div>
            <Progress value={50} />
          </div>
          <Button className="w-full">Upgrade to Pro</Button>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            Add a payment method to upgrade your plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline">
            <IconCreditCard className="mr-2 h-4 w-4" />
            Add payment method
          </Button>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            View and download your past invoices.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <IconReceipt className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">
              No billing history yet.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Invoices will appear here once you upgrade.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

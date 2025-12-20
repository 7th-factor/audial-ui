import { redirect } from 'next/navigation';

// Redirect to main integrations page
// Both /integrations and /settings/integrations show the same content
export default function SettingsIntegrationsPage() {
  redirect('/integrations');
}

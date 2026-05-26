import { SeveraClient } from '../src/severa/client.js';

async function main(): Promise<void> {
  if ((!process.env.SEVERA_CLIENT_ID || !process.env.SEVERA_CLIENT_SECRET) && !process.env.SEVERA_ACCESS_TOKEN) {
    console.error('Skipping live smoke test: set SEVERA_CLIENT_ID/SEVERA_CLIENT_SECRET or SEVERA_ACCESS_TOKEN.');
    return;
  }

  const client = new SeveraClient();
  const authorized = await client.get('/heartbeat/authorized');
  console.log(JSON.stringify({ ok: true, authorized }, null, 2));
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});

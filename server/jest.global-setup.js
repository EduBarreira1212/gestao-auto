import { execSync } from 'child_process';

async function init() {
    execSync('docker compose up -d --wait');
    execSync('npx prisma db push');
}

export default init;

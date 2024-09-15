import { execSync } from 'child_process';

async function init() {
    execSync('docker start car-manager-test');
    execSync('npx prisma db push');
}

export default init;

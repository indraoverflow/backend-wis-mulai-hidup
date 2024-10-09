import media from "./media.seed";
import reception from "./wedding_rep.seed";
import ceremony from "./wedding_cer.seed";
import subscription from "./subscription.seed";
import user from "./user.seed";
import theme from "./theme.seed";
import role from "./role.seed";
import brideGroomMedia from "./bride_groom_media.seed";
import accountBank from './account_bank.seed'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default async function main() {
	await role();
	await user();
	await theme();
	await reception();
	await ceremony();
	await accountBank();
	await media();
	await subscription();
	await brideGroomMedia();
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
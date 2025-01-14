import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();

program
.option('--mode <mode>', 'Modo de ejecución', 'development')
.parse(process.argv);

const options = program.opts();
const environment = options.mode;

dotenv.config({ path: `.env.${environment}` });

dotenv.config();

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD
}
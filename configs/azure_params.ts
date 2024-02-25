import { argv } from 'node:process';

export const azureParams = {
    user_name: (process.argv[4]).replace('user_name=', ''),
    user_password: (process.argv[5]).replace('user_password=', ''),
    file_with_names: (process.argv[6]).replace('file_with_names=', ''),
};
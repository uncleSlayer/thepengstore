import { Client, Account, ID } from 'appwrite';

export const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('64feb46adbc838eab66a');

export const account = new Account(client)
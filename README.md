# Merit-Bot
### Author: Nick Kowalchyk
>   This is a bot so that different users can add and subtract an 
>   arbitrary amount of merits or demerits (mostly meaningless) 
>   to other users. Different users have different permissions for
>   adding merits, subtracting merits, adding demerits, and 
>   subtracting demerits. Mostly for fun!

## To Install/Run
* Install NodeJS
* Install npm
* run npm install to add dependencies
* create ENVIRONMENT.env file containing Discord API key, port, and MongoDB server key
* In two different terminals run 
1. npm run startserver
> To start the server
2. npm run startclient
> To start the Discord client

## Usage

* !merits @user || !demerits @user
>   Replys to user and returns number of merits and demerits for >   the @user
* !merits @user INT
>   checks permissions of issuer and adds or subtracts a positive 
>   or negative integer from the @user's values in the db

## TODO
1. Add client facing !permissions @user command so users may         retrieve their own .
2. Add client facing !permissions @user change command so            superusers/admins can change permissions of various users
3. beta testing/commenting
4. Possible refactor with better understanding of Node and           Mongoose
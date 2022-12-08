# MY4X4 - How to get locked and lifted...

This is the repo for Locked & Lifted (My 4x4). Follow the instructions below to get it running on your local machine. If you have any questions keep them to yourself.

# Getting it started

## Install Homebrew
Launch terminal and run the following command: (Check for latest install code to copy at: [Homebrew.com](https://brew.sh/) )

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```


You might need to add brew to a specific path (ARM Processor Macs).

The instructions will be in the install notification or add these commands to terminal.


Replace `[user_name]` in the path string with your system user:

```
echo '# Set PATH, MANPATH, etc., for Homebrew.' >> /Users/[username]/.zprofile

echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/[username]/.zprofile

eval "$(/opt/homebrew/bin/brew shellenv)"
```
---
## Install PostgresQL
Open your terminal and run the comman to install postgres.

```
brew install postgresql

brew services start
```

## Pull Down Repo
Copy URL from github and grab the repo via URL:

[https://github.com/kengreeff/my4x4.git](https://github.com/kengreeff/my4x4.git)

Open terminal cd into your my4x4 local folder eg. ```.../my4x4```

## Create .env file:
Create your own .env file, request the latest .env from another developer.

Make sure to replace the path with your own [user_name] and all client ID/secret data is only to be stored in git ignored files.

**Example:**

```
# When adding additional env variables, the schema in /env/schema.mjs should be updated accordingly

# Auth0
AUTH0_CLIENT_ID=""
AUTH0_CLIENT_SECRET=""
AUTH0_ISSUER="https://my4x4-dev.au.auth0.com"

# Database
DATABASE_URL=""
DATABASE_MIGRATION_URL="postgresql://[user_name]]@localhost:5432/my4x4?connection_limit=1"

# Next Auth
# You can generate the secret via 'openssl rand -base64 32' on Linux
# More info: https://next-auth.js.org/configuration/options#secret
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3001"

NODE_ENV="development"
```

## Install Packages
Relevant packages will install for the project.
```
npm install
```

## Create Database
This will use prisma to create a local database.
```
npx prisma db push
```
## Seed Database
Get existing seed data into your database.
```
npx prisma db seed
```
## Run Prisma Studio
```
npx prisma studio
```

# Start Server
Try opening the browser to the defined localhost URL. E.g.
```
npm run dev
```

# Test its running...
Open Browser and go to the relevant localhost path.

[http://localhost:3001](http://localhost:3001)

---

## Additional Details

If you are not familiar with the different technologies used in this project, please refer to the respective docs or ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [tRPC](https://trpc.io)
- [Chakra UI](https://chakra-ui.com/)
## Learn More

To learn more about the [Locked and Lifted](https://my4x4.info), wait till we write some docs. Or look at the notion.

## How do I deploy this?

Follow our deployment guides for [Vercel]().

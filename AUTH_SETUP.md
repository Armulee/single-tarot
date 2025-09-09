# Authentication Setup Guide

This guide will help you set up authentication for your Next.js application using Auth.js v5 with Google OAuth and email/password authentication, connected to Supabase.

## Prerequisites

1. A Supabase project
2. A Google Cloud Console project with OAuth 2.0 credentials
3. Node.js and npm installed

## Step 1: Supabase Setup

1. Go to [Supabase](https://supabase.com) and create a new project
2. In your Supabase dashboard, go to the SQL Editor
3. Run the SQL script from `supabase-schema.sql` to create the necessary tables and policies
4. Go to Settings > API to get your project URL and anon key
5. Go to Settings > API > Service Role to get your service role key

## Step 2: Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to Credentials > Create Credentials > OAuth 2.0 Client IDs
5. Set the application type to "Web application"
6. Add authorized redirect URIs:
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://yourdomain.com/api/auth/callback/google`
7. Copy the Client ID and Client Secret

## Step 3: Environment Variables

Update your `.env.local` file with the following values:

```env
# Auth.js Configuration
AUTH_SECRET=your-auth-secret-key-here
AUTH_URL=http://localhost:3000

# Supabase Configuration
SUPABASE_URL=your-supabase-url-here
SUPABASE_ANON_KEY=your-supabase-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key-here

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Database URL for Auth.js
DATABASE_URL=your-supabase-database-url-here
```

### Generating AUTH_SECRET

You can generate a secure AUTH_SECRET using:

```bash
openssl rand -base64 32
```

Or use an online generator like [generate-secret.vercel.app](https://generate-secret.vercel.app/32)

## Step 4: Database URL

The DATABASE_URL should be in the format:
```
postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
```

You can find this in your Supabase dashboard under Settings > Database.

## Step 5: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/signin` or `/signup`
3. Test both Google OAuth and email/password authentication

## Features Implemented

- ✅ Google OAuth authentication
- ✅ Email/password authentication
- ✅ User registration with password hashing
- ✅ Session management with JWT
- ✅ Supabase integration
- ✅ Row Level Security (RLS) policies
- ✅ Responsive UI components
- ✅ Error handling and validation

## File Structure

```
├── app/
│   ├── api/auth/
│   │   ├── [...nextauth]/route.ts    # Auth.js API routes
│   │   └── register/route.ts         # User registration endpoint
│   ├── signin/page.tsx               # Sign-in page
│   └── signup/page.tsx               # Sign-up page
├── components/
│   ├── auth/
│   │   ├── google-signin-button.tsx  # Google OAuth button
│   │   └── auth-divider.tsx          # Form divider component
│   └── providers/
│       └── session-provider.tsx      # Auth.js SessionProvider
├── lib/
│   ├── auth.ts                       # Auth.js configuration
│   └── supabase.ts                   # Supabase client setup
└── supabase-schema.sql               # Database schema
```

## Troubleshooting

### Common Issues

1. **"Invalid credentials" error**: Check that your Google OAuth credentials are correct and the redirect URI matches exactly.

2. **Database connection errors**: Verify your Supabase URL and service role key are correct.

3. **"User already exists" error**: The user might already be registered. Try signing in instead.

4. **CORS errors**: Make sure your domain is added to the authorized origins in Google Cloud Console.

### Debug Mode

To enable debug mode for Auth.js, add this to your environment variables:

```env
NEXTAUTH_DEBUG=true
```

This will provide detailed logs in your console.

## Security Notes

- Never commit your `.env.local` file to version control
- Use strong, unique passwords for your database
- Regularly rotate your API keys
- Enable Row Level Security (RLS) on all tables
- Use HTTPS in production

## Next Steps

After setting up authentication, you might want to:

1. Add email verification
2. Implement password reset functionality
3. Add user profile management
4. Set up role-based access control
5. Add social login providers (GitHub, Discord, etc.)
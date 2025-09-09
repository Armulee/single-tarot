# Supabase Authentication Setup Guide

This guide will help you set up authentication for your Next.js application using Supabase Auth with Google OAuth and email/password authentication.

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
   - For development: `http://localhost:3000/auth/callback`
   - For production: `https://yourdomain.com/auth/callback`
7. Copy the Client ID and Client Secret

## Step 2.5: Configure Google OAuth in Supabase

1. In your Supabase dashboard, go to Authentication > Providers
2. Enable Google provider
3. Add your Google Client ID and Client Secret
4. Set the redirect URL to: `https://your-project-ref.supabase.co/auth/v1/callback`

## Step 3: Environment Variables

Update your `.env.local` file with the following values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key-here

# Google OAuth Configuration (for Supabase Auth)
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

**Note:** The `NEXT_PUBLIC_` prefix is required for client-side access to these environment variables.

## Step 4: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/signin` or `/signup`
3. Test both Google OAuth and email/password authentication

## Features Implemented

- ✅ Google OAuth authentication via Supabase Auth
- ✅ Email/password authentication via Supabase Auth
- ✅ User registration with email verification
- ✅ Session management with Supabase Auth
- ✅ Automatic profile creation
- ✅ Row Level Security (RLS) policies
- ✅ Responsive UI components
- ✅ Error handling and validation
- ✅ OAuth callback handling

## File Structure

```
├── app/
│   ├── auth/
│   │   └── callback/page.tsx         # OAuth callback handler
│   ├── signin/page.tsx               # Sign-in page
│   └── signup/page.tsx               # Sign-up page
├── components/
│   └── auth/
│       ├── google-signin-button.tsx  # Google OAuth button
│       └── auth-divider.tsx          # Form divider component
├── contexts/
│   └── auth-context.tsx              # Supabase Auth context
├── hooks/
│   └── use-auth.ts                   # Auth hook
├── lib/
│   └── supabase.ts                   # Supabase client setup
└── supabase-schema.sql               # Database schema
```

## Troubleshooting

### Common Issues

1. **"Invalid credentials" error**: Check that your Google OAuth credentials are correct and the redirect URI matches exactly.

2. **Database connection errors**: Verify your Supabase URL and anon key are correct.

3. **"User already exists" error**: The user might already be registered. Try signing in instead.

4. **CORS errors**: Make sure your domain is added to the authorized origins in Google Cloud Console.

5. **OAuth callback errors**: Ensure the redirect URL in Google Console matches your Supabase callback URL.

### Debug Mode

To enable debug mode for Supabase, you can check the browser console for detailed error messages. Supabase Auth provides comprehensive error information.

## Security Notes

- Never commit your `.env.local` file to version control
- Use strong, unique passwords for your database
- Regularly rotate your API keys
- Enable Row Level Security (RLS) on all tables
- Use HTTPS in production

## Next Steps

After setting up authentication, you might want to:

1. ✅ Email verification (built into Supabase Auth)
2. Implement password reset functionality
3. Add user profile management
4. Set up role-based access control
5. Add social login providers (GitHub, Discord, etc.)
6. Add user dashboard/profile pages
7. Implement protected routes
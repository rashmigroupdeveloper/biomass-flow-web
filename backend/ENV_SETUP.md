# Environment Variables Setup for Website-ATS Integration

## Overview

Since both the ATS (`ats.rashmimetaliks.com`) and the main website (`rashmimetaliks.com`) are hosted on the **same cPanel server**, the website can directly connect to the ATS PostgreSQL database to read approved vacancies.

This is **simpler and more efficient** than using API sync because:

- No additional API endpoints needed
- Real-time data (no sync delay)
- Less code to maintain
- No API key management required

## Required Environment Variables

Add this to your `.env` file in the `backend` directory:

```bash
# ATS Database Connection
# Connect directly to the ATS database to read approved vacancies
ATS_DATABASE_URL=postgresql://atsrashmimetalik_atsuser:Rashmi@@2077@localhost:5432/atsrashmimetalik_ats
```

**Note:** Replace the password with your actual database password.

### Alternative: Individual Connection Parameters

```bash
ATS_PGHOST=localhost
ATS_PGPORT=5432
ATS_PGDATABASE=atsrashmimetalik_ats
ATS_PGUSER=atsrashmimetalik_atsuser
ATS_PGPASSWORD=your_password
PG_SSL=false
```

## How It Works

1. **No setup required in ATS** - The website reads from the existing `vacancies` table
2. **Automatic** - When a vacancy is approved in ATS (status = 'approved'), it automatically appears on the career page
3. **Real-time** - No sync needed, the website queries the database directly
4. **Secure** - Only reads approved vacancies, no write access needed

## Database Query

The website queries the ATS database with:

```sql
SELECT * FROM vacancies WHERE status = 'approved'
```

This means:

- Only approved vacancies are shown
- Rejected/pending vacancies are hidden automatically
- Changes in ATS reflect immediately on the website

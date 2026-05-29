import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const toNumber = (value: string | undefined, fallback: number): number => {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const basePoolSettings = {
  max: toNumber(process.env.PG_POOL_MAX, 10),
  min: toNumber(process.env.PG_POOL_MIN, 1),
  idleTimeoutMillis: toNumber(process.env.PG_IDLE_TIMEOUT, 30000),
  connectionTimeoutMillis: toNumber(process.env.PG_CONNECTION_TIMEOUT, 5000),
  acquireTimeoutMillis: 10000,
  allowExitOnIdle: false,
  keepAlive: true,
  maxUses: 7500,
  statement_timeout: 10000,
};

// Check if SSL should be enabled (default false for local databases on same server)
const useSSL = process.env.PG_SSL === "true";

const sslConfig = useSSL
  ? {
      ssl: {
        rejectUnauthorized: false,
        checkServerIdentity: () => undefined,
      },
    }
  : {};

/**
 * Connect to ATS PostgreSQL database
 * Since both website and ATS are on the same cPanel server,
 * we can directly connect to the ATS database to read approved vacancies
 *
 * Connection string format:
 * postgresql://atsrashmimetalik_atsuser:password@localhost:5432/atsrashmimetalik_ats
 */
// Configure connection parameters
const connectionConfig = process.env.ATS_DATABASE_URL
  ? {
      connectionString: process.env.ATS_DATABASE_URL,
      application_name: "koove_organic_website",
      ...sslConfig,
      ...basePoolSettings,
    }
  : {
      host: process.env.ATS_PGHOST || "localhost",
      port: parseInt(process.env.ATS_PGPORT || "5432", 10),
      database: process.env.ATS_PGDATABASE || "atsrashmimetalik_ats",
      user: process.env.ATS_PGUSER || "atsrashmimetalik_atsuser",
      password: process.env.ATS_PGPASSWORD || "",
      application_name: "koove_organic_website",
      ...sslConfig,
      ...basePoolSettings,
    };

// Log connection configuration (safely)
console.log("🐘 ATS Database Configuration:");
if ("connectionString" in connectionConfig && connectionConfig.connectionString) {
  try {
    const url = new URL(connectionConfig.connectionString);
    console.log(
      `  - URL: ${url.protocol}//${url.username ? url.username : ""}:****@${url.host}${url.pathname}`,
    );
  } catch (e) {
    console.log("  - URL: [Hidden/Malformed]");
  }
} else {
  // Use type casting or type guard to access properties safely for logging
  const config = connectionConfig as any;
  console.log(`  - Host: ${config.host}`);
  console.log(`  - Port: ${config.port}`);
  console.log(`  - Database: ${config.database}`);
  console.log(`  - User: ${config.user}`);
}
console.log(`  - SSL: ${useSSL ? "Enabled" : "Disabled"}`);

const pool = new Pool(connectionConfig);

pool.on("connect", () => {
  console.log("✅ Connected to ATS PostgreSQL database");
});

pool.on("error", (err) => {
  console.error("❌ ATS Database pool error:", err.message);
});

let connectionAttempts = 0;
const maxConnectionAttempts = 3;

const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ ATS Database connection test successful");
    client.release();
    connectionAttempts = 0;
  } catch (err: any) {
    connectionAttempts++;
    console.error(
      `❌ ATS Database connection test failed (attempt ${connectionAttempts}/${maxConnectionAttempts}):`,
      err.message,
    );

    if (connectionAttempts < maxConnectionAttempts) {
      console.log(`🔄 Retrying connection in 5 seconds...`);
      setTimeout(testConnection, 5000);
    } else {
      console.error(
        "❌ Max connection attempts reached. ATS Database may be unavailable.",
      );
      console.log(
        "🔔 Application will continue - job listings may not be available.",
      );
    }
  }
};

// Test connection after 1 second
setTimeout(testConnection, 1000);

export default pool;

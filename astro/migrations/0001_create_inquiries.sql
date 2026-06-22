CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  status TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT '',
  service TEXT NOT NULL,
  budget TEXT NOT NULL DEFAULT '',
  deadline TEXT NOT NULL DEFAULT '',
  website TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  additional_information TEXT NOT NULL DEFAULT '',
  ip_address TEXT NOT NULL DEFAULT '',
  ip_country TEXT NOT NULL DEFAULT '',
  user_agent TEXT NOT NULL DEFAULT '',
  gdpr_consent INTEGER NOT NULL DEFAULT 0,
  turnstile_valid INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_ip_created_at ON inquiries(ip_address, created_at DESC);

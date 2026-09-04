CREATE TABLE IF NOT EXISTS inquiry_rate_limit_slots (
  ip_address TEXT NOT NULL,
  window_start INTEGER NOT NULL,
  slot INTEGER NOT NULL CHECK (slot >= 0 AND slot < 5),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (ip_address, window_start, slot)
);

CREATE INDEX IF NOT EXISTS idx_inquiry_rate_limit_slots_created_at
  ON inquiry_rate_limit_slots(created_at);

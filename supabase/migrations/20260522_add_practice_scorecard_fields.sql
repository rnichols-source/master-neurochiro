-- Add Practice Scorecard fields to kpi_entries
-- These enable the 4 Revenue Levers: NP × Conversion% × PVA × CVA

ALTER TABLE kpi_entries
  ADD COLUMN IF NOT EXISTS overhead numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS active_patients integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS corrective_visits integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS wellness_visits integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS reconversions integer DEFAULT 0;

-- Add comments for clarity
COMMENT ON COLUMN kpi_entries.overhead IS 'Monthly overhead costs (rent, staff, insurance, supplies)';
COMMENT ON COLUMN kpi_entries.active_patients IS 'Total active patients seen this period';
COMMENT ON COLUMN kpi_entries.corrective_visits IS 'Visits from corrective care patients';
COMMENT ON COLUMN kpi_entries.wellness_visits IS 'Visits from wellness/maintenance patients';
COMMENT ON COLUMN kpi_entries.reconversions IS 'Corrective care patients who transitioned to wellness this period';

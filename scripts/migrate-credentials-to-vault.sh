#!/bin/bash

# Migrate Existing Service Credentials to Supabase Vault
# This script migrates plaintext API tokens to encrypted vault storage

set -e

echo "🔐 Migrating Service Credentials to Supabase Vault"
echo "=================================================="
echo ""

# Check if psql or Supabase CLI is available
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Install it with:"
    echo "   brew install supabase/tap/supabase"
    exit 1
fi

echo "✓ Supabase CLI found"
echo ""

# Prompt for confirmation
read -p "This will migrate all service credentials to encrypted vault storage. Continue? (y/N): " confirm
if [[ $confirm != [yY] ]]; then
    echo "Migration cancelled"
    exit 0
fi

echo ""
echo "Running migration..."
echo ""

# Run the migration function via Supabase
supabase db execute --sql "SELECT * FROM migrate_existing_credentials();" || {
    echo ""
    echo "⚠️  Direct migration via CLI failed. You can also run this SQL in Supabase dashboard:"
    echo ""
    echo "   SELECT * FROM migrate_existing_credentials();"
    echo ""
    echo "Or using psql:"
    echo ""
    echo "   psql <your-connection-string> -c \"SELECT * FROM migrate_existing_credentials();\""
    echo ""
    exit 1
}

echo ""
echo "✅ Migration complete!"
echo ""
echo "📊 Verification steps:"
echo "   1. Check migrated services:"
echo "      SELECT id, name, credentials_migrated FROM services;"
echo ""
echo "   2. Test credential retrieval:"
echo "      SELECT * FROM get_service_credentials('<customer_id>', 'vercel');"
echo ""
echo "   3. After verification, optionally remove old column:"
echo "      ALTER TABLE services DROP COLUMN platform_api_token;"
echo ""


# exit on error
#set -o errexit

# bundle install
# bundle exec rails db:migrate RAILS_ENV=production
# #RAILS_ENV=production bin/rails db:migrate
# bundle install
# #bundle exec rails db:drop
# bundle exec DISABLE_DATABASE_ENVIRONMENT_CHECK=1 
# bundle exec rails db:reset
# bundle install
# bundle exec rails db:seed

# bundle install
# bundle exec rails assets:precompile
# bundle exec rails assets:clean
# bundle exec rails db:migrate

#if you have seeds to run add:
# bundle exec rails db:seed

#!/bin/bash
set -o errexit

# Install gem dependencies
bundle install

# Run pending database migrations in the production environment
bundle exec rails db:migrate RAILS_ENV=production

# Bypass environment checks and reset the production database
DISABLE_DATABASE_ENVIRONMENT_CHECK=1 bundle exec rails db:reset

# Seed the production database with initial data
bundle exec rails db:seed RAILS_ENV=production

# Optionally, precompile assets and clean old assets (uncomment if needed)
# bundle exec rails assets:precompile
# bundle exec rails assets:clean

# Optionally, run additional migrations if needed (uncomment if needed)
# bundle exec rails db:migrate RAILS_ENV=production

# Optionally, run more seeds if needed (uncomment if needed)
# bundle exec rails db:seed RAILS_ENV=production

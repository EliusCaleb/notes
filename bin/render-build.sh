# exit on error
set -o errexit

bundle install
bundle exec rails db:migrate RAILS_ENV=development 
#bundle exec rails db:drop
bundle exec DISABLE_DATABASE_ENVIRONMENT_CHECK=1 rake db:reset
bundle install
bundle exec rails db:seed

# bundle install
# bundle exec rails assets:precompile
# bundle exec rails assets:clean
# bundle exec rails db:migrate

#if you have seeds to run add:
# bundle exec rails db:seed
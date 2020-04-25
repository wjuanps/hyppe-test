FROM ruby:2.5
RUN apt-get update -qq && apt-get install -y nodejs
RUN mkdir /hyppe-backend-docker
WORKDIR /hyppe-backend-docker
COPY Gemfile /hyppe-backend-docker/Gemfile
COPY Gemfile.lock /hyppe-backend-docker/Gemfile.lock
RUN bundle install
COPY . /hyppe-backend-docker

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["sh", "/entrypoint.sh"]
EXPOSE 33333

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
FROM ruby:2.5
RUN apt-get update -qq && apt-get install -y nodejs
RUN mkdir /hype-backend-docker
WORKDIR /hype-backend-docker
COPY Gemfile /hype-backend-docker/Gemfile
COPY Gemfile.lock /hype-backend-docker/Gemfile.lock
RUN bundle install
COPY . /hype-backend-docker

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
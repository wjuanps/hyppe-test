# Teste Hyppe

Clone the repo in your terminal by clicking the green clone or download button at the top right and copyin the url

```sh
$ git clone https://github.com/wjuanps/hyppe-test.git
```

### System requirements

This project was tested in both

* Linux Mint 19.3 Cinnamon
* Windows 10 Pro

# Hyppe::Rails

Rails specific tasks for Hyppe API v1:

## Getting started

This library aims to support and is tested against the following Ruby implementations:

* Ruby 2.5.1 and 2.6.6
* Rails 4.2.10 and 6.0
* Bundler 2.1.4

To continue make sure you have:

* Ruby installed locally - see the installation guides for Ruby and Rails on [OS X](http://guides.railsgirls.com/install#setup-for-os-x), [Windows](http://guides.railsgirls.com/install#setup-for-windows), and [Linux](http://guides.railsgirls.com/install#setup-for-linux).
* [Bundler](https://bundler.io/) installed locally - run `gem install bundler`.

## Installation

In the backend directory, run the following command to install the gems:

```sh
$ bundle install
```

## Database

The database is running remotely, so it's not necessary any configuration

* adapter: `mysql2`
* host: `sql10.freemysqlhosting.net`
* username: `sql10334989`
* password: `TPN9eEAZzM`
* port: `3306`

## Usage

In the backend directory, run the following command to start the application

```sh
$ rails server -p 3333
```

If you want, you can change the port, but make sure to set the new port in `/frontend/src/services/api.js`


# Hyppe::ReactJS

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started

##### System dependencies

* Node.js 11.x or higher
* npm 6.x or higher
* yarn 1.x or higher (optional)

## Installation

To install all dependencies, in the frontend directory, you can run:

```sh
$ yarn install
```

## Usage

In the frontend directory, run the following command to start the application

```sh
$ yarn start
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Hyppe::API Docs

The api docs was built using [insomnia-documenter](https://www.npmjs.com/package/insomnia-documenter).

## Usage

For easy viewing, click [here](https://wjuan-ps.000webhostapp.com/) to view the api docs in the browser.

## License
[MIT](https://choosealicense.com/licenses/mit/)

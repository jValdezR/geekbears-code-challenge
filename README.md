<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# GeekBears Code Challenge Application by Jesus Valdez

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)

## Introduction

The GeekBears Code Challenge Application is a web service designed to provide URL shortening and user registration/authentication functionalities. It allows users to shorten long URLs, decode short URLs to their original form, and securely register and log in to their accounts.

## Features

- URL shortening and decoding.
- User registration and authentication.
- JWT-based authentication system.
- MongoDB integration for data storage.
- Swagger documentation for the API.

## Getting Started

### Prerequisites

Before you can run the application, make sure you have the following software installed on your machine:

- Node.js 18
- npm (Node Package Manager)
- MongoDB (Make sure MongoDB is running)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jValdezR/geekbears-code-challenge.git
   ```
2. Navigate to the project directory:
  ```bash
  cd geekbears-code-challenge
  ```
3. Install dependencies:
  ```bash
  npm install
  ```
4. Create docker database (Be sure that Docker is installed on you system)
  ```bash
  docker-compose up -d
  ```
5. Create .env file on directory root with the next variables
  ```bash
  DATABASE_URL=mongodb://localhost:27017/geekbears
  JWT_SECRET=your-secret
  ```
6. Start the application
  ```bash
  npm run start
  ```

  ### Usage
  1. Create an user making a POST to
  ```
  localhost:3000/users/login
  ```
  with email and password.

  2. Login the user, with the same email and the same password to the next POST endpoint:
  ```
  localhost:3000/users/signup
  ```
  Copy the token that the request provide you.
  
  3. Now, to encode an URL, make a POST with url and token attributes to:
  ```
  localhost:3000/url-shortener/encode
  ```
  copy the shortURL.

  4. To decode, use the next POST request with token and url (use the short url)
  ```
  localhost:3000/url-shortener/decode
  ```

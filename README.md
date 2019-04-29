# Banka-App
[![Build Status](https://travis-ci.com/AbrahamOssai/Banka-App.svg?branch=develop)](https://travis-ci.com/AbrahamOssai/Banka-App) [![Coverage Status](https://coveralls.io/repos/github/AbrahamOssai/Banka-App/badge.svg?branch=develop)](https://coveralls.io/github/AbrahamOssai/Banka-App?branch=develop) [![Test Coverage](https://api.codeclimate.com/v1/badges/48aed5a305a4af0619c2/test_coverage)](https://codeclimate.com/github/AbrahamOssai/Banka-App/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/48aed5a305a4af0619c2/maintainability)](https://codeclimate.com/github/AbrahamOssai/Banka-App/maintainability)

A web based banking application for mobile and desktop devices

Banka is a light-weight core banking application that powers banking operations like account
creation, customer deposit and withdrawals. This app is meant to support a single bank, where
users can signup and create bank accounts online, but must visit the branch to withdraw or
deposit money.


## Other links

* [UI]()
* [Pivotal Tracker Board]()

### Required Features
* Users can create an sign up and log in.
* Users can create bank account.
* Users can view account transaction history.
* Users can view specific account transaction.
* Staff can debit and credit user account.
* Admin/staff can view all user accounts.
* Admin/staff can view a specific user account.
* Admin/staff can activate or deactivate an account.
* Admin/staff can delete a specific account.
* Admin can create staff and admin user accounts.


## Getting Started
Instructions to get the project running successfully on your website

## Prerequisites
You need to have these installed before cloning the project
* NodeJS (atleast v8.11.2) - https://nodejs.org/en/download/


## Installation

```bash
git clone https://github.com/AbrahamOssai/Banka-App.git
```

```bash
cd Banka
```

```bash
npm install
```

```bash
npm start
```

## Test

Testing is important to checking the performance of the app. Testing is done using Postman and Swaggar.

## Technologies Employed
- [Eslint](https://eslint.org/)
- [Nodejs](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Coveralls](https://coveralls.io/)
- [Babel](https://babeljs.io/)

## Style Guide
[Airbnb JavaScript style guide](https://github.com/airbnb/javascript)


<h3>ENDPOINTS</h3>
<hr>
<table>
  <tr>
      <th>Request</th>
      <th>End Point</th>
      <th>Action</th>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/auth/signup</td>
      <td>Create user account</td>
  </tr>
 <tr>
      <td>POST</td>
      <td>/api/v1/auth/signin</td>
      <td>Login a user</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/accounts</td>
      <td>Create a bank account</td>
  </tr>
  <tr>
        <td>PATCH</td>
        <td>/api/v1//accounts/:accountNumber</td>
        <td>Activate or deactivate an account</td>
  </tr>
  <tr>
        <td>DELETE</td>
        <td>/api/v1/accounts/:accountNumber</td>
        <td>Delete a bank account </td>
  </tr>
   <tr>
        <td>POST</td>
        <td>/api/v1/accounts/:accountNumber/debit</td>
        <td>Debit a bank account</td>
  </tr>
   <tr>
        <td>POST</td>
        <td>/api/v1/accounts/:accountNumber/credit</td>
        <td>Credit a bank account</td>
  </tr>
 

</table>
<br>

## Author
[Ifeanyichukwu Abraham Ossai](https://github.com/AbrahamOssai/Banka-App)

## Acknowledgements
[Andela](https://andela.com)<br>
[Scotch.io](https://scotch.io)<br>
[FreeCodeCamp](https://medium.freecodecamp.com)<br>
[Google](https://google.com)<br>

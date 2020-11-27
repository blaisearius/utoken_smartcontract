UToken
========================

The project "utoken_smartcontract" is dedicated for building UToken's smart contracts. 
The following instructions detail how to clone the project in order to make modifications to it.

Requirements
------------
  * Node JS v12.16.2 or higher;
  * Truffle v5.1.24 or higher;
  * Openzeppelin 3.x.

Installation
------------
1. Fork, clone or download this repository.
2. Run `npm install` if its the initial setup or `npm update`.
```bash
$ cd utoken_smartcontract
$ npm install
```
3. Setup your environment keys in truffle-config 
    
4. Then compile the contracts with `truffle compile` and migrate with `truffle migrate`.
```bash
$ truffle compile
$ truffle migrate
```
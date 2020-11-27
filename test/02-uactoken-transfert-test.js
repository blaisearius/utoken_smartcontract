var UACToken = artifacts.require("./UACToken.sol");

contract('UACToken', (accounts) => {   

    it('transferer des Token depuis le compte administrateur', function(){
        return UACToken.deployed()
        .then((instance) =>{
            UACTokenInstance = instance; 
            return UACTokenInstance.transfer.call(accounts[2], 80000000000); 
        })
        .then(assert.fail).catch((error) =>{
            console.log(error.message)
            assert(error.message.indexOf('revert') >=0, "message doit contenir revert");
            return UACTokenInstance.transfer.call(accounts[1], 9000, {from: accounts[0]});
        })
        .then((successResponse)=>{
            assert.equal(successResponse, true, 'Retourne True comme réponse');
            return UACTokenInstance.transfer(accounts[1], 9000, {from: accounts[0]});
        })
        .then((response)=>{
            assert.equal(response.logs.length, 1, 'Un event enregistré'); 
            assert.equal(response.logs[0].event, 'Transfer', "Il s'agit bien d'un Transfer Event");
            assert.equal(response.logs[0].args._from, accounts[0], "La source du transfert est correcte dans le log");
            assert.equal(response.logs[0].args._to, accounts[1], "La destination du transfert est correcte dans le log");
            assert.equal(response.logs[0].args._value, 9000, "Le montant transféré est correct dans les logs");
            return UACTokenInstance.balanceOf(accounts[1]);
        })
        .then((balance)=>{
            assert.equal(balance.toNumber(), 9000, 'Réception de 9000 sur le compte 2'); 
            return UACTokenInstance.balanceOf(accounts[0]);
        })
        .then( (balance) =>{
            assert.equal(balance.toNumber(), 99991000, "Déduction du montant transféré sur le compte 1");
        })
    });

    it('transférer des Tokens depuis le compte 2', ()=>{
        return UACToken.deployed()
        .then( (UACTokenInstance) => {
            return UACTokenInstance.transfer.call(accounts[1], 2000);
        })
        .then( (result) =>{
            assert.equal(result, true, "Le transfert vers le compte 2.")
        });
    });

})
var UToken = artifacts.require("./UToken.sol");

contract('UToken', (accounts) => {   

    it('transferer des Token sur le compte 2', function(){
        return UToken.deployed()
        .then((instance) =>{
            UTokenInstance = instance; 
            return UTokenInstance.transfer.call(accounts[1], 80000000000); 
        })
        .then(assert.fail).catch((error) =>{
            //console.log(error.message)
            assert(error.message.indexOf('revert') >=0, "message doit contenir revert");
            return UTokenInstance.transfer.call(accounts[1], 9000);
        })
        .then((successResponse)=>{
            assert.equal(successResponse, true, 'Retourne True comme réponse');
            return UTokenInstance.transfer(accounts[1], 9000);
        })
        .then((response)=>{
            assert.equal(response.logs.length, 1, 'Un event enregistré'); 
            assert.equal(response.logs[0].event, 'Transfer', "Il s'agit bien d'un Transfer Event");
            assert.equal(response.logs[0].args.from, accounts[0], "La source du transfert est correcte dans le log");
            assert.equal(response.logs[0].args.to, accounts[1], "La destination du transfert est correcte dans le log");
            assert.equal(response.logs[0].args.value, 9000, "Le montant transféré est correct dans les logs");
            return UTokenInstance.balanceOf(accounts[1]);
        })
        .then((balance)=>{
            assert.equal(balance.toNumber(), 9000, 'Réception de 9000 sur le compte 2'); 
            return UTokenInstance.balanceOf(accounts[0]);
        })
        .then( (balance) =>{
            assert.equal(balance.toNumber(), 99991000, "Déduction du montant transféré sur le compte 1");
        })
    });

    it('Vérifier le solde sur le compte 3 avant transfert', ()=>{
        return UToken.deployed()
        .then( (UTokenInstance) => {
            return UTokenInstance.balanceOf(accounts[2]);
        })
        .then( (result) =>{
            //console.log("Solde du compte 3 avant transfert: ", result); 
            assert.equal(result, 0, "Le solde du compte 3 est : " + result)
        });
    });

    it('transférer des Tokens sur le compte 3', ()=>{
        return UToken.deployed()
        .then( (instance) => {
            UTokenInstance = instance;
            return UTokenInstance.transfer(accounts[2], 5000);
        })
        .then( (response) =>{
            assert.equal(response.logs.length, 1, 'Un event enregistré'); 
            assert.equal(response.logs[0].event, 'Transfer', "Il s'agit bien d'un Transfer Event");
            assert.equal(response.logs[0].args.from, accounts[0], "La source du transfert est correcte dans le log");
            assert.equal(response.logs[0].args.to, accounts[2], "La destination du transfert est correcte dans le log");
            assert.equal(response.logs[0].args.value, 5000, "Le montant transféré est correct dans les logs");
            return UTokenInstance.balanceOf(accounts[2]) ;
        })
        .then( (solde3) =>{
            //console.log("Solde du compte 3 après transfert: ", solde3); 
            assert.equal(solde3, 5000, "Le solde du compte 3 est : " + solde3)
            return UTokenInstance.balanceOf(accounts[0]) ;
        })
        .then( (solde1) =>{
            //console.log("Solde du compte 1 après transfert: ", solde1); 
            assert.equal(solde1, 99986000, "Le solde du compte 1 est: " + solde1)
        });
    });


    it('Vérifier le solde sur le compte 3 après transfert', ()=>{
        return UToken.deployed()
        .then( (UTokenInstance) => {
            return UTokenInstance.balanceOf(accounts[2]);
        })
        .then( (result) =>{
            //console.log("Solde du compte 3 avant transfert: ", result); 
            assert.equal(result, 5000, "Le solde du compte 3 est : " + result)
        });
    });

})
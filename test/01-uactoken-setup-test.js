var UACToken = artifacts.require("./UACToken.sol");

contract('UACToken', (accounts) => {
    var total = 100000000;
    var nom = "UAC Token";
    var code = "UACT";

    // Test if token name is defined
    it('definir le nom du token', () => {
        return UACToken.deployed()
        .then((instance) => {
            UACTokenInstance = instance;
            return UACTokenInstance.name();
        })
        .then((nomToken) =>{
            assert.equal(nomToken, nom, "Le nom du Token est défini.");
        });
    });

    // Test if the token symbol is defined
    it('definir le symbol du token', () =>{
        return UACToken.deployed()
        .then(function(instance){
            UACTokenInstance = instance;
            return UACTokenInstance.symbol();
        })
        .then((symbolToken) =>{
            assert.equal(symbolToken, code, "Le symbol du Token est bien défini.");
        });
    });

    // Test if totalSupply has been defined
    it('vérifier le totalSupply au déploiement', () => {
        return UACToken.deployed()
        .then((UACTokenInstance) => {
            return UACTokenInstance.totalSupply();
        })
        .then((totalSupply) =>{
            assert.equal(totalSupply.toNumber(), total, "Le total est bien défini à" +total);
        });
    });

    // Test if admin balance has been credited.
    it("chager le compte de l'administrateur", function(){
        return UACToken.deployed()
        .then((UACTokenInstance)=>{
            return UACTokenInstance.balanceOf(accounts[0]);
        })
        .then(adminBalance => {
            assert.equal(adminBalance.toNumber(), total, "Le compte de l'admin est chargé avec "+ total);
        });
    });

})
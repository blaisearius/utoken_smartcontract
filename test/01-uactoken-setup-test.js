var UToken = artifacts.require("./UToken.sol");

contract('UToken', (accounts) => {
    var total = 100000000;
    var nom = "UToken";
    var code = "UT";

    // Test if token name is defined
    it('definir le nom du token', () => {
        return UToken.deployed()
        .then((instance) => {
            UTokenInstance = instance;
            return UTokenInstance.name();
        })
        .then((nomToken) =>{
            assert.equal(nomToken, nom, "Le nom du Token est défini.");
        });
    });

    // Test if the token symbol is defined
    it('definir le symbol du token', () =>{
        return UToken.deployed()
        .then(function(instance){
            UTokenInstance = instance;
            return UTokenInstance.symbol();
        })
        .then((symbolToken) =>{
            assert.equal(symbolToken, code, "Le symbol du Token est bien défini.");
        });
    });

    // Test if totalSupply has been defined
    it('vérifier le totalSupply au déploiement', () => {
        return UToken.deployed()
        .then((UTokenInstance) => {
            return UTokenInstance.totalSupply();
        })
        .then((totalSupply) =>{
            assert.equal(totalSupply.toNumber(), total, "Le total est bien défini à" +total);
        });
    });

    // Test if admin balance has been credited.
    it("chager le compte de l'administrateur", function(){
        return UToken.deployed()
        .then((UTokenInstance)=>{
            return UTokenInstance.balanceOf(accounts[0]);
        })
        .then(adminBalance => {
            assert.equal(adminBalance.toNumber(), total, "Le compte de l'admin est chargé avec "+ total);
        });
    });

})
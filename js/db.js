let dbPromised = idb.open("football-app", 1, function(upgradeDb) {
    upgradeDb.createObjectStore("teams", {
      keyPath: "id"
    });
  });

function saveForLater(team){
    dbPromised
        .then(function(db){
            let tx = db.transaction("teams", "readwrite");
            let store = tx.objectStore("teams");
            console.log(team);
            store.add(team);
            return tx.complete;
        })
        .then(function(){
            console.log("Team berhasil di simpan.");
        })
}

function getAll(){
    return new Promise(function(resolve, reject){
        dbPromised
            .then(function(db){
                let tx = db.transaction("teams", "readonly");
                let store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(function(teams){
                resolve(teams);
            });
    });
}

function deleteFromLater(team){
    dbPromised
        .then(function(db){
            let tx = db.transaction("teams", "readwrite");
            let store = tx.objectStore("teams");
            console.log(team);
            store.delete(team);
            return tx.complete;
        })
        .then(function(){
            getSavedTeams();
            console.log("Team berhasil di hapus.");
        })
}

function getById(id){
    return new Promise(function(resolve, reject){
        dbPromised
            .then(function(db){
                let tx = db.transaction("articles", "readonly");
                let store = tx.objectStore("articles");
                return store.get(id);
            })
            .then(function(article){
                resolve(article);
            });
    });
}
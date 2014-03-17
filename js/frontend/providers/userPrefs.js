var udb = openDatabase('userudb', '1.0', 'User Preferences database', 10 * 1024 * 1024);

App.userPrefs = {
    initInisert: function (cb) {
        console.log("initInisert::");
        udb.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS inprogress (videoid TEXT, time INTEGER)');
            cb(tx);
        });
    },
    clear: function () {
        udb.transaction(function (tx) {
            tx.executeSql('DELETE FROM inProgress');
        });
    },
    getItem: function (videoid, callback) {
        console.log("callback: ", callback);
        if (typeof videoid !== 'string') {
            videoid = JSON.stringify(videoid);
        }
        console.log("getting items for: ", videoid);
        udb.transaction(function (tx) {
            console.log("callback: ", callback);
            tx.executeSql('SELECT * FROM inprogress', [], function (tx, results) {
                console.log("inProgressLIsting: ", results);
                //if (results.rows.length) {
                    /*var result = results.rows.item(0).data;

                    if (typeof result !== 'object') {
                        result = JSON.parse(result);
                    }

                    if (result.hasOwnProperty('_TTL') && result._TTL * 1000 < +new Date() - result.saved) {
                        result = false;
                        udb.transaction(function (tx) {
                            tx.executeSql('DELETE FROM ' + provider + ' WHERE key = ?', [key]);
                            console.log('One expired!');
                        });
                    }*/
                    console.log("callback: ", callback);
                    //callback(results);
                /*} else {
                    cb();
                }*/
            }, function (results) {
                // On error
                //callback(results);
            });
        });
    },
    setItem: function (videoid, elapsedTime) {
        if (typeof videoid !== 'string') {
            videoid = JSON.stringify(videoid);
        }

        if (typeof elapsedTime !== 'string') {
            elapsedTime = JSON.stringify(elapsedTime);
        }

        this.initInisert(function(tx){
            console.log("Adding: ", [videoid, elapsedTime.split(".")[0]]);
            tx.executeSql('INSERT INTO inprogress VALUES (?, ?)', [videoid, elapsedTime.split(".")[0]]);
        })

        /*udb.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS ' + provider + ' (key TEXT, data TEXT)');

            //Implementation to check if exist registration in udb and update instead of insert
            //Does a SELECT on Provider
            tx.executeSql('SELECT data FROM ' + provider + ' WHERE key = ?', [key], function (tx, results) {
                if (results.rows.length) {
                    tx.executeSql('UPDATE ' + provider + ' SET data = ? WHERE key = ?', [data, key]);
                } else {
                    tx.executeSql('INSERT INTO ' + provider + ' VALUES (?, ?)', [key, data]);
                }
            });
        });*/
    }
};

var inProgressMovies = (localStorage.PCT_inProgress !== undefined)? JSON.parse(localStorage.PCT_inProgress):{};

App.resumeInfos = {
    clear: function () {
        delete localStorage.PCT_inProgress;
    },
    getItem: function (videoid) {
        var elapsed  = inProgressMovies[videoid];
        console.log("inProgressMovies: ", inProgressMovies);
        return (elapsed !== undefined && elapsed > 0)? elapsed :0;
    },
    setItem: function (videoid, elapsedTime) {
        inProgressMovies[videoid] = parseInt(elapsedTime);
        localStorage.PCT_inProgress = JSON.stringify(inProgressMovies);
        console.log("inProgressMovies: ", inProgressMovies);
    },
    deleteItem: function(videoid) {
        delete inProgressMovies[videoid];
        localStorage.PCT_inProgress = JSON.stringify(inProgressMovies);
    }
};
var userInProgressMovies = (localStorage.PCT_inProgress !== undefined)? JSON.parse(localStorage.PCT_inProgress):{};

App.userPrefs = {
    clear: function () {
        delete localStorage.PCT_inProgress;
    },
    getItem: function (videoid) {
        var elapsed  = userInProgressMovies[videoid];
        console.log("userInProgressMovies: ", userInProgressMovies);
        console.log("elapsed: ", elapsed);
        return (elapsed !== undefined && elapsed > 0)? elapsed :0;
    },
    setItem: function (videoid, elapsedTime) {
        userInProgressMovies[videoid] = parseInt(elapsedTime);
        localStorage.PCT_inProgress = JSON.stringify(userInProgressMovies);
        console.log("userInProgressMovies: ", userInProgressMovies);
    },
    deleteItem: function(videoid) {
        delete userInProgressMovies[videoid];
        localStorage.PCT_inProgress = JSON.stringify(userInProgressMovies);
    }
};
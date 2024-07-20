// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    return moviesArray.map((directors) => directors.director)
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    return moviesArray.filter(movie => {
        return movie.director === "Steven Spielberg" && movie.genre.includes("Drama");
    }).length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    if (moviesArray.length == 0){
        return 0;
    }
    
    const totalScore = moviesArray.reduce((total, movie) => {
        if (!movie.score){
            movie.score = 0;
        }
        return total + movie.score;
    },0)

    const averageScore = totalScore / moviesArray.length;
    return parseFloat(averageScore.toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
const dramaMovies = moviesArray.filter(movie => movie.genre.includes("Drama"));

if (dramaMovies.length === 0){
    return 0;
}
const totalScore = dramaMovies.reduce((total, movie) => {
    if (!movie.score){
        movie.score = 0;
    }
    return total + (movie.score || 0);
},0)
const averageScore = totalScore / dramaMovies.length;
return parseFloat(averageScore.toFixed(2));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    const orderByYearCopy = moviesArray.map((movies) => {
        return {...movies};
        
    });
    
    return orderByYearCopy.sort((a, b) => {
        if (a.year != b.year){
            return a.year - b.year;
        }
        return a.title.localeCompare(b.title);
      });

}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    const copyArray = JSON.parse(JSON.stringify(moviesArray));

    const sortedByTitle = copyArray.sort((a, b) => {
        return a.title.localeCompare(b.title);
    });

    
    const copyArrayTitle = sortedByTitle.map((movie) => movie.title)

    const max20Title = copyArrayTitle.slice(0, 20);
    return max20Title;

}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
const copyOfArray = JSON.parse(JSON.stringify(moviesArray));
const updatedMoviesArray = copyOfArray.map(movie => {
    let hours = 0;
    let minutes = 0;

    const hoursMatch = movie.duration.match(/(\d+)h/);
    if (hoursMatch) {
      hours = parseInt(hoursMatch[1], 10) * 60;
    }

    const minutesMatch = movie.duration.match(/(\d+)min/);
    if (minutesMatch) {
      minutes = parseInt(minutesMatch[1], 10);
    }

    const totalMinutes = hours + minutes;

    return {
      ...movie,
      duration: totalMinutes
    };
  });

  return updatedMoviesArray;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    if (moviesArray.length === 0) {
        return null;
    }
    
    const movieYearArrays = moviesArray.reduce((acc, movie) => {
        if (!acc[movie.year]) {
            acc[movie.year] = { movies: [], scores: [] };
        }
        acc[movie.year].movies.push(movie);
        acc[movie.year].scores.push(movie.score);
        
        return acc;
    }, {});

    const movieAverageYear = Object.keys(movieYearArrays).map((year) => {
        return {
            year: year,
            averageScore: scoresAverage(movieYearArrays[year].movies)
        };
    });
    
    movieAverageYear.sort((a, b) => b.averageScore - a.averageScore); 
    
    const bestYear = movieAverageYear[0];
    return `The best year was ${bestYear.year} with an average score of ${bestYear.averageScore}`;
}


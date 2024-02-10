
function calculateOverallRating(totalRating, numOfReviews) {

    const averageRating = totalRating / numOfReviews;

  
    return averageRating.toFixed(2);
  }

  export {
    calculateOverallRating
  }
export const getSimilarity = (card1,card2) => {
    try{
        dotProduct = getDotProduct(card1,card2);
        mag_1 = getMagnitude(card1);
        mag_2 = getMagnitude(card2);
        return dotProduct / (mag_1 * mag_2)
    } catch (error) {
        console.error(error);
    }
};

export const getSimilarityList = async () => {
    try {
      const response = await Api.get("/api/similarity/view");
      return response.data;
    } catch (error) {
      console.error(error);
    }
};

function getDotProduct(card1, card2){
    result = 0;
    for (var i=0 ; i < card1.length ; i++){
        result += card1[i] * card2[i];
    }
    return result;
}

function getMagnitude(card){
    result = 0;
    for (var i=0 ; i < card.length ; i++){
        result += card[i] * card[i];
    }
    return Math.sqrt(result);
}

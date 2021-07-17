import Api from "./api";

export const getSimilarity = (card1,card2) => {
    try{
        var dotProduct = getDotProduct(card1,card2);
        var mag_1 = getMagnitude(card1);
        var mag_2 = getMagnitude(card2);
        return dotProduct / (mag_1 * mag_2)
    } catch (error) {
        console.error(error);
    }
};

// Method to get a list of all Pokemon
export const getSimilarityList = async () => {
    try {
      const response = await Api.get("/api/kue/liatKue");
      return response.data;
    } catch (error) {
      console.error(error);
    }
};

function getDotProduct(card1, card2){
    var result = 0;
    for (var i=0 ; i < card1.length ; i++){
        result += card1[i] * card2[i];
    }
    return result;
}

function getMagnitude(card){
    var result = 0;
    for (var i=0 ; i < card.length ; i++){
        result += card[i] * card[i];
    }
    return Math.sqrt(result);
}

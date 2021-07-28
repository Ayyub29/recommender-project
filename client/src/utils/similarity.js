import Api from "./api"

// calculate the result of similarity of two vector
// @param two vector
// @result similarity between vector
export const getSimilarity = (vec1,vec2) => {
    try{
        var dotProduct = getDotProduct(vec1,vec2);
        var mag_1 = getMagnitude(vec1);
        var mag_2 = getMagnitude(vec2);
        return dotProduct / (mag_1 * mag_2)
    } catch (error) {
        console.error(error);
    }
};

//calculate dot product of two vector
// @param two vector
// @result dot product of two vector
function getDotProduct(vec1, vec2){
    var result = 0;
    for (var i = 0 ; i < vec1.length ; i++){
        result += vec1[i] * vec2[i];
    }
    return result;
}

//calculate magnitude of a vector
// @param vector
// @result magnitude of a vector
function getMagnitude(vec){
    var result = 0;
    for (var i=0 ; i < vec.length ; i++){
        result += vec[i] * vec[i];
    }
    return Math.sqrt(result);
}

//get similarity matrix in database
export const getSimilarityList = async () => {
    try {
      const response = await Api.get("/api/kue/liatKue");
      return response.data;
    } catch (error) {
      console.error(error);
    }
};

//searching max value of a JSON array
// @param array, array properties
// @result maximum value of an array
export function getMax(arr, prop) {
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}

//searching max value of a regular array
// @param array
// @result maximum value of an array
export function getMaxArr(arr) {
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (max == null || parseInt(arr[i]) > parseInt(max))
            max = arr[i];
    }
    return max;
}

//searching min value of a regular array
// @param array
// @result minimum value of an array
export function getMinArr(arr) {
    var min;
    for (var i=0 ; i<arr.length ; i++) {
        if (min == null || parseInt(arr[i]) < parseInt(min))
            min = arr[i];
    }
    return min;
}

//searching mean value of a regular array
// @param array
// @result mean value of an array
export function getMeanArr(arr) {
    var sum = 0;
    for (var i=0 ; i < arr.length ; i++) {
        sum += parseInt(arr[i]);
    }
    return sum/(arr.length);
}

// get similarity of program based on click tracker and similarity matrix
// @param click tracker, similarity matrix
// @result similarity of program based on click tracker
export function getSimilarityScore(tracker,similarity_matrix){
    var score = []; //similarity matrix
    var score_sum = [0,0,0,0,0,0]; //sum of similarity score matrix

    for (var j in tracker){
        var sim_sum = []; //one row of similarity matrix
        for (var i in similarity_matrix){
            sim_sum.push(similarity_matrix[j][i] * tracker[j]); 
        }
        score.push(sim_sum);
    }
    for (var k in score){
        for (var l in score){
            score_sum[k] += score[l][k]; 
        }
    }
    return score_sum;
}

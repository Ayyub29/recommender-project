// List of function to control Tracker Cookies 
import { getSimilarity, getSimilarityList,getMax,getMaxArr,getMeanArr,getMinArr,getSimilarityScore}  from "./similarity";

//function to get a cookie
//@param cookies name
//@result cookies
export const get_cookies = (cname) => {
    try{
        const cookies = Object.fromEntries(
            document.cookie.split(/; /).map(c => {
            const [key, v] = c.split('=', 2);
            return [key, decodeURIComponent(v)];
            }),
        );
        return cookies[cname] || '';
    } catch (error) {
        console.error(error);
    }
};

//function to create a cookie
//@param cookies name, cookies value, expiration date
//@result cookies
export const create_cookies = (name,value,days) => {
    try{
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    } catch (error) {
        console.error(error);
    }
}

//function to update cookies value after updating program
//@param cookies name, program id
//@result new updated cookies
export const set_cookies = (cname,i) => {
    try{
        const cookies = Object.fromEntries(
            document.cookie.split(/; /).map(c => {
            const [key, v] = c.split('=', 2);
            return [key, decodeURIComponent(v)];
            }),
        );
        var val = cookies[cname].split("a");
        var newval = parseInt(val[i]) + 1;
        val[i] = newval.toString();
        createkue(cname,val.join("a"),365);
    } catch (error) {
        console.error(error);
    }
};

//function to create click tracker cookies
//@result new cookies with 0 click on every program separated with `a`.
export function createTracker(){
    let Cookies = get_cookies("khongguan");
    if (Cookies == "" || Cookies == null || Cookies == undefined) {
        create_cookies("khongguan","0a0a0a0a0a0",365);
    }
}

//function to create standardized value of tracker cookies
// @param cookies
// @result standardized value of tracker cookies
export function prepareToken(token){
    var click_value = token.split("a");
    var standardized_value = [0,0,0,0,0,0];
    var max = getMaxArr(click_value);
    var min = getMinArr(click_value);
    var mean = getMeanArr(click_value);
    for (var i in click_value){
        standardized_value[i] = ((click_value[i] - mean) / (max-min)).toFixed(3);
    }
    return standardized_value;
}
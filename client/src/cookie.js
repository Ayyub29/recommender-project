export const getKue = (cname) => {
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

export const createkue = (name,value,days) => {
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

export const setKue = (cname,i) => {
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
        console.log("Jualannya laku 1")
    } catch (error) {
        console.error(error);
    }
};
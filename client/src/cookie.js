export const getCookie = async(cname) => {
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

export const setCookie = async(name,value,days) => {
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
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

function getDotProduct(list, list){
    
}
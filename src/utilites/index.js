export function generateResponse(success, message, data, res){
    res.json({success, message, data});
}
export function getCurrentTimestamp(){
    let date = new Date();
    return date.getTime();
}
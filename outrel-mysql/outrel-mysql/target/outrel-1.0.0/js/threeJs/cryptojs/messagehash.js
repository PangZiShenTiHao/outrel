/*
depends on CryptoJS v3.1.2

*/
/***aes encrypt***/
function encryptAes(word,serverkey){  
    var key = CryptoJS.enc.Utf8.parse(serverkey);   
    var srcs = CryptoJS.enc.Utf8.parse(word);  
    var encrypted = CryptoJS.RC4.encrypt(srcs, key, {mode:CryptoJS.mode.ECB});  
    return encrypted.toString();  
}  
/***aes decrypt***/
function decryptAes(word,serverkey){  
    var key = CryptoJS.enc.Utf8.parse(serverkey);   
	var srcs = CryptoJS.enc.Utf8.parse(word);  
    var decrypt = CryptoJS.RC4.decrypt(word, key, { mode:CryptoJS.mode.ECB});  
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();   
} 
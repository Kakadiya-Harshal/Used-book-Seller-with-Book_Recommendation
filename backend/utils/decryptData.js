import CryptoJS from 'crypto-js';


// console.log(secretKey);
const decryptData = (encryptedObj) => {
    const secretKey = process.env.CRYPTO_SECRET_KEY
    const bytes = CryptoJS.AES.decrypt(encryptedObj, process.env.CRYPTO_SECRET_KEY);
    const decryptedObj = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedObj;
}

export default decryptData;
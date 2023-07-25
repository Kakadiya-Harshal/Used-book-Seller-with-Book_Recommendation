import CryptoJS from 'crypto-js';
const secretKey = process.env.REACT_APP_SECRET_KEY;

const encryptData = (dataObj) => {
    const objStr = JSON.stringify({ ...dataObj });
    const encryptedObj = CryptoJS.AES.encrypt(objStr, secretKey).toString();
    return encryptedObj;
}

export default encryptData;
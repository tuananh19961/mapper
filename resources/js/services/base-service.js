import axios from 'axios';

const getTakenData = async(url) => {
    try {
        const result = await axios.get(url);
        return result;
    } catch (e) {
        throw e;
    }
};

const getDataByID = async(url, id) => {
    try {
        const result = await axios.get(`${url}/${id}`);
        return result;
    } catch (e) {
        throw e;
    }
};

const formatCurrency = (price) => {
    price = price.toLocaleString('vi', {
        style: 'currency',
        currency: 'VND'
    });
    return price;
}

const to_slug = (str) => {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');

    // return
    return str;
}

// FORMAT PHONE NUMBER
const formatPhone = (text) => {
    text = text.replace(/(\d{4})(\d{3})(\d{3})/, "$1.$2.$3");
    return text;
}

export {
    getTakenData,
    getDataByID,
    formatCurrency,
    to_slug,
    formatPhone
};
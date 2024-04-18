const readToken = () => {
    try {
        const user = JSON.parse(localStorage.getItem('userToken'));
        return user;
    } catch (error) {
        return null;
    }
};

export default readToken;
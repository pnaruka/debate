const readToken = () => {
    try {
        const user = JSON.parse(localStorage.getItem('user-auth'));
        return user;
    } catch (error) {
        return null;
    }
};

export default readToken;
const normalizeUser = (user) => {
    if (!user.image) {
        user.image = {};
    };
    if (!user.name) {
        user.name = {};
    }
    user.image = {
        url:
            user.image.url || user.url ||
            "https://cdn.pixabay.com/photo/2020/04/07/17/01/chicks-5014152_960_720.jpg",
        alt: user.image.alt || user.alt || "yellow fluffy chickens",
    };
    delete user.alt;
    delete user.url;
    user.name = {
        first: user.name.first || user.first,
        middle: user.name.middle || user.middle || "",
        last: user.name.last || user.last,
    };
    delete user.first;
    delete user.last;
    delete user.middle;
    return {
        ...user,
        address: {
            ...user.address,
            state: user.address.state || "",
        },
    };
};

module.exports = normalizeUser;
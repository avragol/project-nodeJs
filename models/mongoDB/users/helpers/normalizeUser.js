const normalizeUser = (user) => {
    if (!user.image) {
        user.image = {};
    };
    if (!user.name) {
        user.name = {};
    }
    user.image = {
        url:
            user.image.url ||
            "https://cdn.pixabay.com/photo/2020/04/07/17/01/chicks-5014152_960_720.jpg",
        alt: user.image.alt || "yellow fluffy chickens",
    };
    delete user.alt;
    delete user.url;
    user.name = {
        firstName: user.firstName,
        lastName: user.lastName,
    };
    delete user.firstName;
    delete user.lastName;
    if (user.middleName) {
        user.name.middleName = user.middleName;
        delete user.middleName;
    }
    return {
        ...user,
        address: {
            ...user.address,
            state: user.address.state || "",
        },
    };
};

module.exports = normalizeUser;
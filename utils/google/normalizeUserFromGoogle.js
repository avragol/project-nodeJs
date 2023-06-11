const normalizeUserFromGoogle = ({ email, given_name, family_name, picture }) => {
    return {
        name: {
            first: given_name,
            last: family_name
        },
        email: email,
        image: {
            url: picture,
            alt: "profile image from google"
        },
        password: "AaBbCc9!",
        phone: "050-0000000",
        address: {
            country: "defualt",
            city: "address",
            street: "for google user",
            houseNumber: 156
        }
    }
};

module.exports = normalizeUserFromGoogle;
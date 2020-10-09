enum UserType {
    anonymous,
    customer,
    shopOwner,
}
export default UserType;

export const UserTypeUtils = {
    
    getDisplayed: (type: UserType) => {
        switch (type) {
            case UserType.anonymous: return "Anonymous";
            case UserType.customer: return "Customer";
            case UserType.shopOwner: return "Shop Owner";
        }
    },
};
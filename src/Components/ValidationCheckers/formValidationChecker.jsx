export default function formValidationChecker(event) {
    var { name, value } = event.target
    switch (name) {
        case "name":
        case "subject":
        case "username":
        case "color":
        case "profession":
            if (value.length === 0)
                return name + " field must required"
            else if (value.length < 3 || value.length > 50)
                return name + " field must contains atleast 3 character and must be less then 50 characters"
            else
                return ""
        case "size":
            if (value.length === 0)
                return name + " field must required"
            else if (value.length > 10)
                return name + " field must contains less then 10 characters"
            else
                return ""
        case "baseprice":
            if (!value)
                return name + " field must required"
            else if (value < 1)
                return "Base Price Must Greater then 0"
            else
                return ""
        case "star":
            if (!value)
                return name + " field must required"
            else if (value < 1 || value > 5)
                return "Star Must be greater the equal to 1 and less then equal to 5"
            else
                return ""
        case "discount":
            if (!value)
                return name + " field must required"
            else if (value < 0 || value > 100)
                return "Discount Must be Greater then 0 && Less Then 100"
            else
                return ""

        case "message":
            if (value.length === 0)
                return name + " field must required"
            else if (value.length < 50)
                return name + " field must contains atleast 50 characters"
            else
                return ""

        case "email":
            if (value.length === 0)
                return name + " field must required"
            else if (value.length < 13 || value.length > 50)
                return name + " field must contains atleast 13 character and must be less then 50 characters"
            else
                return ""

        case "password":
            if (value.length === 0)
                return name + " field must required"
            else if (value.length < 8 || value.length > 50)
                return name + " field must contains atleast 8 character and must be less then 50 characters"
            else
                return ""

        case "phone":
            if (value.length === 0)
                return name + " field must required"
            else if (value.length !== 10)
                return name + " field must contains 10"
            else if (value[0] >= "0" && value[0] <= "5")
                return "Invalid Phone Number"
            else
                return ""
        default:
            return ""
    }
}
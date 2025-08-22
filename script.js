// login 
document.getElementById("loginbtn").addEventListener("click", function(e) {
    e.preventDefault();

    // correct credentials
    const mobileNumber = 12345678910;
    const pinNumber = 1234;

    // user input
    const mobileNumberValue = document.getElementById("mobile").value;
    const mobileNumberValueConverted = parseInt(mobileNumberValue);

    const pinNumberValue = document.getElementById("pin").value;
    const pinNumberValueConverted = parseInt(pinNumberValue);

    console.log(mobileNumberValueConverted, pinNumberValueConverted);

    // check login
    if (mobileNumberValueConverted === mobileNumber && pinNumberValueConverted === pinNumber) {
        
        window.location.href = "./main.html";
    } else {
        
        alert("Invalid mobile number or PIN. Try again.");
    }
});

const lengthSlider = document.querySelector(".pass-length input")
const SliderValue = document.querySelector(".pass-length .details span")
const options = document.querySelectorAll(".option input")
const generateButton = document.querySelector(".generatePassword")
const Inputbox = document.querySelector(".input-box input")
const passwordIndicator = document.querySelector(".pass-indicator")
const copyBtn = document.querySelector(".copyicon");

function UpdateLengthSlider() {
    SliderValue.innerHTML = lengthSlider.value
    randomPasswordgenerator()
    UpdatePasswordIndicator()
}

const characters = {
    lowercase : 'abcdefghijklmnopqrstuvwxyz',
    uppercase : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers : '123456789',
    symbols : '!@#$%^&*()_<>?~+-:;|{}[]'
}

const randomPasswordgenerator = () =>{
    passlength = lengthSlider.value;
    let randomPassword = "";
    let staticPassword = "";
    let excludeDuplicate = false;

    options.forEach((option)=>{
        if(option.checked){
           if(option.id !== "exc-duplicate" && option.id !== "spaces"){
            staticPassword += characters[option.id]
           }
           else if (option.id === "spaces"){
               staticPassword += `  ${staticPassword}  `
           }
           else{
               excludeDuplicate = true;
           }
        }
    })
    for(let i=0;i<passlength;i++){
        let randomChar = staticPassword[Math.floor(Math.random()*staticPassword.length)]
        if(excludeDuplicate){
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar :i--;
        }
        else{
            randomPassword += randomChar;
        }
    }
    Inputbox.value = randomPassword;
}
 
const UpdatePasswordIndicator = ()=>{
    passwordIndicator.id = lengthSlider.value<=8 ? "weak" : lengthSlider.value <= 11 ?"medium" : "strong"
    if(lengthSlider.value<=8){
        Swal.fire({
            title: 'Minimum length of the password should be greater than 8 !!',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
    }
}

const copyToClipboard = ()=>{
    // console.log("copyToClipboard");
    Swal.fire({
        title: "Do you want to copy the quote?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes!",
        denyButtonText: `Don't Copy`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Copied!", "", "success");
          navigator.clipboard.writeText(Inputbox.value);
          Inputbox.value = ""
        } else if (result.isDenied) {
          Swal.fire("Not Copied!", "", "info");
        }
      })
}

lengthSlider.addEventListener("input",()=>{
    UpdateLengthSlider();
})
generateButton.addEventListener("click",()=>{
    randomPasswordgenerator();
    UpdatePasswordIndicator();
})
copyBtn.addEventListener("click",()=>{
    copyToClipboard();
})


let state=false;
let password=document.getElementById('password');
let passwordStrength=document.getElementById('password-strength');
let lowerUpperCase= document.querySelector('.low-upper-case i');
let number=document.querySelector('.one-number i');
let specialChar=document.querySelector('.one-special-char i');
let sevenChar=document.querySelector('.seven-character i');

function myFunction(show){
    show.classList.toggle('fa-eye-slash');
}

function toggle(){
    if(state){
        password.setAttribute("type", "password");
        state=false;
    }
    else{
        password.setAttribute("type","text");
        state=true;
    }
}
password.addEventListener('keyup', function(){
    let pass=password.value;
    checkStrength(pass);
})
let strength=0;
function checkStrength(password){


    //if password contain lower and upper case character
    if(password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)){
        strength+=1;
        lowerUpperCase.classList.remove('fa-circle');
        lowerUpperCase.classList.add('fa-check');
        console.log(strength)
    }
    else{
        lowerUpperCase.classList.add('fa-circle');
       lowerUpperCase.classList.remove('fa-check')
   }

    //if password has a number
    if(password.match(/([0-9])/)){
        strength+=1;
        number.classList.remove('fa-circle');
        number.classList.add('fa-check');
    }
    else{
        number.classList.add('fa-circle');
        number.classList.remove('fa-check');
    }
    if(password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)){
        strength+=1;
        specialChar.classList.remove('fa-circle');
        specialChar.classList.add('fa-check');
    }
    else{
        specialChar.classList.add('fa-circle');
        specialChar.classList.remove('fa-check');
    }

    if(password.length>=7){
        strength+=1;
        sevenChar.classList.remove(('fa-circle'));
        sevenChar.classList.add('fa-check');
    }
    else{
        sevenChar.classList.add('fa-circle');
        sevenChar.classList.remove('fa-check');
    }
    if(strength==0){
        passwordStrength.style= 'width:0%';
    }
    else if(strength==2){
        passwordStrength.classList.remove('progress-bar-warning');
        passwordStrength.classList.remove('progress-bar-success');
        passwordStrength.classList.add('progress-bar-danger');
        passwordStrength.style='width:10%';
    }
    else if(strength==3){
        passwordStrength.classList.remove('progress-bar-success');
        passwordStrength.classList.remove('progress-bar-danger');
        passwordStrength.classList.add('progress-bar-warning');
        passwordStrength.style='width:60%';
    }
    else if(strength==4){
        passwordStrength.classList.remove('progress-bar-danger');
        passwordStrength.classList.remove('progress-bar-warning');
        passwordStrength.classList.add('progress-bar-success');
        passwordStrength.style='width:100%';
    }

}
function manage(password) {
    var bt = document.getElementById('registerBTN');
    if (strength>6) {
        bt.disabled = false;
    }
    else {
        bt.disabled = true;
    }
}

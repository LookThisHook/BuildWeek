const checkProceed = document.getElementById('proceedCheck');

document.getElementById("proceedButton").addEventListener("click",function(e) {
    if(checkProceed.checked === true) {
        //document.getElementById("errorProceded").classList.remove("isDisplay");
        location.href="exame.html";
        console.log(checkProceed.checked);
    }
    else {
        document.getElementById("errorProceded").classList.add("isDisplay");
        console.log("error");
    }
});
const darkmodeToggle = document.getElementById("toggle-darkmode");

darkmodeToggle.addEventListener("click", () => {
   const isDarkmode = document.documentElement.classList.toggle("dark");
   localStorage.setItem("darkmode", JSON.stringify(isDarkmode));
})

function getDarkmodeValue(){
    const darkmodeValue = JSON.parse(localStorage.getItem("darkmode"));
    return darkmodeValue === true;
}

if (getDarkmodeValue()){
    document.documentElement.classList.add("dark");
} else {
    document.documentElement.classList.remove("dark");
}

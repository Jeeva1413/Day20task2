//getting api 
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

//Getting elements 
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

//Adding event listener for button
btn.addEventListener("click", () => {

    //getting search box value
    let inpWord = document.getElementById("inp-word").value;

    //API call 
    fetch(`${url}${inpWord}`)

    //Converting readable steam into json
        .then((response) => response.json())
        
        //Handling the ata 
        .then((data) => {
            console.log(data);

            //Appending the result 
            result.innerHTML = `
            <div class="word">
            <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                    <h3>${inpWord}</h3>
                </div>
                <div class="details">
                    <p>Part Of Speech : ${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                Definition : ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                Example : ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
                if(data[0].phonetics[0].audio===""){
                    sound.setAttribute("src", data[0].phonetics[1].audio);
                }else{
                    sound.setAttribute("src", data[0].phonetics[0].audio);
                }
                
                
        })

        //Error handling
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});

//Calling audio function
function playSound() {
    sound.play();
}
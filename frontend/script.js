const questionInput = document.getElementById("question");
const btn = document.getElementById('btn');
const answer = document.getElementById('answer');


// btn.addEventListener("click", () => {
//     alert("button clicked");
// })

btn.addEventListener("click", async () => {
    const question = questionInput.value;
    if ( !question) return;

    answer.textContent = "Thinking...";

    try {
        const response = await fetch("/api/ask", {
            method: "POST",
            headers: { "Content-type": "application/json"},
            body: JSON.stringify({ question })
        });

        const data = await response.json();
        console.log(data)
        answer.textContent = data.answer;
    } catch (err) {
        answer.textContent = "something went wrong";
        console.log(err)
    }
})


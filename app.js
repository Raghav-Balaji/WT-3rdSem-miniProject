//background image slider

const sliderImgs = ["img1.jpg", "img2.cms", "img3.jpg", "img4.jpg", "img5.jpeg", "img6.png"];
let sliderImage = document.querySelector('.background-image');
let sliderGrids = [...document.querySelectorAll('.grid-item')];

let currentImage = 0;

setInterval(() => {
    changeSliderImage();
}, 5000);

const changeSliderImage = () => {
    sliderGrids.map((gridItem, index) => {
        setTimeout(() => {
            gridItem.classList.remove('hide');

            setTimeout(() => {

                if(index == sliderGrids.length - 1){
                    if(currentImage >= sliderImgs.length - 1){
                        currentImage = 0;
                    } else{
                        currentImage++;
                    }

                    sliderImage.src = `img/${sliderImgs[currentImage]}`;

                    sliderGrids.map((item, i) => {
                        setTimeout(() => {
                            item.classList.add('hide')
                        }, i * 100);
                    })

                }

            }, 100);

        }, index * 100);
    })
}

function showCreateAccount() {
    document.getElementById("create-account").classList.remove("hidden");
}

document.getElementById("createAccountForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    const messageElement = document.getElementById("create-account-message");
    if (response.status === 201) {
        messageElement.textContent = data.message;
        messageElement.style.color = 'green';
        setTimeout(() => {
            window.location.href = "itinerary.html";
        }, 2000);
    } else {
        messageElement.textContent = data.message;
        messageElement.style.color = 'red';
    }
});

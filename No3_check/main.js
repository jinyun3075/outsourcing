document.addEventListener("DOMContentLoaded", function() {
    const tileButtons = document.querySelectorAll(".tile-button");
    const question2 = document.querySelector(".question-2");
    const widthInput = document.getElementById("width");
    const heightInput = document.getElementById("height");
    const resultButton = document.querySelector(".result-btn a");
    const resultText = document.getElementById("result-text");
    const resultSection = document.querySelector(".content-footer");

    tileButtons.forEach(button => {
        button.addEventListener("click", function() {
            tileButtons.forEach(btn => btn.classList.remove("click"));

            this.classList.add("click");

            question2.style.display = "block";
        });
    });
    
    function checkInputs() {
        if (widthInput.value && heightInput.value) {
            resultButton.style.display = "block";
        } else {
            resultButton.style.display = "none";
        }
    }

    widthInput.addEventListener("input", checkInputs);
    heightInput.addEventListener("input", checkInputs);

    resultButton.addEventListener("click", function() {
        const tileButton = document.querySelector(".tile-button.click");
        const width = (Math.floor((widthInput.value / tileButton.dataset.tile) * 10) / 10).toFixed(1)
        const height = (Math.floor((heightInput.value / tileButton.dataset.tile) * 10) / 10).toFixed(1);
        let res_width = 0;
        let res_height = 0;

        let firstWidthDecimal = Math.floor(width * 10) % 10;
        let firstHeightDecimal = Math.floor(height * 10) % 10;
        if (firstWidthDecimal >= 3) {
            res_width = Math.ceil(width);
        } else {
            res_width = Math.floor(width);
        }
        if (firstHeightDecimal >= 3) {
            res_height = Math.ceil(height);
        } else {
            res_height = Math.floor(height);
        }        
        
        // 위 면적에 필요한 <br><b>스토니 </b>데크타일은 <br>총 <b>40P </b>입니다.
        resultText.innerHTML = `위 면적에 필요한 <br><b style="color:#8C0E03">${tileButton.dataset.content} </b>데크타일은 <br>총 <b style="color:#8C0E03">${res_width*res_height}P</b> 입니다.`;
        
        // 결과 섹션 보이기
        resultSection.style.display = "block";
    });
});

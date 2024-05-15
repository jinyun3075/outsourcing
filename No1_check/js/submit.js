document.addEventListener("DOMContentLoaded", function() {
    const MAX_ADDITIONAL_INPUTS = 5;
    const addMoreButtons = document.querySelectorAll('.add-more');

    addMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            const additionalInputs = document.querySelector(`.${category}-additional`).querySelectorAll('input[type="text"]');

            if (additionalInputs.length < MAX_ADDITIONAL_INPUTS) {
                const additionalInput = document.createElement('div');
                additionalInput.classList.add('form-group');
                additionalInput.innerHTML = `
                    <input type="text" name="${category}-additional-${additionalInputs.length}" th:field="*{${category}}" required>
                    <span class="delete-input" onclick="deleteInput(this)">삭제</span>
                `;
                document.querySelector(`.${category}-additional`).appendChild(additionalInput);
            }

            if (additionalInputs.length >= MAX_ADDITIONAL_INPUTS - 1) {
                this.style.display = 'none'; // Hide add-more button if max inputs reached
                alert('최대 5개까지만 추가 가능합니다.');
            }
        });
    });
});

function deleteInput(element) {
    const inputToDelete = element.parentNode;
    inputToDelete.parentNode.removeChild(inputToDelete);
}

// 알림 모달 열기 함수
function openNotificationModal() {
    var modal = document.getElementById("notificationModal");
    modal.style.display = "block";
}

// 알림 모달 닫기 함수
function closeNotificationModal() {
    var modal = document.getElementById("notificationModal");
    modal.style.display = "none";
}
let currentTab = 0;

function showTab(index) {
    const tabs = document.querySelectorAll('#tabContent > div');
    const tabMenuItems = document.querySelectorAll('#tabMenu li');
    tabs.forEach((tab, i) => {
        tab.classList.toggle('hidden', i !== index);
        tabMenuItems[i].classList.toggle('active', i === index);
    });

    currentTab = index;

    document.querySelector('.btnWrap .gray').style.display = index === 0 ? 'none' : 'inline-block';
    document.querySelector('.btnWrap .pink').style.display = index === tabs.length - 1 ? 'none' : 'inline-block';
    document.querySelector('#submitBtn').style.display = index === tabs.length - 1 ? 'inline-block' : 'none';
}

function nextTab() {
    if (validateTab(currentTab)) {
        showTab(currentTab + 1);
    } else {
        alert("모든 질문에 응답해 주세요.");
    }
}

function prevTab() {
    showTab(currentTab - 1);
}

function submitForm() {
const tabs = document.querySelectorAll('#tabContent > div');
for (let i = 0; i < tabs.length; i++) {
    if (!validateTab(i)) {
        alert("모든 질문에 응답해 주세요.");
        return;
    }
}
document.getElementById("surveyForm").submit();
}

function validateTab(index) {
    const currentTabInputs = document.querySelectorAll(`#tabContent > div:nth-child(${index + 1}) input`);
    return Array.from(currentTabInputs).some(input => input.checked);
}

document.addEventListener("DOMContentLoaded", function() {
    showTab(0);
});
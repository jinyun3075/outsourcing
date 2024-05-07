const signInButton = document.getElementById('signIn');
const signUpButton = document.getElementById('signUp');

const signInContainer = document.getElementById('sign-in-container');
const signUpContainer = document.getElementById('sign-up-container');

const signUpOverlay = document.getElementById('sign-up-overlay');
const signInOverlay = document.getElementById('sign-in-overlay');

signInButton.addEventListener('click', () => {
    signUpContainer.classList.add('on');
    signUpOverlay.classList.add('on');
    
    signInContainer.classList.remove('on');
    signInOverlay.classList.remove('on');
});

signUpButton.addEventListener('click', () => {
    signInContainer.classList.add('on');
    signInOverlay.classList.add('on');

    signUpContainer.classList.remove('on');
    signUpOverlay.classList.remove('on');
});

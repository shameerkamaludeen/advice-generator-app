const btnElement = document.querySelector('.section-advice button');

btnElement.addEventListener('click', generateAdvice);

function generateAdvice() {
    const idElement = document.querySelector('.section-advice .advice-id span');
    const advice = document.querySelector('.section-advice .advice')

    // Spinner
    advice.classList.add('loading');
    advice.textContent = 'Loading...';

    fetchAdvice()
        .then(json => {
            advice.classList.remove('loading');
            idElement.textContent = `Advice #${json.slip.id}`;
            advice.textContent = `"${json.slip.advice}"`;

            /* Disabling the button for 2 seconds as the API will return the same
               when requesting again within 2 seconds */
            btnElement.setAttribute('disabled', '');
            setTimeout(() => {
                btnElement.removeAttribute('disabled');
            }, 2000)
        })
        .catch(e => alert(e));
}

async function fetchAdvice() {
    let response = await fetch('https://api.adviceslip.com/advice');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

// Initial default call
generateAdvice();
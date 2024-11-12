
function showElement(selector) {
    const element = document.querySelector(selector);
    
    if (!element) {
        console.error(`Elemento não encontrado: ${selector}`);
        return;
    }

    element.style.visibility = 'visible';
    element.style.opacity = '1';
    element.style.transform = 'translateX(0)'; 
}

function showDescription() {
    showElement('.description');
}

function showRowServices() {
    showElement('.rowservices_one');
}

function showColumnGeneries() {
    showElement('.columngerencies');
}

function showButton() {
    showElement('.botao');
}


function showcolumnoque() {
    showElement('.columnoque');
}

function showlistheadingfour() {
    showElement('.listheadingfour');
}

/* /Secao container de informacoes O Que oferececemos/ */
function showescalabilidade () {
    showElement('.escalabilidade');
}

function showcolumnseguranae () {
    showElement('.columnseguranae');
} 

function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 && 
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) 
    );
}

/* /funcao item surgindo na tela / */

document.addEventListener('mousemove', function() {
    showDescription();
    showescalabilidade();
    setTimeout(showcolumnseguranae, 9000);
    setTimeout(showcolumnoque, 8000);
    setTimeout(showRowServices, 800); 
    setTimeout(showColumnGeneries, 1600); 
    setTimeout(showButton, 2400); 
}, { once: true });

window.addEventListener('scroll', function() {
    const listHeadingFour = document.querySelector('.listheadingfour');
    if (listHeadingFour && isElementInViewport(listHeadingFour)) {
        showlistheadingfour();
        window.removeEventListener('scroll', arguments.callee);
    }
});



const listHeadingFour = document.querySelector('.listheadingfour');
if (listHeadingFour) {
    listHeadingFour.style.cursor = 'pointer'; // Muda o cursor para ponteiro

    listHeadingFour.addEventListener('click', function() {
        const row_two = document.querySelector('.row_two'); 
        if (row_two) {
            row_two.scrollIntoView({ behavior: 'smooth' }); 
        }
    });
}

const row_two = document.querySelector('.row_two');
if (row_two) {
    row_two.style.cursor = 'pointer'; // Muda o cursor para ponteiro

    row_two.addEventListener('click', function() {
        const columnoque = document.querySelector('.columnoque');
        if (columnoque) {
            columnoque.scrollIntoView({ behavior: 'smooth' }); 
        }
    });
}


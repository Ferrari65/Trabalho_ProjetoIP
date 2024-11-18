
const contatoMenuItem = document.querySelector('.nav_list li a[href="#footer"]');
const footer = document.querySelector('#footer');


contatoMenuItem.addEventListener('click', function(event) {
    event.preventDefault(); 

    footer.scrollIntoView({
        behavior: 'smooth'
    });
});

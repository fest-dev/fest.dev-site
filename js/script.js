new WOW().init();

const reviews = new Swiper('.reviews', {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 30,
    navigation: {
        nextEl: '.reviews-control.next',
        prevEl: '.reviews-control.prev',
    },
    breakpoints: {
        1080: {
            slidesPerView: 3,
        },
        768: {
            slidesPerView: 2,
        }
    }
});

function setEqualHeight() {
    var reviews = document.querySelectorAll('.review');
    var maxHeight = 0;

    reviews.forEach(function(review) {
        review.style.height = 'auto';
    });

    reviews.forEach(function(review) {
        var reviewHeight = review.offsetHeight;
        if (reviewHeight > maxHeight) {
            maxHeight = reviewHeight;
        }
    });

    reviews.forEach(function(review) {
        review.style.height = maxHeight + 'px';
    });

    updateButtonPosition(maxHeight);
}

function updateButtonPosition(maxHeight) {
    var button1 = document.querySelector('.reviews-control.prev');
    var button2 = document.querySelector('.reviews-control.next');
    button1.style.top = (maxHeight / 2 - button1.offsetHeight / 2) + 'px';
    button2.style.top = (maxHeight / 2 - button2.offsetHeight / 2) + 'px';
}

window.addEventListener('load', setEqualHeight);

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('review__more')) {
        var reviewText = e.target.previousElementSibling;
        var review = e.target.closest('.review');
        
        if (!reviewText.classList.contains('expanded')) {
            reviewText.classList.add('expanded');
            review.style.height = 'auto';
            e.target.textContent = 'Read Less';
        } else {
            reviewText.classList.remove('expanded');
            setEqualHeight(); 
            e.target.textContent = 'Read More';
        }
    }
});

window.addEventListener('resize', setEqualHeight);

document.addEventListener('click', function(e) {
    if (e.target.closest('.copy-btn')) {
        var copyBtn = e.target.closest('.copy-btn');
        var listItem = copyBtn.closest('li');
        var link = listItem.querySelector('a');
        
        if (link) {
            navigator.clipboard.writeText(link.textContent).then(function() {
                console.log('Copied');
            }).catch(function(err) {
                console.error('Error: ', err);
            });
        }
    }
});

let swiper;
function initializeSwiper() {
    if (window.innerWidth < 768 && !swiper) {
        swiper = new Swiper('#advantages .swiper', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
            navigation: {
                nextEl: '.advantages-next',
                prevEl: '.advantages-prev',
            },
        });
    } else if (window.innerWidth >= 768 && swiper) {
        swiper.destroy(true, true);
        swiper = null;
    }
}

window.addEventListener('load', initializeSwiper);
window.addEventListener('resize', initializeSwiper);
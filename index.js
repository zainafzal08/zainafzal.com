'use strict';

let firstSection = null;
let sectionHeight = 0;
let currentWidth = innerWidth;
let lastScroll = 0;

const NUM_SECTIONS = 4;

const COLORS = [
    '#4CA2CD',
    '#67B26F',
    '#F2B74B',
    '#FB9C89',
];

const GALLERY_PROJECTS = {
    'adventure_buddy': {
        previewLink: 'img/adventure_buddy_preview.svg',
        title: 'Adventure Buddy',
        description: 'An app to help users play DnD by handling the paper work.',
        images: [
            'img/adventure_buddy_preview.svg',
            'img/adventure_buddy_1.svg',
            'img/adventure_buddy_3.svg',
            'img/adventure_buddy_2.svg',
            'img/adventure_buddy_4.svg',
            'img/adventure_buddy_5.svg',
            'img/adventure_buddy_6.svg',
            'img/adventure_buddy_7.svg',
            'img/adventure_buddy_8.svg',
            'img/adventure_buddy_9.svg',
        ]
    },
    'js': {
        previewLink: 'img/js_preview.svg',
        title: 'Js Lecturing Slide Deck',
        description: 'Slide deck used to teach javascript fundamentals.',
        images: [
            'img/js_preview.svg',
            'img/js_0.svg',
            'img/js_1.svg',
            'img/js_2.svg',
            'img/js_3.svg',
            'img/js_4.svg'
        ]
    },
    'todo': {
        previewLink: 'img/todo_preview.svg',
        title: 'Todo',
        description: 'Simple todo app which syncs to local storage.',
        images: [
            'img/todo_preview.svg',
            'img/todo_1.svg',
            'img/todo_2.svg'
        ]
    },
    'stairway': {
        previewLink: 'img/stairway_preview.svg',
        title: 'Stairway',
        description: 'A task management app which helps track big tasks as a series of chained sub tasks.',
        images: [
            'img/stairway_preview.svg',
            'img/stairway_1.svg',
            'img/stairway_2.svg',
            'img/stairway_3.svg'
        ]
    }
};

function rgb(c) {
    return {
        red: parseInt(c.substr(1, 2), 16),
        green: parseInt(c.substr(3, 2), 16),
        blue: parseInt(c.substr(5, 2), 16)
    }
}

function rgbStr(hex) {
    const { red, green, blue } = rgb(hex);
    return `${red},${green},${blue}`;
}

function linearInterp(f, c1, c2) {
    c1 = rgb(c1)
    c2 = rgb(c2)
    let r = {
        red: c1.red + f * (c2.red - c1.red),
        green: c1.green + f * (c2.green - c1.green),
        blue: c1.blue + f * (c2.blue - c1.blue)
    }
    return `rgb(${r.red},${r.green},${r.blue})`;
}

function gradient(f, colors) {
    const [c1, c2, c3, c4] = colors;
    f = f * 3;
    if (f <= 1) return linearInterp(f, c1, c2);
    if (f <= 2) return linearInterp(f - 1, c2, c3);
    if (f <= 3) return linearInterp(f - 2, c3, c4);
}

function disableScroll() {
    document.body.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = 'scroll';
}

// Set up 500 possible rotations the background animates between so we sort of
// rate limit updates.
function bucket(v) {
    const numSteps = 500;
    const stepSize = 1 / numSteps;
    const roundedValue = Math.floor(v / stepSize) * stepSize;
    return roundedValue;
}

function onScroll() {
    if (sectionHeight < 0) return;
    // Only update transform once every 50ms.
    if ((Date.now() - lastScroll) < 50) return;
    const totalHeight = sectionHeight * (NUM_SECTIONS - 1);
    const progress = bucket(1 - ((totalHeight - window.scrollY) / totalHeight));
    const rotation = -45 + 270 * (progress);
    const col = gradient(progress, COLORS);

    document.querySelector('.background').style.transform = `rotate(${rotation}deg)`;
    document.querySelector('.background').style.backgroundColor = col;
    lastScroll = Date.now();
}

function onResize() {
    if (firstSection) {
        sectionHeight = firstSection.getBoundingClientRect().height;
    }
    if (currentWidth !== innerWidth) {
        // Only update background on width changes. Height changes are a bit
        // unreliable since they happen on mobile everytime you scroll and
        // hide the chrome top bar so we just cop the slight misalignment there
        // instead of jankily resizing the backgroun
        setBackgroundSize();
        currentWidth = innerWidth;
    }
}

function openGallery(project) {
    const { title, description, images } = GALLERY_PROJECTS[project];
    // Populate.
    const progressDots = document.querySelector('[data-gallery-progress]');
    const reel = document.querySelector('[data-gallery-image-reel]');
    document.querySelector('[data-gallery-item-title]').innerText = title;
    document.querySelector('[data-gallery-item-description]').innerText = description;
    progressDots.innerHTML = '';
    reel.innerHTML = '';

    for (let i = 0; i < images.length; i++) {
        if (images.length > 1) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                document.querySelector(`.image-container:nth-child(${i+1})`).scrollIntoView();
            });
            if (i === 0) {
                dot.classList.add('active');
            }
            progressDots.appendChild(dot);
        }

        let elem;
        if (images[i][0] === '#') {
            // Render the template element.
            elem = document.querySelector(images[i]).content.cloneNode(true);
        } else {
            elem = document.createElement('img');
            elem.src = images[i];
        }

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        imageContainer.appendChild(elem);
        reel.appendChild(imageContainer);
    }

    document.querySelector('.gallery').classList.add('shown');
    reel.scrollLeft = 0;
    disableScroll();
}

function closeGallery() {
    document.querySelector('.gallery').classList.remove('shown');
    enableScroll();
}

function onGalleryScroll(event) {
    const { target } = event;
    const dots = document.querySelector('[data-gallery-progress]').childNodes;
    const pos = Math.floor((target.scrollLeft / target.scrollWidth) * (dots.length + 1));
    if (dots.length < 1) {
        return;
    }
    for (const dot of dots) {
        dot.classList.remove('active');
    }
    dots[pos].classList.add('active');
}

function pushGalleryForward() {
    const dots = document.querySelector('[data-gallery-progress]').childNodes;
    const reel = document.querySelector('[data-gallery-image-reel]');
    const sectionWidth = reel.scrollWidth / (dots.length + 1);
    reel.scrollLeft += sectionWidth;
}

function pushGalleryBack() {
    const dots = document.querySelector('[data-gallery-progress]').childNodes;
    const reel = document.querySelector('[data-gallery-image-reel]');
    const sectionWidth = reel.scrollWidth / (dots.length + 1);
    reel.scrollLeft -= sectionWidth;
}

function onGalleryScrimClick(e) {
    const source = e.composedPath()[0];
    if (source.hasAttribute('data-gallery-container')) {
        closeGallery();
    }
}

function initGallery() {
    for (const element of document.querySelectorAll('[data-triggers-gallery]')) {
        const project = element.dataset.triggersGallery;
        const projectInfo = GALLERY_PROJECTS[project];
        element.style.setProperty('background-image', `url(${projectInfo.previewLink})`);
        element.addEventListener('click', () => {
            openGallery(project);
            // If we already have a hash overide it.
            if (location.hash) {
                window.history.replaceState({}, '', `#${project}`);
            } else {
                window.history.pushState({}, '', `#${project}`);
            }
        });
    }
    document.querySelector('[data-gallery-image-reel]').addEventListener('scroll', onGalleryScroll);
    document.querySelector('[data-gallery-container').addEventListener('click', onGalleryScrimClick);
    document.querySelector('.gallery .close').addEventListener('click', () => {
        closeGallery();
        window.history.back();
    });
    document.body.addEventListener('keydown', (e) => {
        const galleryShown = document.querySelector('.gallery').classList.contains('shown');
        if (!galleryShown) {
            return;
        }
        if (e.key === 'Escape') {
            closeGallery();
            window.history.back();
        } else if (e.key === 'ArrowRight') {
            pushGalleryForward();
        } else if (e.key === 'ArrowLeft') {
            pushGalleryBack();
        }
    });
}

function onHashChange(event) {
    if (!location.hash) {
        closeGallery();
    } else {
        openGallery(location.hash.substr(1));
    }
}

function setBackgroundSize() {
    const { innerWidth, innerHeight } = window;
    // We need this value to account for the topbar in mobile which is there
    // on first launch but disapears after scroll.
    const fudge = 128;
    const diagonal = Math.sqrt(innerWidth ** 2 + innerHeight ** 2);
    const offsetX = -diagonal / 2 + innerWidth / 2;
    const offsetY = -1 * ((diagonal / 2 + fudge) - innerHeight / 2);
    document.querySelector('.background').style.width = `${diagonal}px`;
    document.querySelector('.background').style.height = `${diagonal/2 + fudge}px`;
    document.querySelector('.background').style.left = `${offsetX}px`;
    document.querySelector('.background').style.top = `${offsetY}px`;
}

function init() {
    const sections = Array.from(document.querySelectorAll('.section'));
    if (sections.length !== COLORS.length) {
        throw new Error('Number of sections and colors mismatch.');
    }
    firstSection = sections[0];
    sectionHeight = firstSection.getBoundingClientRect().height;
    sections.map((section, index) =>
        section.style.setProperty(
            '--card-theme-primary', COLORS[index]));
    sections.map(
        (section, index) => section.style.setProperty(
            '--card-theme-primary-rgb', rgbStr(COLORS[index])));
    document.addEventListener('scroll', onScroll);
    window.onresize = onResize;
    setBackgroundSize();
    onScroll();
    initGallery();
}

window.onload = init;
window.onpopstate = onHashChange;
// Smooth scroll for navigation links
const links = document.querySelectorAll('nav ul li a');

links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Contact form alert (simple simulation)
const form = document.getElementById('contactForm');
form.addEventListener('submit', function(e){
  e.preventDefault();
  alert("Thanks for reaching out! I will contact you soon.");
  form.reset();
});

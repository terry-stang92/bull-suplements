// ===== ANNOUNCEMENT BAR SLIDER =====
const slides = document.querySelectorAll('.ann-slide')
let currentSlide = 0

function showSlide(index) {
  slides.forEach(s => s.classList.remove('active'))
  slides[index].classList.add('active')
}

document.querySelector('.ann-next').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length
  showSlide(currentSlide)
})

document.querySelector('.ann-prev').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length
  showSlide(currentSlide)
})

setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length
  showSlide(currentSlide)
}, 4000)

// ===== NAVBAR STICKY SCROLL =====
const navbar = document.getElementById('navbar')
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
})

// ===== HAMBURGER MOBILE MENU =====
const hamburger = document.getElementById('hamburger')
const mobileMenu = document.getElementById('mobileMenu')

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open')
  hamburger.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰'
})

// ===== DARK MODE TOGGLE =====
const darkToggle = document.getElementById('darkToggle')
const html = document.documentElement

darkToggle.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark'
  html.setAttribute('data-theme', isDark ? 'light' : 'dark')
  darkToggle.textContent = isDark ? '🌙' : '☀️'
  localStorage.setItem('theme', isDark ? 'light' : 'dark')
})

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark'
html.setAttribute('data-theme', savedTheme)
darkToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙'

// ===== PRODUCT FILTERS =====
const filterBtns = document.querySelectorAll('.filter-btn')
const productCards = document.querySelectorAll('.product-card')

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'))
    btn.classList.add('active')

    const filter = btn.dataset.filter

    productCards.forEach(card => {
      if (filter === 'all' || card.dataset.cat === filter) {
        card.style.display = 'block'
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)' }, 10)
      } else {
        card.style.opacity = '0'
        card.style.transform = 'translateY(10px)'
        setTimeout(() => { card.style.display = 'none' }, 300)
      }
    })
  })
})

// ===== ADD TO CART =====
let cartCount = 0
const cartCountEl = document.querySelector('.cart-count')
const addCartBtns = document.querySelectorAll('.add-cart')

addCartBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    cartCount++
    cartCountEl.textContent = cartCount
    btn.textContent = '✓ ADDED!'
    btn.style.background = '#22c55e'
    setTimeout(() => {
      btn.textContent = 'ADD TO CART'
      btn.style.background = ''
    }, 1500)
  })
})

// ===== NEWSLETTER FORM =====
const newsletterForm = document.getElementById('newsletterForm')
newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const input = newsletterForm.querySelector('input')
  const btn = newsletterForm.querySelector('button')
  btn.textContent = '✓ SUBSCRIBED!'
  btn.style.background = '#22c55e'
  btn.style.color = '#fff'
  input.value = ''
  setTimeout(() => {
    btn.textContent = 'SUBSCRIBE →'
    btn.style.background = ''
    btn.style.color = ''
  }, 3000)
})

// ===== SCROLL ANIMATIONS =====
const fadeEls = document.querySelectorAll('.product-card, .goal-card, .why-card, .testimonial-card')
fadeEls.forEach(el => el.classList.add('fade-in'))

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
    }
  })
}, { threshold: 0.1 })

fadeEls.forEach(el => observer.observe(el))
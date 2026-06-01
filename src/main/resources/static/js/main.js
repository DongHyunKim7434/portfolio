'use strict'

/**
 * 검색창 제어
 */
const headerSearch = document.querySelector('.header-right .search')
const headerSearchInput = headerSearch.querySelector('input')

headerSearch.addEventListener('click', function () {
  headerSearchInput.focus()
})

headerSearchInput.addEventListener('focus', function () {
  headerSearch.style.borderColor = 'var(--primary)'
})

headerSearchInput.addEventListener('blur', function () {
  headerSearch.style.borderColor = ''
})


/**
 * 스크롤에 따른 badges / to-top 버튼 제어
 */
const badgeEl = document.querySelector('header .badges')
const toTopEl = document.querySelector('#to-top')

window.addEventListener('scroll', _.throttle(function () {
  if (window.scrollY > 500) {
    gsap.to(badgeEl, .6, { opacity: 0, display: 'none' })
    gsap.to(toTopEl, .2, { x: 0 })
  } else {
    gsap.to(badgeEl, .6, { opacity: 1, display: 'flex' })
    gsap.to(toTopEl, .2, { x: 100 })
  }
}, 300))

toTopEl.addEventListener('click', function () {
  gsap.to(window, .7, { scrollTo: 0 })
})


/**
 * 히어로 순차 fade-in
 */
const fadeEls = document.querySelectorAll('.hero .fade-in')
fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .4,
    opacity: 1
  })
})


/**
 * 타이핑 텍스트 효과 ★ (스타벅스 추가 기능)
 */
const roles = ['정보보안 전문가', '수원대학교 정보보호학과']
let roleIndex = 0
let charIndex = 0
let isDeleting = false

function typeEffect() {
  const el = document.querySelector('.typed-text')
  if (!el) return

  const current = roles[roleIndex]

  if (isDeleting) {
    el.textContent = current.substring(0, charIndex - 1)
    charIndex--
  } else {
    el.textContent = current.substring(0, charIndex + 1)
    charIndex++
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true
    setTimeout(typeEffect, 1800)
    return
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false
    roleIndex = (roleIndex + 1) % roles.length
  }

  setTimeout(typeEffect, isDeleting ? 55 : 95)
}

setTimeout(typeEffect, 2000)


/**
 * 슬라이드 — 공지 (수직)
 */
new Swiper('.notice-swiper', {
  direction: 'vertical',
  loop: true,
  autoplay: { delay: 3500 }
})

/**
 * 슬라이드 — 프로젝트 프로모션 (페이지네이션 + navigation)
 */
new Swiper('.promo-swiper', {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 10,
  centeredSlides: true,
  autoplay: { delay: 5000 },
  pagination: {
    el: '.promo-pagination',
    clickable: true
  },
  navigation: {
    prevEl: '.promo-prev',
    nextEl: '.promo-next'
  }
})

/**
 * 슬라이드 — 추천사 리뷰
 */
new Swiper('.review-swiper', {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 20,
  autoplay: { delay: 5000 },
  navigation: {
    prevEl: '.review-prev',
    nextEl: '.review-next'
  }
})

/**
 * 슬라이드 — 기술 스택 (awards 역할)
 */
new Swiper('.tech-swiper', {
  loop: true,
  slidesPerView: 5,
  spaceBetween: 16,
  autoplay: { delay: 2500 },
  navigation: {
    prevEl: '.tech-prev',
    nextEl: '.tech-next'
  }
})


/**
 * 프로젝트 프로모션 토글
 */
const toggleProject = document.querySelector('.toggle-project')
const projectPromotion = document.querySelector('.project-promotion')

toggleProject.addEventListener('click', function () {
  if (projectPromotion.classList.contains('hide')) {
    projectPromotion.classList.remove('hide')
    toggleProject.classList.add('open')
  } else {
    projectPromotion.classList.add('hide')
    toggleProject.classList.remove('open')
  }
})


/**
 * 필터 탭 — active 클래스 배타적 토글 ★ (스타벅스 추가 기능)
 */
const filterBtns = document.querySelectorAll('.filter-btn')
filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    filterBtns.forEach(function (b) { b.classList.remove('active') })
    btn.classList.add('active')
  })
})


/**
 * 부유하는 요소 (floating)
 */
function random(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  gsap.to(selector, random(1.5, 2.5), {
    delay: random(0, delay),
    y: size,
    repeat: -1,
    yoyo: true,
    ease: Power1.easeInOut
  })
}

floatingObject('.floating1', 1, 20)
floatingObject('.floating2', .5, 15)
floatingObject('.floating3', 1.5, 25)
floatingObject('.floating4', 1, 18)
floatingObject('.floating5', .8, 22)


/**
 * ScrollMagic — 스크롤 감지 + 카운터 + 스킬바 애니메이션
 */
const scrollController = new ScrollMagic.Controller()
const spyEls = document.querySelectorAll('section.scroll-spy')

spyEls.forEach(function (spyEl) {
  const scene = new ScrollMagic.Scene({
    triggerElement: spyEl,
    triggerHook: .8
  })
  .setClassToggle(spyEl, 'show')
  .addTo(scrollController)

  // 카운터 애니메이션 ★ (스타벅스 추가 기능)
  if (spyEl.classList.contains('about')) {
    let isCounted = false
    scene.on('enter', function () {
      if (isCounted) return
      isCounted = true

      const counterEls = spyEl.querySelectorAll('.stat__number')
      counterEls.forEach(function (el) {
        const target = parseInt(el.getAttribute('data-count'))
        const obj = { value: 0 }
        gsap.to(obj, 2, {
          value: target,
          onUpdate: function () {
            el.textContent = Math.floor(obj.value).toLocaleString()
          }
        })
      })
    })
  }

  // 스킬바 애니메이션 ★ (스타벅스 추가 기능)
  if (spyEl.classList.contains('skillbars')) {
    let isAnimated = false
    scene.on('enter', function () {
      if (isAnimated) return
      isAnimated = true

      const bars = spyEl.querySelectorAll('.skill-fill')
      bars.forEach(function (bar, i) {
        const targetWidth = bar.getAttribute('data-width')
        gsap.to(bar, 1.2, {
          width: targetWidth + '%',
          delay: i * .15,
          ease: Power2.easeOut
        })
      })
    })
  }
})


/**
 * Contact Form — fetch API로 Spring Boot 백엔드 POST ★ (스타벅스 추가 기능)
 */
const contactForm = document.querySelector('.contact-form')
const formStatus = document.querySelector('.form-status')

contactForm.addEventListener('submit', function (e) {
  e.preventDefault()

  const data = {
    name: contactForm.querySelector('[name=name]').value,
    email: contactForm.querySelector('[name=email]').value,
    message: contactForm.querySelector('[name=message]').value
  }

  const submitBtn = contactForm.querySelector('button[type=submit]')
  submitBtn.disabled = true
  submitBtn.textContent = '전송 중...'

  fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(function (res) {
    if (res.ok) {
      formStatus.textContent = '✅ 메시지가 성공적으로 전송되었습니다!'
      formStatus.className = 'form-status success'
      contactForm.reset()
    } else {
      throw new Error('서버 오류')
    }
  })
  .catch(function () {
    formStatus.textContent = '❌ 전송에 실패했습니다. 다시 시도해주세요.'
    formStatus.className = 'form-status error'
  })
  .finally(function () {
    submitBtn.disabled = false
    submitBtn.innerHTML = '<span class="material-icons">send</span> 메시지 보내기'
  })
})


/**
 * 올해 연도 자동 출력
 */
const thisYear = document.querySelector('.this-year')
thisYear.textContent = new Date().getFullYear()


/**
 * GitHub 저장소 → 프로젝트 카드 자동 생성
 */
fetch('http://localhost:8080/api/github/repos')
  .then(function (res) { return res.json() })
  .then(function (repos) {
    const grid = document.querySelector('#projects-grid')
    grid.innerHTML = repos.map(function (repo, i) {
      const delay = (i % 2 === 0) ? 'to-right delay-1' : 'to-left delay-1'
      const category = repo.language === 'Java' ? 'backend' : 'web'
      const tag = repo.language || 'GitHub'
      return `
        <div class="p-card back-to-position ${delay}" data-category="${category}">
          <div class="p-card__thumb">
            <img src="https://opengraph.githubassets.com/1/DongHyunKim7434/${repo.name}" alt="${repo.name}" />
            <div class="p-card__overlay">
              <a href="${repo.html_url}" class="btn btn--white" target="_blank">자세히 보기</a>
            </div>
          </div>
          <div class="p-card__info">
            <div class="p-card__tags"><span>${tag}</span></div>
            <h3>${repo.name}</h3>
            <p>${repo.description || '설명이 없습니다.'}</p>
          </div>
        </div>
      `
    }).join('')
  })
  .catch(function () {
    document.querySelector('#projects-grid').innerHTML = '<p style="color:#aaa">저장소를 불러오지 못했습니다.</p>'
  })

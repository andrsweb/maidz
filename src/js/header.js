import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { setTargetElement, getTargetElement } from './common/global'

document.addEventListener('DOMContentLoaded', () => {
	'use strict'

	headerScroll()
	toogleBurgerMenu()
	closeMenuByTapLink()
})

const headerScroll = () => {                 //Header scroll function, if header scrolltop > 0, header add class 'scrolled'
	window.addEventListener('scroll', () => {
		const scrollTop = window.scrollY
		const header = document.querySelector('.header')

		if (!header) return

		if (scrollTop > 0) {
			if (!header.classList.contains('scrolled'))
				header.classList.add('scrolled')
		} else {
			header.classList.remove('scrolled')
		}
	})
}

const toogleBurgerMenu = () => {
	const burgerButton = document.querySelector('.burger__button')
	const headerWrapper = document.querySelector('.header__wrapper')
	setTargetElement(document.querySelector('#menu-lock')) //Target element for body lock
	if (!burgerButton && !headerWrapper) return


	burgerButton.addEventListener('click', () => {

		if (!headerWrapper.classList.contains('opened')) {
			headerWrapper.classList.add('opened')
			headerWrapper.classList.remove('closed')
			disableBodyScroll(getTargetElement(), { reserveScrollBarGap: true })
		} else {
			headerWrapper.classList.add('closed')
			setTimeout(() => headerWrapper.classList.remove('opened'), 350);
			setTimeout(() => headerWrapper.classList.remove('closed'), 350);
			enableBodyScroll(getTargetElement())
		}
	})

	window.addEventListener('resize', () => {        //Resize function, if window width >= 768, remove all active classes on burger menu and button
		const windowWidth = window.innerWidth
		const WINDOW_WIDTH_MD = 992

		if (windowWidth >= WINDOW_WIDTH_MD && headerWrapper.classList.contains('opened')) {
			headerWrapper.classList.remove('opened')
			headerWrapper.classList.remove('closed')
			enableBodyScroll(getTargetElement())
		}
	})
}

const closeMenuByTapLink = () => {
	const links = document.querySelectorAll('.menu-item a')
	const headerWrapper = document.querySelector('.header__wrapper')

	if (!links.length && !headerWrapper) return

	links.forEach(link => {
		link.addEventListener('click', () => {
			if (headerWrapper.classList.contains('opened')) {
				headerWrapper.classList.remove('opened')
				enableBodyScroll(getTargetElement())
			} else return
		})
	})
}
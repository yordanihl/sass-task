(function () {
	const uiBanners = newUiBanners();

	const bannerData = [
		{
			image: '/img/bg-banner-img-3.jpg',
			position: { x: -301, y: -146 },
			title: 'Where is Majestic',
			text:
				'Aenean eget massa felis. Sed ut lacinia risus. Donec blandit, leo sed iaculis ullamcorper, risus nisl consectetur sem, nec convallis justo dui eget est. Vivamus interdum porta mi, vel porttitor ex fermentum viverra.',
		},
		{
			image: '/img/bg-banner-img-2.jpg',
			position: { x: -301, y: -146 },
			title: 'What is Majestic',
			text:
				'Nullam quis ultrices massa. Maecenas ornare enim sit amet ipsum lobortis eget convallis dolor interdum. Donec blandit fringilla est. Praesent lacus nibh, elementum ac varius sit amet, mattis a tortor.',
		},
		{
			image: '/img/bg-banner-img-1.jpg',
			position: { x: -18, y: -12 },
			title: 'Why is Majestic',
			text:
				'Curabitur vitae lectus ut elit vestibulum finibus in sed elit. Nullam tempus tempor augue nec congue. Sed pulvinar risus ut cursus semper. Nullam eget libero sagittis, suscipit nunc id, varius mauris.',
		},
	];
	const prosData = [
		{
			image: '/img/pros/hGfsDSfh1231.jpg',
			name: 'Phillip Ward 1',
			company: 'Adco Architecture',
			position: 'Architect',
		},
		{
			image: '/img/pros/NHjGdrTHj964.jpg',
			name: 'Julie Crazner 2',
			company: 'Crazner Studios',
			position: 'Interior Design',
		},
		{
			image: '/img/pros/PFwHlHEdvJ10556.jpg',
			name: 'Susan Poe 3',
			company: 'Poe Media LLC',
			position: 'Interior Design',
		},
		{
			image: '/img/pros/pojPjioijJOIJhq234.jpg',
			name: 'Becky Milan 4',
			company: 'Milan Media LLC',
			position: 'Interior Design',
		},
		{
			image: '/img/pros/NHjGdrTHj964.jpg',
			name: 'Julie Crazner 5',
			company: 'Crazner Studios',
			position: 'Interior Design',
		},
		{
			image: '/img/pros/pojPjioijJOIJhq234.jpg',
			name: 'Becky Milan 6',
			company: 'Milan Media LLC',
			position: 'Interior Design',
		},
		{
			image: '/img/pros/hGfsDSfh1231.jpg',
			name: 'Phillip Ward 7',
			company: 'Adco Architecture',
			position: 'Architect',
		},
		{
			image: '/img/pros/PFwHlHEdvJ10556.jpg',
			name: 'Susan Poe 8',
			company: 'Poe Media LLC',
			position: 'Interior Design',
		},
		{
			image: '/img/pros/hGfsDSfh1231.jpg',
			name: 'Phillip Ward 9',
			company: 'Adco Architecture',
			position: 'Architect',
		},
		{
			image: '/img/pros/NHjGdrTHj964.jpg',
			name: 'Julie Crazner 0',
			company: 'Crazner Studios',
			position: 'Interior Design',
		},
	];

	bannerData.forEach((item) => uiBanners.add(item));

	processProSlides(prosData);

	uiBanners.select(1);
	uiBanners.startAutoCycle();

	function newUiBanners() {
		const bannerImgsContainer = $('#banner-imgs-container');
		const bannerBtnsContainer = $('#banner-btns-container');
		const bannerTextTitle = $('#banner-text-title');
		const bannerTextBody = $('#banner-text-body');
		const bannersList = [];
		let selectedBanner = null;

		return {
			add,
			select,
			startAutoCycle,
		};

		function add(objBanner) {
			const btn = $('<div class="btns-single"></div>');
			const background = $(
				'<div class="imgs-single" style="background-image: url(\'' +
					objBanner.image +
					"'); background-position: " +
					objBanner.position.x +
					'px ' +
					objBanner.position.y +
					'px;"></div>'
			);
			const title = $('<span>' + objBanner.title + '</span>');
			const text = $('<span>' + objBanner.text + '</span>');

			bannersList.push({ btn, background, title, text });

			btn.on('click', select.bind(null, bannersList.length - 1));
			bannerImgsContainer.append(background);
			bannerBtnsContainer.append(btn);
			bannerTextTitle.append(title);
			bannerTextBody.append(text);
		}

		function select(index) {
			if (selectedBanner === index) return;
			if (selectedBanner !== null) hide(selectedBanner);
			const thisBanner = bannersList[index];

			selectedBanner = index;
			thisBanner.btn.addClass('selected');
			thisBanner.title.addClass('d-block');
			thisBanner.text.addClass('d-block');
			bannerImgsContainer.append(thisBanner.background);
			thisBanner.background.css('left', '-100%').animate(
				{
					left: '0%',
				},
				500
			);
		}

		function hide(index) {
			const thisBanner = bannersList[index];
			thisBanner.btn.removeClass('selected');
			thisBanner.title.removeClass('d-block');
			thisBanner.text.removeClass('d-block');
			thisBanner.background.animate(
				{
					left: '100%',
				},
				500
			);
		}

		function startAutoCycle() {
			setInterval(selectNextBanner, 10000);
		}

		function selectNextBanner() {
			const nextBanner =
				selectedBanner === bannersList.length - 1 ? 0 : selectedBanner + 1;
			select(nextBanner);
		}
	}

	function processProSlides(prosData) {
		const prosContainer = $('#pros-container');
		const prosArrowLeft = $('#pros-arrow-left');
		const prosArrowRight = $('#pros-arrow-right');
		const prosArrowLeftMobile = $('#pros-arrow-left-mobile');
		const prosArrowRightMobile = $('#pros-arrow-right-mobile');

		const slides = [];
		let selectedIndex = 0;
		let visibleFirstHalf = true;

		for (let i = 0; i < prosData.length; i += 4) {
			slides.push(
				buildSlide(
					prosData[i],
					prosData[i + 1],
					prosData[i + 2],
					prosData[i + 3]
				)
			);
			if (i == 0) slides[i].addClass('d-flex');
		}

		prosArrowLeft.on('click', selectSlide.bind(null, false));
		prosArrowRight.on('click', selectSlide.bind(null, true));
		prosArrowLeftMobile.on('click', selectHalfSlide.bind(null, false));
		prosArrowRightMobile.on('click', selectHalfSlide.bind(null, true));

		function selectSlide(goForward) {
			const thisIndex = selectedIndex;
			let nextIndex = goForward ? thisIndex + 1 : thisIndex - 1;
			if (nextIndex < 0) nextIndex = slides.length - 1;
			else if (nextIndex >= slides.length) nextIndex = 0;
			selectedIndex = nextIndex;

			slides[thisIndex].animate(
				{
					opacity: 0,
				},
				250,
				function () {
					slides[thisIndex].removeClass('d-flex');
					slides[thisIndex].css('opacity', '');
					slides[nextIndex].css('opacity', '0');
					slides[nextIndex].addClass('d-flex');
					slides[nextIndex].animate(
						{
							opacity: 1,
						},
						250
					);

					if (goForward || slides[nextIndex].find('.second-half').length == 0) {
						visibleFirstHalf = true;
						slides[nextIndex].removeClass('mobile-visible-second');
						return;
					}
					visibleFirstHalf = false;
					slides[nextIndex].addClass('mobile-visible-second');
				}
			);
		}

		function selectHalfSlide(goForward) {
			const thisIndex = selectedIndex;
			const slideFirstHalf = slides[thisIndex].find('.first-half');
			const slideSecondHalf = slides[thisIndex].find('.second-half');

			if (goForward && (!visibleFirstHalf || slideSecondHalf.length == 0)) {
				selectSlide(true);
				return;
			}

			if (!goForward && visibleFirstHalf) {
				selectSlide(false);
				return;
			}

			const currentSlide = visibleFirstHalf ? slideFirstHalf : slideSecondHalf;
			const nextSlide = visibleFirstHalf ? slideSecondHalf : slideFirstHalf;

			visibleFirstHalf = !visibleFirstHalf;

			currentSlide.animate(
				{
					opacity: 0,
				},
				250,
				function () {
					currentSlide.css('opacity', '');
					nextSlide.css('opacity', '0');
					nextSlide.animate(
						{
							opacity: 1,
						},
						250
					);
					visibleFirstHalf
						? slides[thisIndex].removeClass('mobile-visible-second')
						: slides[thisIndex].addClass('mobile-visible-second');
				}
			);
		}

		function buildSlide() {
			const thisSlide = $('<div class="row"></div>');
			const args = arguments;

			for (let i = 0; i < args.length; i++) {
				if (args[i] === undefined) continue;
				let mobileSecondHalf = false;
				if ((i + 1) % 4 == 0 || (i + 2) % 4 == 0) mobileSecondHalf = true;
				thisSlide.append(
					'<div class="col pro-single ' +
						(mobileSecondHalf ? 'second-half' : 'first-half') +
						'">' +
						('<div class="pro-img" style="background-image: url(\'' +
							args[i].image +
							'\');">' +
							'<div class="pro-plus"><div>&#43;</div></div>' +
							'</div>' +
							'<div class="pro-text">' +
							('<div class="pro-name">' +
								args[i].name +
								'</div>' +
								args[i].company +
								'<br>' +
								args[i].position +
								'<br>' +
								'<a href="" class="pro-see-more">See Profile <div class="symbol symbol-arrow-right"></div></a>') +
							'</div>') +
						'</div>'
				);
			}
			prosContainer.append(thisSlide);

			return thisSlide;
		}
	}
})();

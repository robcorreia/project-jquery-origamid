// Debounce do Lodash
//serve para evitar que a função ativada no scroll e no resize seja executada milhares de vezes, melhorando a performance
debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};


/* FAZER UMA TAB DAS IMAGENS */

$('[data-group]').each(function(){
	var $allTarget = $(this).find('[data-target]'), //encontra todas target
			$allClick = $(this).find('[data-click]'), //encontra todos os datas-click
			activeClass = 'active'; //classe active
	
	$allTarget.first().addClass(activeClass); //pega o primeiro elemento que tem data-target e adiciona a classe active
	$allClick.first().addClass(activeClass); //pega o primeiro elemento que tem data-click e adiciona a classe active
	
	$allClick.click(function(e){
		e.preventDefault(); //previne a ação padrão
		
		var id = $(this).data('click'), //para identificar o conteudo da data-click
				$target = $('[data-target="' + id + '"]'); //para colocar o conteudo que foi identificado assima junto ao restante do atributo
		
		$allClick.removeClass(activeClass); //remove todos active quando clicar em um outro item do menu do botao
		$allTarget.removeClass(activeClass); //remove todos active quando clicar em um outro item do menu da div
		
		$target.addClass(activeClass); //adiciona a classe no item clicado
		$(this).addClass(activeClass); //adiciona a classe no item clicado
	});
});

/* SCROLL SUAVE NO CLICK DO MENU */

$('.menu-nav a[href^="#"]').click(function(e){ // seleciona todos elementos 'a' do menu nav que começa com o atributo href="#
	e.preventDefault(); //previne a ação padrão

	var id = $(this).attr('href'), //variavel que ira guardar o valor do atributo
		targetOffset = $(id).offset().top, //pega a distancia do topo do id que foi clicado
		headerHeight = $('header').innerHeight(); //pega o tamanho do header junto aos paddings

	$('html, body').animate({ // seleciona o html e o body e anima
		scrollTop: targetOffset - headerHeight //esta animando o scrolltop com a distancia do elemento clicado - o tamanho do menu
	}, 500); // com velocidade de 0.5s

})

/* SUBIR AO TOPO QUANDO CLICAR NO LOGO */

$('.logo').click(function(e){ //seleciona a logo
	e.preventDefault(); //previne o valor padrao
	$('html, body').animate({ //quando clicar, anima o scroll de onde estiver ate o topo
		scrollTop: 0 // quando clicar, anima o scroll de onde estiver ate o topo 0
	}, 500) //velocidade da animacao
})

$('section').each(function(){
	var height = $(this).height(), //pega altura da section
		offsetTop = $(this).offset().top, //pega distancia da section do topo
		menuHeight = $('.menu').innerHeight(), //pega tamanho do menu com os paddings
		id = $(this).attr('id'), //pega o valor do atribudo id
		$itemMenu = $('a[href="#' + id +'"]'); //pega o valor do atributo menu que tem href="+" e soma com o id

		$(window).scroll(debounce(function(){ // funcao do scroll
			var scrollTop = $(window).scrollTop(); //pega a distancia do scroll do topo
			if(offsetTop - menuHeight < scrollTop && offsetTop + height - menuHeight > scrollTop) // se o offsetTop for maior que o Scroll - tamanho do menu adiciona uma classe, & se Scrolltop + altura da section - amanho do menu for > que o scrollTop
			 {
				$itemMenu.addClass('active'); //adiciona a classe
			} else {
				$itemMenu.removeClass('active'); //se nao for, remove a classe
			}
		}, 200));

});


// menu mobile //


$('.mobile-btn').on('click', function(){ //seleciona o elemento que tem a classe .mobile-btn na função de clique
	$(this).toggleClass('active'); //adiciona se não tiver, remove se tiver a clase active
})


/* slide */

/*$('.slide > :first').addClass('active'); //pega o primeiro item filho da classe slide

function rotateSlide() {
	var activeSlide = $('.slide > .active'), //pega o primeiro item filho da classe slide que tiver o .active
		nextSlide = activeSlide.next(); //pega o proximo slide ative

		if(nextSlide.length == 0) { // se o proximo slide nao existir (length: 0)
			nextSlide = $('.slide > :first'); //proximo slide será gual o primeiro slide (retorna)
		}

		activeSlide.removeClass('active'); //remove a classe active
		nextSlide.addClass('active'); // adiciona a classe active
	}

	setInterval(rotateSlide, 3000); //faz um intervalo de 3 segundo na função */


/* Slide otmizado */



function slider(sliderName, velocidade) {
	var sliderClass = '.' + sliderName,
		activeClass = 'active',
		rotate = setInterval(rotateSlide, velocidade); //faz um intervalo de 3 segundo na função *
		
	$(sliderClass + ' > :first').addClass(activeClass); //pega o primeiro item filho da classe slide

	$(sliderClass).hover(function(){
		clearInterval(rotate); //vai pausa o rotate quando o mouse estiver por cima do slider
	}, function(){
		rotate = setInterval(rotateSlide, velocidade); //vai retornar o rotate do slider quando tirar o mouse
	});

	function rotateSlide() {
		var activeSlide = $(sliderClass + ' > .' + activeClass), //pega o primeiro item filho da classe slide que tiver o .active
			nextSlide = activeSlide.next(); //pega o proximo slide ative

		if (nextSlide.length == 0) { // se o proximo slide nao existir (length: 0)
			nextSlide = $(sliderClass + ' > :first'); //proximo slide será gual o primeiro slide (retorna)
		}

		activeSlide.removeClass(activeClass); //remove a classe active
		nextSlide.addClass(activeClass); // adiciona a classe active
	}
}

slider('introducao', 2000); //chama o slider passando nome e velocidade


//* Animação ao do menu scroll 

/*var $target = $('[data-anime="scroll"]'),//essa variavel guarda os elementos que tiverem o data-anima="scroll"
	animationClass = 'animate', //classe animate
	offset = $(window).height() * 3/4; //pega 3/4 da janela

function animeScroll() {
	var documentTop = $(document).scrollTop();
	
	$target.each(function(){
		var itemTop = $(this).offset().top;
		if(documentTop > itemTop - offset){
			$(this).addClass(animationClass);
		}else {
			$(this).removeClass(animationClass);
		}
	});
}

animeScroll(); //ativa a animação logo que entra no site
$(document).scroll(function(){
	animeScroll();
});
*/

/* animação scroll do menu otimizada */

(function(){ // encapsula uma função para que as variaveis nao fiquem soltas no codigo, podendo gerar conflitos futuros (ben alman)
	var $target = $('[data-anime="scroll"]'),//essa variavel guarda os elementos que tiverem o data-anima="scroll"
		animationClass = 'animate', //classe animate
		offset = $(window).height() * 3/4; //pega 3/4 da janela

	function animeScroll() { //criando função chamada animeScroll
		var documentTop = $(document).scrollTop(); //pega a distancia do topo
		
		$target.each(function(){ //a cada elemento alvo
			var itemTop = $(this).offset().top; //pega a distancia do elemento ate o topo
			if(documentTop > itemTop - offset){ // se a distancia do documento é maior que a distancia do item - a distancia do elemento ate o topo
				$(this).addClass(animationClass); // adiciona a classe animationCLass
			}else {
				$(this).removeClass(animationClass); // caso contrario, remove
			}
		});
	}

	animeScroll(); //ativa a animação logo que entra no site
	$(document).scroll(debounce(function(){ //ativa a função criada acima quando da o scroll
		animeScroll(); // nome da função
	}, 200)); //velocidade do debounce

})(); //fecha o encapsulamento
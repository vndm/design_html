/***BUTTON SEARCH****/
$('.btn-search').click(function(){
	$(this).closest('.input-search-group').addClass('active');
});
$('.input-search-group .form-control').blur(function(){
	$(this).closest('.input-search-group').removeClass('active');
});

/***********FORM*******************/
var inputSelector = ['text', 'password', 'email', 'url', 'tel', 'number', 'search'].map(function(selector) {
	return 'input[type=' + selector + ']';
}).join(', ') + ', textarea';

var textAreaSelector = '.materialize-textarea';

var updateTextFields = function updateTextFields($input) {

	var $labelAndIcon = $input.siblings('label, i');
	var hasValue = $input.val().length;
	var hasPlaceholder = $input.attr('placeholder');
	var addOrRemove = (hasValue || hasPlaceholder ? 'add' : 'remove') + 'Class';

	$labelAndIcon[addOrRemove]('active');
}
/*-----------------------------------*/
$(inputSelector).each(function(index, input) {

	var $this = $(input);
	var $labelAndIcon = $this.siblings('label, i');
	updateTextFields($this);
	var isValid = input.validity.badInput;
	if (isValid) {
		$labelAndIcon.addClass('active');
	}
});

$(document).on('focus', inputSelector, function(e) {
	$(e.target).siblings('label, i').addClass('active');
});
/*-------------------------------------------------*/
$(document).on('blur', 'input', function(e) {
	var $this = $(e.target);
	var noValue = !$this.val();
	var invalid = !e.target.validity.badInput;
	var noPlaceholder = $this.attr('placeholder') === undefined;

	if (noValue && invalid && noPlaceholder) {

		$this.siblings('label, i').removeClass('active');
	}

});
/*************************************************/
$(document).on('change', inputSelector, function(e) {

	var $this = $(e.target);
	updateTextFields($this);
});
/*************************************************/
$('input[autofocus]').siblings('label, i').addClass('active');
/**************************************************/
$(document).on('reset', function(e) {

	var $formReset = $(e.target);
	if ($formReset.is('form')) {

		var $formInputs = $formReset.find(inputSelector);
		$formInputs.removeClass('valid').removeClass('invalid').each(function(index, input) {

			var $this = $(input);
			var noDefaultValue = !$this.val();
			var noPlaceholder = !$this.attr('placeholder');
			if (noDefaultValue && noPlaceholder) {
				$this.siblings('label, i').removeClass('active');
			}
		});

		$formReset.find('select.initialized').each(function(index, select) {

			var $select = $(select);
			var $visibleInput = $select.siblings('input.select-dropdown');
			var defaultValue = $select.children('[selected]').val();

			$select.val(defaultValue);
			$visibleInput.val(defaultValue);
		});
	}
});

/***Dehavior for menu on mobile***/
var $navMenu = $('.navbar-toggler-menu .navbar-toggler');
var $navUserMenu = $('.navbar-toggler-user .navbar-toggler');
var $navAuthed = $('.navbar-toggler-authed .navbar-toggler');
var $navbarCollapseAuthed = $('.navbar-collapse-authed');
var $navbarCollapse = $('.navbar-collapse-user');
var $navbarCollapseUser = $('.navbar-collapse-user');

/*** When click the button user will close the button menu***/
$(document).on('click', '.navbar-toggler-user .navbar-toggler', function() {
	if ($navMenu.attr('aria-expanded') == 'true') {
		$navMenu.trigger('click');
	}
});

/*** When click the button user will close the button menu***/
$(document).on('click', '.navbar-toggler-authed .navbar-toggler', function() {
	if ($navMenu.attr('aria-expanded') == 'true') {
		$navMenu.trigger('click');
	}
});

/*** When click the button menu will close the button user***/
$(document).on('click', '.navbar-toggler-menu .navbar-toggler', function() {
	if ($navUserMenu.attr('aria-expanded') == 'true') {
		$navUserMenu.trigger('click');
	}
	if ($navAuthed.attr('aria-expanded') == 'true') {
		$navbarCollapseAuthed.trigger('click');
	}
});

/*** When click outside the menu will close menu***/
$(document).on('click', '.navbar-collapse', function(e) {
	if ($(e.target).closest('.navbar-collapse-inner').length <= 0) {
		$navMenu.trigger('click');
	}
});

/*** When click outside the menu user will close menu user ***/
$(document).on('click', '.navbar-collapse-user', function(e) {
	if ($(e.target).closest('.navbar-collapse-user-inner').length <= 0) {
		$navUserMenu.trigger('click');
	}
});

/*** When click outside the menu user will close menu user ***/
$(document).on('click', '.navbar-collapse-authed', function(e) {
	if ($(e.target).closest('.navbar-collapse-authed-inner').length <= 0) {
		$navAuthed.trigger('click');
	}
});

/*** position footer ***/
$(window).on('load resize', function()
{
	if($('.main-content').outerHeight() < $(window).height())
	{
		$('.main-content').css('min-height',$(window).height() - parseInt($('.main-content').css('padding-bottom')) - $('.footer').outerHeight());
	}
});

/*** When hover sidebar menu  ***/
$('.sidebar-menu .dropdown, .sidebar-menu .dropdown .dropdown-toggle').click(function(event) {
	event.stopPropagation();
});
$('.sidebar-menu .dropdown .dropdown-toggle').click(function(event) {
	event.preventDefault();
});

/*** When sroll document  ***/
$(document).on('scroll',function()
{
	if($(window).scrollTop() > 0)
	{
		$('.sidebar-box-inner').css('position','sticky').css('top',$(window).scrollTop() + $('.header').outerHeight() + parseInt($('.sidebar-box').css('padding-top')));
	}
	else
	{
		$('.sidebar-box-inner').css('top',$('.header').outerHeight() + parseInt($('.sidebar-box').css('padding-top')));
	}
});

/*** Tooltip ***/
$('[data-toggle="tooltip"]').tooltip();

/*** Popover ***/
$('[data-toggle="popover"]').popover();

/****Switch theme***/
function deleteLink() {
	$('link').each(function() {
		var linkHref = $(this).attr('href');
		if (linkHref == '/Styles/dark-theme.css') {
			$(this).remove();
		}
	});
	return true;
}
var navSwitchTheme = $('.nav-switch-theme').length;
if(navSwitchTheme>0 && navSwitchTheme!='undefined'){
	var $logoSrc = $('.header .navbar-brand img');
	var theme = document.cookie.replace(/(?:(?:^|.*;\s*)vndmIoTheme\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	switch (theme) {
		case 'dark-theme':
			$logoSrc.attr('src','/Images/logo_dark.png');
			$('.nav-switch-theme .btn-theme[data-theme="dark-theme"]').attr('data-show', '');
			$('.nav-switch-theme .btn-theme[data-theme="light-theme"]').attr('data-show', 'default');
			$('<link />', { rel: 'stylesheet', href: '/Styles/dark-theme.css' }).appendTo('head');
			break;
		default:
		$logoSrc.attr('src','/Images/logo.png');
	}
	$(document).on('click', '.nav-switch-theme .btn-theme', function() {
		deleteLink();
		var themeDefault = $(this).attr('data-theme');
		$('.nav-switch-theme .btn-theme').attr('data-show', 'default');
		$(this).attr('data-show', '');
		document.cookie = 'vndmIoTheme=' + themeDefault;
		switch (themeDefault) {
			case 'dark-theme':
				$logoSrc.attr('src','/Images/logo_dark.png');
				$('<link />', { rel: 'stylesheet', href: '/Styles/dark-theme.css' }).appendTo('head');
				break;
			default:
			$logoSrc.attr('src','/Images/logo.png');
		}
	});
}

$('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
  if (!$(this).next().hasClass('show')) {
	$(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
  }
  var $subMenu = $(this).next(".dropdown-menu");
  $subMenu.toggleClass('show');

  $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
	$('.dropdown-submenu .show').removeClass("show");
  });

  return false;
});
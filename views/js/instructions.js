$(function() {
  $('.js-instructions-start').click(function (e) {
    e.preventDefault();

    var form = $('#js-form-start');
    var email = $('.js-email');

    if ($(email).val() == null) {
      alert('E-mail is required');
    } else {
      $(form).submit();
    }
  });
});
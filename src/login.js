var app = (function($) {

    var ui = {
        login: {
            $form: $('#form'),
            $error: $('#error')
        }
    };

    var config = {
        api: {
            login: '/admin/api/v1/auth/login'
        }
    };

    function _showError(message) {
        ui.login.$error.text(message);
        ui.login.$error.removeClass('hidden');
    }

    function _hideError() {
        ui.login.$error.addClass('hidden');
    }

    function _login(e) {
        e.preventDefault();
        _hideError();

        $.ajax({
            url: config.api.login,
            method: 'POST',
            data: ui.login.$form.serialize(),
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            success: function() {
                document.location.reload();
            },
            error: function(response) {
                var errorMessage = response.responseJSON.message || 'Что-то пошло не так, попробуйте еще раз';
                _showError(errorMessage);
            }
        });
    }

    function init() {
        ui.login.$form.on('submit', _login);
        ui.login.$form.find('input').on('keydown', _hideError);
    }

    return {
        init: init
    }
})(jQuery);

jQuery(document).ready(app.init);
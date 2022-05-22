<?php

// Стартуем сессию
if (session_id() == '') {
    session_start();
}

include_once '../api/v1/common/auth.php';

// Выбираем и подключаем нужный шаблон
$template = \Auth\isLogged() ? 'index' : 'login';
include_once "./$template.html";
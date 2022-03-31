<?php

header('Access-Control-Allow-Origin: *');

require_once '../../config/DbConnection.php';
require_once '../../models/Users.php';
require_once '../../utils/send.php';

if (isset($_GET['email']) && isset($_GET['verification_code'])) {
    $dbconnection = new DbConnection();
    $db = $dbconnection->connect();

    $users = new Users($db);

    $users->email = $_GET['email'];
    $users->verification_code = $_GET['verification_code'];

    $validate = $users->verify_user();
    if ($validate) {
        if ($validate['is_verified'] === 0) {
            if ($users->update_verification()) {
                send(200, 'email verified successfully');
            } else {
                send(400, 'unable to verify user');
            }
        } else {
            send(400, 'user already registered');
        }
    } else {
        send(400, 'no user account found');
    }
}

<?php

session_start();

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once '../../../../config/DbConnection.php';
require_once '../../../../models/Type_4.php';
require_once '../../../../utils/send.php';
require_once '../../../api.php';
require_once '../../../../utils/loggedin_verified.php';

// TYPE 4 file
class Invited_lectures_api extends Type_4 implements api
{
    private $Invited_lectures;

    // Initialize connection with DB
    public function __construct()
    {
        // Connect with DB
        $dbconnection = new DbConnection();
        $db = $dbconnection->connect();

        // Create an object for users table to do operations
        $this->Invited_lectures = new Type_4($db);

        // Set table name
        $this->Invited_lectures->table = 'faculty_invited_lectures';

        // Set column names
        $this->Invited_lectures->id_name = 'invited_lecture_id';
        $this->Invited_lectures->text_name = 'invited_lecture';
        $this->Invited_lectures->from_name = 'invited_lecture_at';
    }

    // Get all data
    public function get()
    {
        // Get the user info from DB
        $all_data = $this->Invited_lectures->read();

        if ($all_data) {
            $data = array();
            while ($row = $all_data->fetch(PDO::FETCH_ASSOC)) {
                array_push($data, $row);
            }
            echo json_encode($data);
            die();
        } else {
            send(400, 'error', 'no info about invited lectures found');
            die();
        }
    }

    // Get all the data of a user's invited_lecture by ID
    public function get_by_id($id)
    {
        // Get the user info from DB
        $this->Invited_lectures->user_id = $id;
        $all_data = $this->Invited_lectures->read_row();

        if ($all_data) {
            $data = array();
            while ($row = $all_data->fetch(PDO::FETCH_ASSOC)) {
                array_push($data, $row);
            }
            echo json_encode($data);
            die();
        } else {
            send(400, 'error', 'no info about invited lectures found');
            die();
        }
    }
    
    // Get all data by dates
    public function get_by_date($start, $end)
    {
        // Get data from DB
        $this->Invited_lectures->start = $start;
        $this->Invited_lectures->end = $end;
        $all_data = $this->Invited_lectures->read_row_date();

        if ($all_data) {
            $data = array();
            while ($row = $all_data->fetch(PDO::FETCH_ASSOC)) {
                array_push($data, $row);
            }
            echo json_encode($data);
            die();
        } else {
            send(400, 'error', 'no info about invited lectures found');
            die();
        }
    }

    // POST a new user's invited_lecture
    public function post()
    {
        if (!$this->Invited_lectures->post()) {
            // If can't post the data, throw an error message
            send(400, 'error', 'invited_lecture cannot be added');
            die();
        }
    }

    // PUT a user's invited_lecture
    public function update_by_id($DB_data, $to_update, $update_str)
    {
        if (strcmp($DB_data, $to_update) !== 0) {
            if (!$this->Invited_lectures->update_row($update_str)) {
                // If can't update_by_id the data, throw an error message
                send(400, 'error', $update_str . ' for ' . $_SESSION['username'] . ' cannot be updated');
                die();
            }
        }
    }

    // DELETE a user's invited_lecture
    public function delete_by_id()
    {
        if (!$this->Invited_lectures->delete_row()) {
            // If can't delete the data, throw an error message
            send(400, 'error', 'data cannot be deleted');
            die();
        }
    }

    // POST/UPDATE (PUT)/DELETE a user's Invited_lectures
    public function put()
    {
        // // Authorization
        // if ($_SESSION['user_id'] != $_GET['ID']) {
        //     send(401, 'error', 'unauthorized');
        //     die();
        // }

        // Get input data as json
        $data = json_decode(file_get_contents("php://input"));

        // Get all the user's invited_lecture info from DB
        $this->Invited_lectures->user_id = $_SESSION['user_id'];
        $all_data = $this->Invited_lectures->read_row();

        // Store all invited_lecture_id	's in an array
        $DB_data = array();
        $data_IDs = array();
        while ($row = $all_data->fetch(PDO::FETCH_ASSOC)) {
            array_push($DB_data, $row);
        }

        // Insert the data which has no ID
        $count = 0;
        while ($count < count($data)) {
            // Clean the data
            $this->Invited_lectures->text = $data[$count]->invited_lecture;
            $at = date('Y-m-01', strtotime($data[$count]->invited_lecture_at));
            $this->Invited_lectures->from = $at;

            if ($data[$count]->invited_lecture_id     === 0) {
                $this->post();
                array_splice($data, $count, 1);
                continue;
            }

            // Store the IDs
            array_push($data_IDs, $data[$count]->invited_lecture_id);

            ++$count;
        }

        // Delete the data which is abandoned
        $count = 0;
        while ($count < count($DB_data)) {
            if (!in_array($DB_data[$count]['invited_lecture_id'], $data_IDs)) {
                $this->Invited_lectures->id = (int)$DB_data[$count]['invited_lecture_id'];
                $this->delete_by_id();
            }

            ++$count;
        }

        // Update the data which is available
        $count = 0;
        while ($count < count($data)) {
            // Clean the data
            // print_r($row);
            foreach ($DB_data as $key => $element) {
                if ($element['invited_lecture_id'] == $data[$count]->invited_lecture_id) {
                    $this->Invited_lectures->id = $element['invited_lecture_id'];
                    $this->Invited_lectures->text = $data[$count]->invited_lecture;
                    $at = date('Y-m-01', strtotime($data[$count]->invited_lecture_at));
                    $this->Invited_lectures->from = $at;

                    $this->update_by_id($element['invited_lecture'], $data[$count]->invited_lecture, 'invited_lecture');
                    $this->update_by_id($element['invited_lecture_at'], $at, 'invited_lecture_at');

                    break;
                }
            }

            ++$count;
        }

        $this->get_by_id($_SESSION['user_id']);
    }
}

// GET all the user's Invited_lectures
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $Invited_lectures_api = new Invited_lectures_api();
    if (isset($_GET['ID'])) {
        $Invited_lectures_api->get_by_id($_GET['ID']);
    } else if (isset($_SESSION['is_admin']) && $_SESSION['is_admin'] == 1 && isset($_GET['from']) && isset($_GET['to'])) {
        $Invited_lectures_api->get_by_date($_GET['from'], $_GET['to']);
    } else {
        $Invited_lectures_api->get();
    }
}

// To check if an user is logged in and verified
loggedin_verified();

// If a user logged in ...

// POST/UPDATE (PUT) a user's Invited_lectures
if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
    $Invited_lectures_api = new Invited_lectures_api();
    $Invited_lectures_api->put();
}

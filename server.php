<?php
header("Content-Type: application/json");

$file = "messages.json";

//  if request is post -> save
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // read data from JS
    $newMessage = json_decode(file_get_contents("php://input"), true);

    // read old message
    $messages = json_decode(file_get_contents($file), true);

    // add new message
    $messages[] = $newMessage;

    // save at file
    file_put_contents($file, json_encode($messages, JSON_PRETTY_PRINT));

    // reply to js
    echo json_encode([
        "status" => "success",
        "message" => "Message saved"
    ]);
}
?>

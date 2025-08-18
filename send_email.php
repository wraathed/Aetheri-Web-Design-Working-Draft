<?php
// Check if the form was submitted using the POST method
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // --- IMPORTANT: CONFIGURE YOUR EMAIL RECIPIENT ---
    $to_email = "tfitzgerald779@gmail.com"; // <-- CHANGE THIS TO YOUR ACTUAL EMAIL ADDRESS

    // --- FORM DATA: Sanitize and retrieve form inputs ---
    // The filter_input function is a safe way to get user input
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $from_email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

    // --- VALIDATION: Check for required fields and valid email ---
    if (empty($name) || empty($from_email) || empty($message)) {
        // If a required field is empty, send an error response
        http_response_code(400); // Bad Request
        echo "Please fill out all required fields.";
        exit;
    }

    if (!filter_var($from_email, FILTER_VALIDATE_EMAIL)) {
        // If the email format is invalid, send an error response
        http_response_code(400);
        echo "Invalid email format.";
        exit;
    }

    // --- EMAIL HEADERS: Crucial for deliverability and 'Reply-To' functionality ---
    $subject = "New Contact Form Submission from " . $name;
    
    // The 'From' header should be an email address that exists on your server, 
    // but we use the 'Reply-To' header to make replying easy.
    $headers = "From: Aetheri Website Form <form-noreply@yourdomain.com>\r\n"; // <-- Optional: Change yourdomain.com
    $headers .= "Reply-To: " . $from_email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // --- EMAIL BODY: Compose the message that you will receive ---
    $email_body = "You have received a new message from your website contact form.\n\n";
    $email_body .= "--------------------------------------------------\n";
    $email_body .= "Full Name: " . $name . "\n";
    $email_body .= "Email Address: " . $from_email . "\n";
    $email_body .= "Phone Number: " . ($phone ? $phone : "Not provided") . "\n\n"; // Handles optional phone number
    $email_body .= "Message:\n" . $message . "\n";
    $email_body .= "--------------------------------------------------\n";

    // --- SEND EMAIL: Use PHP's mail() function ---
    if (mail($to_email, $subject, $email_body, $headers)) {
        // If mail is sent successfully, redirect to a thank-you page
        header("Location: thank-you.html");
    } else {
        // If mail fails to send, give a server error
        http_response_code(500); // Internal Server Error
        echo "Oops! Something went wrong and we couldn't send your message.";
    }

} else {
    // If the script is accessed directly without a POST request
    http_response_code(403); // Forbidden
    echo "There was a problem with your submission, please try again.";
}
?>
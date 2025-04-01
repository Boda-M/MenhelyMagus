<?php

namespace App\Html;

class Response
{
    const STATUSES = [
        100 => "Continue",
        101 => "Switching Protocols",
        102 => "Processing",
        200 => "OK",
        201 => "Created",
        202 => "Accepted",
        203 => "Non-Authoritative Information",
        204 => "No Content",
        205 => "Reset Content",
        206 => "Partial Content",
        207 => "Multi-Status",
        300 => "Multiple Choices",
        301 => "Moved Permanently",
        302 => "Found",
        303 => "See Other",
        304 => "Not Modified",
        305 => "Use Proxy",
        307 => "Temporary Redirect",
        400 => "Bad Request",
        401 => "Unauthorized",
        402 => "Payment Required",
        403 => "Forbidden",
        404 => "Not Found",
        405 => "Method Not Allowed",
        406 => "Not Acceptable",
        407 => "Proxy Authentication Required",
        408 => "Request Time-out",
        409 => "Conflict",
        410 => "Gone",
        411 => "Length Required",
        412 => "Precondition Failed",
        413 => "Request Entity Too Large",
        414 => "Request-URI Too Large",
        415 => "Unsupported Media Type",
        416 => "Requested range not satisfiable",
        417 => "Expectation Failed",
        418 => "I'm a teapot",
        421 => "Misdirected Request",
        422 => "Unprocessable Entity",
        423 => "Locked",
        424 => "Failed Dependency",
        425 => "Too Early",
        426 => "Upgrade Required",
        428 => "Precondition Required",
        429 => "Too Many Requests",
        431 => "Request Header Fields Too Large",
        451 => "Unavailable For Legal Reasons",
        500 => "Internal Server Error",
        501 => "Not Implemented",
        502 => "Bad Gateway",
        503 => "Service Unavailable",
        504 => "Gateway Time-out",
        505 => "HTTP Version not supported",
    ];

    public function __call($name, $arguments){
        $this->response(['data' => []], 404);
    }

    static function response(array $data, $code = 200, $message = '', array $meta = NULL)
    {
        if(isset(self::STATUSES[$code])){
            http_response_code($code);
            if(!$message){
                $message = self::STATUSES[$code];
            }
            $protocol = $_SERVER['SERVER_PROTOCOL'] ?? 'HTTP/1.0';
            header($protocol . ' ' . $code . ' ' . self::STATUSES[$code]);
            $response = [
                'meta' => $meta,
                'data' => $data,
                'message' => $message,
                'code' => $code,
            ];
            echo json_encode($response, JSON_THROW_ON_ERROR);
        }
    }
}
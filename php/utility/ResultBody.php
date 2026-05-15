<?php
declare(strict_types=1);

// PublicHoliday SDK utility: result_body

class PublicHolidayResultBody
{
    public static function call(PublicHolidayContext $ctx): ?PublicHolidayResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}

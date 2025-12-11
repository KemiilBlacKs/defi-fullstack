<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateRouteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'fromStationId' => 'required|string',
            'toStationId' => 'required|string',
            'analyticCode' => 'required|string',
        ];
    }
}

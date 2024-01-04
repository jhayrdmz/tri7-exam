<?php

namespace App\Http\Requests\Employee;

use App\Enums\Roles;
use BenSampo\Enum\Rules\EnumValue;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AddEmployeeRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required'],
            'last_name' => ['required'],
            'position' => [
                'bail',
                Rule::excludeIf(auth()->user()->role != Roles::MANAGER()),
                'required',
                new EnumValue(Roles::class)
            ]
        ];
    }

    /**
     * Handle a passed validation attempt.
     */
    protected function passedValidation(): void
    {
        if (auth()->user()->role != Roles::MANAGER()) {
            $this->replace(['position' => auth()->user()->role]);
        }
    }
}

<?php

namespace App\Models;

use App\Enums\Roles;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'position',
    ];

    /**
     * Filter by user role
     */
    public function scopeFilterByRole(Builder $query, string $role)
    {
        if (in_array($role, [Roles::WEB_DEVELOPER(), Roles::WEB_DESIGNER()])) {
            return $query->where('position', $role);
        }
    }
}

<?php

namespace Database\Seeders;

use App\Enums\Roles;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // create demo users
        $user_manager = \App\Models\User::factory()->create([
            'first_name' => 'Manager',
            'last_name' => 'User',
            'role' => Roles::MANAGER(),
            'email' => 'manager@example.com',
        ]);

        $user_web_developer = \App\Models\User::factory()->create([
            'first_name' => 'Web Developer',
            'last_name' => 'User',
            'role' => Roles::WEB_DEVELOPER(),
            'email' => 'web_developer@example.com',
        ]);

        $user_web_designer = \App\Models\User::factory()->create([
            'first_name' => 'Web Designer',
            'last_name' => 'User',
            'role' => Roles::WEB_DESIGNER(),
            'email' => 'web_designer@example.com',
        ]);
    }
}

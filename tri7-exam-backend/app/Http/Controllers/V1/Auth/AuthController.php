<?php

namespace App\Http\Controllers\V1\Auth;

use App\Enums\ErrorCodes;
use App\Enums\UserStatusType;
use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth', ['except' => ['login']]);
        // $this->middleware('throttle:60,1', ['except' => ['me']]);
    }

    /**
     * Authenticate user using username and password
     * 
     * @param \App\Http\Requests\Auth\LoginRequest
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->input('username'))->first();

        if ($user && Hash::check($request->input('password'), $user->password)) {
            $token = $user->createToken($request->header('user-agent'));

            return response()->json(['data' => [
                'access_token' => $token->plainTextToken,
                'token_type' => 'bearer',
                'user' => new UserResource($user)
            ]], 200)->header('Authorization', $token->plainTextToken);
        }

        return response()->json(['message' => 'Invalid credentials.'], 401);
    }

    /**
     * Get the authenticated user details
     * 
     * @return \App\Http\Resources\UserResource
     */
    public function me(): UserResource
    {
        /** @var \App\Models\User */
        $user = auth()->user();

        return new UserResource($user);
    }

    /**
     * Logout authenticated user and revoke token
     * 
     * @param \Illuminate\Http\Request
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout successfully.']);
    }
}

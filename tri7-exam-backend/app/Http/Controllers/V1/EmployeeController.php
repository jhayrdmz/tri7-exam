<?php

namespace App\Http\Controllers\V1;

use App\Models\Employee;
use App\Http\Controllers\Controller;
use App\Http\Requests\Employee\AddEmployeeRequest;
use App\Http\Requests\Employee\UpdateEmployeeRequest;
use App\Http\Resources\EmployeeResource;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\QueryBuilder;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $collection = QueryBuilder::for(Employee::class)
            ->filterByRole(auth()->user()->role)
            ->defaultSort('-created_at')
            ->paginate($request->limit ?? 10);

        return EmployeeResource::collection($collection);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AddEmployeeRequest $request)
    {
        $employee = Employee::create($request->validated());

        return new EmployeeResource($employee);
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        $this->authorize('view', $employee);

        return new EmployeeResource($employee);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        $this->authorize('update', $employee);

        $employee->update($request->validated());

        return new EmployeeResource($employee);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $this->authorize('delete', $employee);

        $employee->delete();

        return response()->json([], Response::HTTP_OK);
    }
}

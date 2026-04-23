<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\Request;

class ContactSubmissionController extends Controller
{
    /**
     * Public: receive contact form submission from frontend
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'phone'   => 'nullable|string|max:50',
            'message' => 'required|string|max:5000',
        ]);

        $submission = ContactSubmission::create($data);

        return response()->json([
            'message' => 'تم استلام رسالتك بنجاح',
            'id'      => $submission->id,
        ], 201);
    }

    /**
     * Admin: list all submissions
     */
    public function index()
    {
        return ContactSubmission::orderByDesc('created_at')->get();
    }

    /**
     * Admin: mark as read
     */
    public function markRead(int $id)
    {
        $sub = ContactSubmission::findOrFail($id);
        $sub->update(['is_read' => true]);
        return $sub;
    }

    /**
     * Admin: delete submission
     */
    public function destroy(int $id)
    {
        ContactSubmission::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}

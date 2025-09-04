import { Link } from "react-router-dom";

export default function BeMember() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-teal-700 mb-4">Join Us as a Member</h2>
      <p className="text-gray-700 mb-6">
        By becoming a member of <span className="font-semibold">NGO Helping Hands</span>,  
        you can support our mission and be a part of positive change.  
        Sign up now and make a difference!
      </p>

      {/* Redirects to Signup */}
      <Link
        to="/signup"
        className="bg-yellow-400 text-teal-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
      >
        Sign Up Now
      </Link>
    </div>
  );
}
